import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Users } from '../login/Users.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';

  registerFormData : Users = {username: '', password: '', name: '', email: ''};

  registerForm = {
    'username': '',
    'password': '',
    'repeatpassword': '',
    'name': '',
    'email': ''
  };

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {

  }

  formValidation() {
    if (this.registerForm.username.length == 0) {
      return 'Please enter username.';
    }
    if (this.registerForm.password.length == 0) {
      return 'Please enter password.';
    }
    if (this.registerForm.password.length < 4) {
      return 'Please enter password longer than 4 characters.'
    }
    if (this.registerForm.name.length == 0) {
      return 'Please enter name.';
    }
    if (this.registerForm.email.length == 0) {
      return 'Please enter e-mail.';
    }
    if (!(this.registerForm.email.includes('@') && this.registerForm.email.includes('.'))) {
      return 'Please enter valid e-mail.';
    }
    if (this.registerForm.password != this.registerForm.repeatpassword) {
      return 'Passwords don\'t match.';
    }
    return '';
  }

  fillRegisterFormData() {
    this.registerFormData.name = this.registerForm.name;
    this.registerFormData.email = this.registerForm.email;
    this.registerFormData.username = this.registerForm.username;
    this.registerFormData.password = this.registerForm.password;
  }

  clearForm() {
    this.registerForm.name = '';
    this.registerForm.email = '';
    this.registerForm.username = '';
    this.registerForm.password = '';
    this.registerForm.repeatpassword = ''; 
  }

  register() {
    this.errorMessage = this.formValidation();
    if (this.errorMessage == '') {
      this.fillRegisterFormData();
      this.loginService.addUser(this.registerFormData);
      this.clearForm();
      this.errorMessage = 'Registration successful.'
    }
  }
}
