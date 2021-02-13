import { Component, OnInit } from '@angular/core';
import { Users } from './Users.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormData = {
    'username': '',
    'password': ''
  };

  isLoggedIn : boolean = false;

  users : Users[] = null;

  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
    this.loginService.message = '';
    if (localStorage.getItem("userkey") != 'null') {
      this.isLoggedIn = true;
    }
  }

  attemptLogon() {
    this.loginService.login(this.loginFormData);
  }

  logout() {
    localStorage.setItem("userkey", null);
    location.reload();
  }

}
