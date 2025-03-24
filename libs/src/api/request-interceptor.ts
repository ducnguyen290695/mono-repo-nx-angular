import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { Observable } from 'rxjs';
import { CookieKeyE } from '../enums';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = Cookies.get(CookieKeyE.ACCESS_TOKEN);

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        ...(!!accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });

    return next.handle(request);
  }
}
