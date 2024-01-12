import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { LoginFormModel } from '../../models/login-form.model';
import { ILoginPage } from '../../models/login-management';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, ILoginPage {
  loginForm!: RxFormGroup;
  isPending: boolean = false;
  constructor(private _formBuilder: RxFormBuilder, private router: Router) { }

  ngOnInit() {
    this.initialLoginForm();
  }



  initialLoginForm() {
    let loginForm: LoginFormModel = new LoginFormModel(null);
    this.loginForm = this._formBuilder.formGroup(loginForm) as RxFormGroup;
  }

  submitLogin() {
    localStorage.setItem('token', this.loginForm.value.email);
    this.router.navigate(['/panel/cars'])
  }

  ngOnDestroy(): void {

  }

}
