import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    private logged = new Subject<boolean>();

    private API_URL= environment.API_URL;
  
    login(username: string, password: string) {
        return this.http.post<any>(this.API_URL + `/login`, { 'email': username, 'password': password })
            .pipe(map(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.logged.next(true);
                }

                return user;
            }));
    }
  
    isLogged(): Observable<boolean> {
        return this.logged.asObservable();
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.logged.next(false);
    }
}

