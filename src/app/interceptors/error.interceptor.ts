import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, retry, retryWhen, throwError, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      //retry({count: maxRetries, delay: (error) => this.notifyHandlerServerError$(error)}),
      catchError( error => this.handleUnauthorizedError(error))
    );
  }

  private notifyHandlerServerError$(error: Error): Observable<unknown>{
    const isServerError = error.message.includes('500');
    return isServerError ? timer(delayMs) : throwError(() => error);
  }

  private handleUnauthorizedError(error: HttpErrorResponse){

    console.log(error)

    if([401, 403].includes(error.status)){
      this.authService.logout();
    }

    const _error = error.error?.message || error.statusText;
    return throwError(() => _error);
  }
}
