import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppInitService {
  private authorize = new BehaviorSubject<boolean>(true);
  public token!: string;
  constructor() {

  }

  public InitApp(): Observable<boolean> {
    return this.authorize;
  }

  public checkAddTokenToHeader() {
    if (
      !this.authorize
      // req.url.includes('connect/token') ||
      // req.url.includes('connect/authorize') ||
      // req.url.includes('pwd-login') ||
      // req.url.includes('otp-login') ||
      // req.url.includes('2fa-login') ||
      // req.url.includes('logout') ||
      // req.url.includes('sign-up') ||
      // req.url.includes('reset-password') ||
      // req.url.includes('resend-2fa')
    ) {
      return false;
    }

    return true;
  }
}
