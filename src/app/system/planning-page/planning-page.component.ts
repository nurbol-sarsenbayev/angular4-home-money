import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { Observable } from 'rxjs/Observable';
import { BillService } from '../shared/services/bill.service';
import { Subject } from 'rxjs/Subject';
import { PlanItem } from './plan-item.model';

@Component({
  selector: 'hm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = true;

  unsubscribe = new Subject<void>();
  items: PlanItem[] = [];
  billValue: number;

  constructor(
    private categoryService: CategoryService,
    private billService: BillService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.isLoaded = false;
    Observable.combineLatest(
      this.eventService.getTotalOutcomeByCategoryId(),
      this.categoryService.getCategories(),
      this.billService.getBill()
    )
    .takeUntil(this.unsubscribe)
    .subscribe(data => {
      let [outcomes, categories, bill] = data;

      this.isLoaded = true;
      this.items = [];
      this.billValue = bill.value;
      
      for(let c of categories) {
        this.items.push(new PlanItem(
          c.name,
          c.capacity,
          outcomes[c.id] || 0
        ));
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}