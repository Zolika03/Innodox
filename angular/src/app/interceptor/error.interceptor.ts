import { NgbdModalContentComponent } from '../modal-content/modal-content.component';
import { AuthenticationService } from '../service/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private modalService: NgbModal) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            }

            const error = err.error;
            this.openPopup(error);
            return throwError(error);
        }));
    }
  
    openPopup(content) {
      const modalRef = this.modalService.open(NgbdModalContentComponent);
      modalRef.componentInstance.header = 'Hiba';
      modalRef.componentInstance.content = content;
    }
}
