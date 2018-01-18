import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    MomentPipe
  ],
  exports: [
    MomentPipe
  ]
})
export class SharedModule { }
