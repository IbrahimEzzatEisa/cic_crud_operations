import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  // value of loggedIn status
  private loggedIn: any;

  // inject
  constructor(
    private cookie_Service: CookieService
  ) {
    // call main function refresh Login Status
    this.refreshLoginStatus();
  }

  // get login status
  get_Login_Status(): any {
    // get token
    const token = this.cookie_Service.get('token_cic');
    // check of token
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }


  // Behavior Subject of logged in status
  public refreshLoginStatus() {
    if (!this.loggedIn) {
      this.loggedIn = new BehaviorSubject(this.get_Login_Status());
    } else {
      this.loggedIn.next(this.get_Login_Status());
    }

  }



}


