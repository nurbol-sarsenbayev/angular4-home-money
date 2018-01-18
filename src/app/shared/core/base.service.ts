import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export class BaseService {

    public apiUrl = 'http://localhost:3000/';

    constructor(protected http: Http) { }

    private getUrl(url: string): string {
        return this.apiUrl + url;
    }

    get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map((response: Response) => response.json());
    }

    post(url: string, data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }

    put(url: string, data: any = {}): Observable<any> {
        return this.http.get(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }
}