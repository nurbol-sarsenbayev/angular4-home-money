import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { BillService } from '../../shared/services/bill.service';
import { EventService } from '../../shared/services/event.service';
import { HmEvent } from '../../shared/models/event.model';
import { Bill } from '../../shared/models/bill.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'hm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];

  unsubscribe = new Subject<void>();
  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  constructor(
    private billService: BillService,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    if(form.valid) {
      const { category, type, amount, description } = form.value;

      this.billService.getBill()
        .takeUntil(this.unsubscribe)
        .subscribe(bill => {
          let value = bill.value + (type == 'outcome' ? -1 : 1) * amount;
          let event = new HmEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

          if(value < 0) {
            console.log('Не хватает ' + Math.abs(value));
          } else {
            this.billService
              .updateBill(new Bill(value, bill.currency))
              .mergeMap(() => this.eventService.addEvent(event))
              .takeUntil(this.unsubscribe)
              .subscribe(data => {
                console.log('Была добавлена события');
                form.control.markAsUntouched();
                form.setValue({
                  category: 0,
                  type: 'income',
                  amount: null,
                  description: ''
                });
              });
          }
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
