import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.$profile.pipe(
      // We only want to get the first emitted value from the $profile
      first(),
      map(profile => {

        // Allow access if the user's profile is set
        if (profile) return true;

        // If the user is not signed in and does not have a profile, do not allow access
        else {
          // Redirect to the /login route, while capturing the current url so we can redirect after login
          this.router.navigate(['/login'], {
            queryParams: { redirect_url: state.url }
          });
          return false;
        }
      })
    )

  }

}
