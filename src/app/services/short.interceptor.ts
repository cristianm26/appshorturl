import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = '7a7b30969c426f5bacff1312c354bcf35e2c0eb0';
    request = request.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    return next.handle(request).pipe(catchError((error: HttpErrorResponse)=> {
      return throwError(error)
    }));
  }
}
