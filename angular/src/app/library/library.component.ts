import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  refreshNeededBook: boolean;
  refreshNeededMyBook: boolean;
  
  constructor() { }

  ngOnInit() {
  }
  
  bookChange(event) {
    this.refreshNeededMyBook = !this.refreshNeededMyBook;
  }

  myBookChange(event) {
    this.refreshNeededBook = !this.refreshNeededBook;
  }
}
