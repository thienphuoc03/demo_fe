import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  private token = localStorage.getItem('access_token')

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`)
      });
    }

    return next.handle(request);
  }
}
