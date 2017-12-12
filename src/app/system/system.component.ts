import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hm-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemComponent implements OnInit {

  currentDate = new Date();

  constructor() { }

  ngOnInit() {
  }

}
