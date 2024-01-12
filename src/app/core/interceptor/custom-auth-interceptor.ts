import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpLoaderService } from '../config/http-loader.service';
import { LoadingContextModel, LoadingType } from '../models/config.model';

export const IS_LOADING_ENABLED = new HttpContextToken<LoadingContextModel>(
  () => ({
    key: 'default',
    type: LoadingType.default,
    value: true
  })
);


@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {
  token = localStorage.getItem('token')

  constructor(
    private httpLoaderService: HttpLoaderService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context: LoadingContextModel = req.context.get(IS_LOADING_ENABLED);
    if (!this.token) {
      if (req.url.includes('connect/token')) {
        return next.handle(req).pipe(tap(
          (event: HttpEvent<any>) => event
        ));
      }
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: this.addHedear(req),
    });

    this.httpLoaderService.addLoadingListContext(context);
    return next.handle(authReq).pipe(
      tap({
        next: (event: HttpEvent<any>) => event,
        error: (error: HttpErrorResponse) => error,
        complete: () => {
          this.httpLoaderService.removeLoadingListContext(context);
        }
      })
    );
  }

  private addHedear(req:any) {
    if (req.url.includes('connect/token')) {
      return req.headers.
        set('Content-Type', 'application/x-www-form-urlencoded').
        set('Authorization', `Bearer ${this.token}`);
    } else if (req.url.includes('/supervising-broker-switch') && req.method === 'POST') {
      return req.headers.set('Authorization', `Bearer ${this.token}`);
    } else if (req.url.includes(environment.BaseUrl)) {

      return req.headers.set('Authorization', `Bearer ${this.token}`);
    } else {
      return req.headers.
        set('accept', '*/*').
        set('Content-Type', 'application/json').
        set('Authorization', `Bearer ${this.token}`);
    }
  }

}
