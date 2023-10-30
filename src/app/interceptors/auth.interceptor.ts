import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'access-token': `${this.authService.getToken()}`,
      },
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 440) {
          this.authService.logOut();
          this.router.navigate(['/signin']);
          this.toastr.info(
            'Your session has expired. Please signin again.',
            'Session Expired'
          );
        } else if (error.status == 403) {
          if (request.url.endsWith('auth/login')) {
            this.toastr.error(
              'Please enter correct email and password.',
              'Incorrect Credentials'
            );
          } else {
            this.toastr.info(
              'You do not have permission to perform this task.',
              'Access Denied'
            );
            this.authService.logOut();
            this.router.navigate(['/signin']);
          }
        } else if (
          error.status == 401 ||
          error.status == 405 ||
          error.status == 406
        ) {
          this.toastr.error(error.error.message, error.error.title);
        } else {
          this.toastr.error('Something went wrong.');
        }
        return throwError(error);
      })
    );
  }
}
