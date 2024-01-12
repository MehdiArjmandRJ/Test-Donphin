import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
class PermissionsService {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token')
        let result = false;
        if (!token) {
            result = true;
        } else if (token && state.url === "/auth/login") {
            this.router.navigate(['panel/home'])
        }
        return result;
    }
}

export const PanelGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => inject(PermissionsService).canActivate(next, state);
