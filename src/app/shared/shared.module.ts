import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { MomentPipe } from './pipes/moment.pipe';
import { MessageComponent } from './components/message/message.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MessageService } from './services/message.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    MomentPipe,
    MessageComponent,
    FilterPipe,
    NotFoundComponent,
    LoaderComponent
  ],
  providers: [
    MessageService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentPipe,
    MessageComponent,
    NotFoundComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
