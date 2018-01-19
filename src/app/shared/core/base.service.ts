import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export class BaseService {

    protected apiUrl = 'http://localhost:3000/';

    constructor(protected http: Http) { }

    protected getUrl(url: string): string {
        return this.apiUrl + url;
    }

    protected get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map((response: Response) => response.json());
    }

    protected post(url: string, data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }

    protected put(url: string, data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }
}