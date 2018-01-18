import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Bill } from "../models/bill.model";
import { BaseService } from "../core/base.service";

@Injectable()
export class BillService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://api.fixer.io/latest?base=${base}&symbols="RUB,USD,EUR"`)
            .map(response => response.json());
    }
}
