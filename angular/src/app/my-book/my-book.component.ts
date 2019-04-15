import { Book } from '../home/service/book/book.d';
import { BookService } from '../home/service/book/book.service';
import { NgbdModalContentComponent } from '../modal-content/modal-content.component';
import { MyBookService } from './my-book.service';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit, OnChanges {
  @Input() refreshNeeded;
  @Output() myBookChange = new EventEmitter<boolean>();
  books: Book[];
  constructor(private myBookService: MyBookService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.refresh();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      this.refresh();
  }
  
  restore(bookId) {
    this.myBookService.restore(bookId).subscribe(() => {
          this.refresh();
          this.myBookChange.emit(true);
    });
  }
  
  refresh() {
    this.myBookService.getAllOwn().pipe(first()).subscribe(books => {
            this.books = books;
    });
  }
  
  openContent(content) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.header = 'Tartalom';
    modalRef.componentInstance.content = content;
  }

}
