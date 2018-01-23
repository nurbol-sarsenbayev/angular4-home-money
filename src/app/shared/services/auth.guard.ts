import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {    

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.authService.isLoggedIn()) {
            this.router.navigate(['/login'], { queryParams: { accessDenied: true } })
            return false;
        }
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

}