import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { BasicAuthInterceptor } from './interceptor/basic-auth.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SortableDirective } from './home/service/sortable.directive';
import { BookFormComponent } from './book-form/book-form.component';
import { LibraryComponent } from './library/library.component';
import { MyBookComponent } from './my-book/my-book.component';
import { NgbdModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SortableDirective,
    BookFormComponent,
    NgbdModalContentComponent,
    LibraryComponent,
    MyBookComponent,
    NgbdModalContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
   exports: [NgbdModalContentComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalContentComponent]
})
export class AppModule { }
