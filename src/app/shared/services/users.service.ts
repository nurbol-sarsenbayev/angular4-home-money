import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";
import { BaseService } from "../core/base.service";

@Injectable()
export class UsersService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    getUser(email: string, password: string): Observable<User> {
        return this.get(`users?email=${email}&password=${password}`)
            .map((users: User[]) => users[0] || null);
    }

    isEmailExist(email: string): Observable<boolean> {
        return this.get(`users?email=${email}`)
            .map((users: User[]) => users.length > 0);
    }

    addUser(user: User): Observable<User> {
        return this.post('users', user);
    }

}