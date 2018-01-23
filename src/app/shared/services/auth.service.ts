import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "./users.service";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private router: Router
    ) { }

    login(email: string, password: string): Observable<boolean> {
        return this.userService.getUser(email, password)
            .map(user => {
                if(user) {
                    window.localStorage.setItem('user', JSON.stringify(user))
                    return true;
                }
                return false;
            });
    }

    getCurrentUser(): User {
        let user = JSON.parse(window.localStorage.getItem('user'));
        return user;
    }

    logout() {
        window.localStorage.clear();
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        let user = this.getCurrentUser();        
        return !!user;
    }
}