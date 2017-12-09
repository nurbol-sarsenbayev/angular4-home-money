import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UsersService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: Http) {}

    getUser(email: string, password: string): Observable<User> {
        return this.http.get(`${this.apiUrl}/users?email=${email}&password=${password}`)
            .map(response => response.json())
            .map((users: User[]) => users[0] || null);
    }

    isEmailExist(email: string): Observable<boolean> {
        return this.http.get(`${this.apiUrl}/users?email=${email}`)
            .map(response => response.json())
            .map((users: User[]) => users.length > 0);
    }

    addUser(user: User): Observable<User> {
        return this.http.post(`${this.apiUrl}/users`, user)
            .map(response => response.json());
    }

}