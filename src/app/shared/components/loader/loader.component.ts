import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-loader',
  template: `
    <div class="loader-container">
      <div class="loader-animator"></div>
      </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
