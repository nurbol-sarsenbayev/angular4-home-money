import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() categoryUpdated = new EventEmitter<Category>();

  sub: Subscription;
  currentCategoryId: number;
  currentCategory: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.setDefaultCategory();
  }

  setDefaultCategory() {
    this.currentCategoryId = this.categories[0] ? this.categories[0].id : 0;
    this.changeCategory();
  }

  changeCategory() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);    
  }

  submit(form: NgForm) {
    if(form.valid) {
      const { name, capacity } = form.value;

      if(name.length > 0 && capacity > 0) {
        this.sub = this.categoryService.updateCategory(new Category(name, capacity, +this.currentCategoryId))
          .subscribe((category: Category) => {  
            console.log('Категория была редактирована');          
            this.categoryUpdated.emit(category);
            this.setDefaultCategory();
            form.control.markAsUntouched();
          });
      }
    }
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

}
