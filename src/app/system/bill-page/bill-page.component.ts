import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject<void>();
  isLoaded = false;

  bill: Bill;
  currency: any;

  constructor(private billService: BillService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    )
    .takeUntil(this.unsubscribe)
    .subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    }); 
  }

  refresh() {
    this.isLoaded = false;
    this.billService.getCurrency()
      .takeUntil(this.unsubscribe)
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
