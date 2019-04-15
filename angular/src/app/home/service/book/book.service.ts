import { environment } from '../../../../environments/environment';
import { SortDirection } from '../sortable.directive';
import { Book } from './book.d';
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap, first, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  books: Book[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(books: Book[], column: string, direction: string): Book[] {
  if (direction === '') {
    return books;
  } else {
    return [...books].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(book: Book, term: string, pipe: PipeTransform) {
  return book.title.toLowerCase().includes(term.toLowerCase())
    || book.authors.toLowerCase().includes(term.toLowerCase())
    || book.category.toLowerCase().includes(term.toLowerCase())
    || book.publisher.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(book.quantity).includes(term);
}

@Injectable({providedIn: 'root'})
export class BookService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _books$ = new BehaviorSubject<Book[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  
  private API_URL= environment.API_URL;

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

   BOOKS;
  
  constructor(private http: HttpClient, private pipe: DecimalPipe) {
    this.refresh();
  }

  get books$() { return this._books$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let books = sort(this.BOOKS, sortColumn, sortDirection);

    // 2. filter
    books = books.filter(book => matches(book, searchTerm, this.pipe));
    const total = books.length;

    // 3. paginate
    books = books.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({books, total});
  }
  
   getAll() {
        return this.http.get<Book[]>(this.API_URL + `/book`);
    }
  
   borrow(bookId: number) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.post<any>(this.API_URL + `/borrow`, { 'email': currentUser.email, 'bookId': bookId });
    }
  
  refresh() {
          this.getAll().pipe(first()).subscribe(books => {
            this.BOOKS = books;
        });
        this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(500),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._books$.next(result.books);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
 
}

