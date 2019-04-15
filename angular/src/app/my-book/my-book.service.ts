import { environment } from '../../environments/environment';
import { Book } from '../home/service/book/book.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyBookService {

  constructor(private http: HttpClient) { }
  
  private API_URL= environment.API_URL;
  
   restore(bookId: number) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.post<any>(this.API_URL + `/restore`, { 'email': currentUser.email, 'bookId': bookId });
   }
  
  getAllOwn() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.get<Book[]>(this.API_URL + `/book/` + currentUser.email);
  }
}
