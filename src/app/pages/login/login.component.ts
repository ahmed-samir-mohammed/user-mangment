import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  isLogin: boolean = false;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: [''],
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      this.isLogin = true;
      localStorage.setItem('loginSatus', JSON.stringify(this.isLogin));
      this.router.navigateByUrl('/');
    }
  }
}
