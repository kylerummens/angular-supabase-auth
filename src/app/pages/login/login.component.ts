import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="login_form" (ngSubmit)="onSubmit()">

      <div>
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
      </div>

      <div>
          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password">
      </div>

      <div style="color:red" *ngIf="error">{{ error }}</div>

      <button type="submit" [disabled]="login_form.invalid">Submit</button>

  </form>
  `
})
export class LoginComponent {

  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  error?: string;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    if (this.login_form.valid) {

      delete this.error;

      const { email, password } = this.login_form.value;
      this.authService.signIn(email!, password!)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.error = err;
        })

    }
  }

}
