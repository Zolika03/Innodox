import { environment } from '../../environments/environment';
import { Book } from '../home/service/book/book.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookFormService {

  constructor(private http: HttpClient) { }
    
  private API_URL= environment.API_URL;
  
  postBook(book: Book) {
    return this.http.post<any>(this.API_URL + `/book`, book);
  }
}
