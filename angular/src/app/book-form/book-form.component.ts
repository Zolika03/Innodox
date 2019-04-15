import { BookService } from '../home/service/book/book.service';
import { BookFormService } from './book-form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  fg: FormGroup;
  submitted = false;
  error: String;
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private bookFormService: BookFormService) { }

  ngOnInit() {
    this.fg = this.fb.group({
      title: ['', Validators.required],
      authors: ['', Validators.required],
      publisher: ['', Validators.required],
      category: ['', Validators.required],
      preface: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      quantity: ['', [Validators.required, Validators.max(10), Validators.min(1)]]
    });
  }
  
  get f() { return this.fg.controls; }
  
  onSubmit() {
      this.submitted = true;
    
      if (this.fg.invalid) {
          return;
      }
    
      this.bookFormService.postBook(this.fg.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['']);
              },
              error => {
                  this.error = error;
              });
  }

}
