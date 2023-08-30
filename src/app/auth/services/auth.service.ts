import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { UserDetails } from '../models/user-details.model';

// END_POINTS of user_API
const API_Url_login = END_POINTS.login

@Injectable()


export class AuthService {

  // inject
  constructor(private http: HttpClient) { }

  // login
  login(model: User): Observable<UserDetails> {
    return this.http.post<User>(API_Url_login, model).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }
}
