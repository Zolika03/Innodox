import { environment } from '../../../../environments/environment';
import { User } from './user.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }
    
    private API_URL= environment.API_URL;
  
    getAll() {
        return this.http.get<User[]>(this.API_URL + `/users`);
    }
}
