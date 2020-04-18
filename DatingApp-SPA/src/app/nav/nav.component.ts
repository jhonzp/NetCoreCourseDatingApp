import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      console.log('Logged in successfully');
    }, error => {
        this.alertify.error(error);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    this.authService.logout();
    this.model = {};
    this.alertify.message('logged out!!');
  }
  GetUserName() {
    return this.authService.GetUserName();
  }
}