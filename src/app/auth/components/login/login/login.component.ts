import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/auth/models/user-details.model';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // main object of login
  user: User = new User();
  // user details
  user_details: UserDetails = new UserDetails();

  // form
  @ViewChild('form') form: NgForm;

  // inject
  constructor(
    private auth_Service: AuthService,
    private route: Router,
    private cookie_Service: CookieService
  ) { }

  ngOnInit() {
    // if routing login page will clear token
    this.cookie_Service.delete('token_cic');
  }

  // check of form valid or not
  onSubmit() {
    if (this.form.valid) {
      this.login()
    }
  }

  // login
  login() {
    this.auth_Service.login(this.user).subscribe((data) => {
      this.user_details = data;
      this.cookie_Service.set('token_cic', JSON.stringify(this.user_details.token), { expires: 7, secure: true, sameSite: 'Strict' });
      this.route.navigate(['/employee']);

    })

  }
}
