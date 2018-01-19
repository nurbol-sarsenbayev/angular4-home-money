import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'hm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  isLoaded = false;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  onCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  onCategoryUpdated(category: Category) {
    let index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }  

  refresh() {
    this.isLoaded = false;
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

}
