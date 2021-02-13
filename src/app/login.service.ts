import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from './login/Users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  loggedInUserKey;
  message = '';
  users = [];
  constructor(private http: HttpClient, private router: Router) { }

  login(loginFormData) {
    this.http.get('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe(res => {
        for (let key in res) {
          if (res[key].username == loginFormData.username && res[key].password == loginFormData.password) {
            this.isLoggedIn = true;
            this.loggedInUserKey = key;
            localStorage.setItem("userkey", this.loggedInUserKey);
            this.message = 'Login succesful! Redirecting...';
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 2000);
          }
        }
        if (this.message == '') {
          this.message = 'Credentials incorrect!';
        }
      });
  }

  addUser(user) {
    this.http.post('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/users.json', user)
      .subscribe(res => {
        console.log(res);
      });
  }

  getUsers() {
    this.http.get('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe((res: Users[]) => {
        this.users = res;
      });
  }
}
