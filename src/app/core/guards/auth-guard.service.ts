import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Http/interceptors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // status of login
  loginStatus?: boolean;

  // inject
  constructor(
    private auth_Service: AuthenticationService,
    private router: Router
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // get status
    this.loginStatus = this.auth_Service.get_Login_Status();

    // check of login or not
    if (this.loginStatus == true) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
