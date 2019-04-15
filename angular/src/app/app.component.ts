import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logged = false;
 
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }
  
  ngOnInit(): void {
   this.authenticationService.isLogged().subscribe((logged) => {
     this.logged = logged;
   });
  }
  
  logout() {
    this.logged = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
