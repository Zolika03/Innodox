import { NgbdModalContentComponent } from '../modal-content/modal-content.component';
import { Book } from './service/book/book.d';
import { BookService } from './service/book/book.service';
import { SortableDirective, SortEvent } from './service/sortable.directive';
import { User } from './service/user/user.d';
import { UserService } from './service/user/user.service';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChildren, QueryList, Input, OnDestroy, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService, DecimalPipe]
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
    @Input() refreshNeeded;
    @Output() bookChange = new EventEmitter<boolean>();
  
    subscription: Subscription;
  
    books$: Observable<Book[]>;
    total$: Observable<number>;
  
   @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

    constructor(private userService: UserService,
                private bookService: BookService,
                private modalService: NgbModal) {
        this.books$ = bookService.books$;
        this.total$ = bookService.total$;
    }

    ngOnInit() {
      const source = interval(60000); //Extra - pull-service
      this.subscription = source.subscribe(val => this.bookService.refresh());
    }
  
    
    ngOnChanges(changes: SimpleChanges): void {
        this.bookService.refresh();
    }
  
    onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.bookService.sortColumn = column;
    this.bookService.sortDirection = direction;
  }
  
  borrow(bookId) {
    this.bookService.borrow(bookId).subscribe(()=> {
          this.bookService.refresh();
          this.bookChange.emit(true);
        });
  }
  
  openPreface(preface) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.header = 'Előszó';
    modalRef.componentInstance.content = preface;
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
