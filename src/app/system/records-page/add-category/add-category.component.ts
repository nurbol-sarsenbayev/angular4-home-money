import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Output() categoryAdded = new EventEmitter<Category>();
  sub: Subscription;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    if(form.valid) {
      const { name, capacity } = form.value;

      if(name.length > 0 && capacity > 0) {
        this.sub = this.categoryService.addCategory(new Category(name, capacity))
          .subscribe((category: Category) => {
            form.reset();
            this.categoryAdded.emit(category);
          });
      }
    }
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

}
