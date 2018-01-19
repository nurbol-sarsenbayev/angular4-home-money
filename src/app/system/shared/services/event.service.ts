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

}
