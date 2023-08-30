import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  // inject
  constructor(
    private route: Router,
    private cookie_Service: CookieService
  ) { }


  // Http Request handler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(
          err => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: err.error.message,
              showConfirmButton: false,
              timer: 1500
            })
            // if error 401 unauthorized
            if (err.status == 401) {
              this.cookie_Service.delete('token_cic');
              this.route.navigate(['/auth/login']);
            }
            const error = err.error ? err.error.message || err.statusText : err.status;
            return throwError(error);

          }
        ))
  }
}



