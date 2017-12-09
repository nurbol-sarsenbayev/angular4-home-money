import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    private isAuthenticated: boolean = false;

    constructor() { }

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}