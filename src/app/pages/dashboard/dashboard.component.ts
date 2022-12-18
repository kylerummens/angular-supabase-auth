import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>

    <ng-container *ngIf="authService.$profile | async as profile">
        <div>{{ profile | json }}</div>
    </ng-container>

    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {

  constructor(
    public authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
