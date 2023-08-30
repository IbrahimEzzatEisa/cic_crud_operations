import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({ providedIn: 'root' })

// set header data
export class JwtInterceptor implements HttpInterceptor {

  // inject
  constructor(private cookie_Service: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let header: any;
    // get token
    let token = this.cookie_Service.get('token_cic');

    // check token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      })
    }

    request = request.clone({
      setHeaders: header
    });
    return next.handle(request);
  }
}
