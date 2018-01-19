import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../../../shared/core/base.service';
import { HmEvent } from '../models/event.model';

@Injectable()
export class EventService extends BaseService {

  constructor(protected http: Http) {
    super(http);
  }

  addEvent(event: HmEvent): Observable<HmEvent> {
    return this.post('events', event);
  }  

  getTotalOutcomeByCategoryId(): Observable<{[id: string]: number}> {
    return this.get('events?type=outcome')
      .map((events: HmEvent[]) => {
        let categories = {};

        for(let e of events) { 
          let key = e.category.toString();
          let amount = categories.hasOwnProperty(key) ? categories[key] : 0;

          categories[key] = amount + e.amount;
        }

        return categories;
      });
  }

}
