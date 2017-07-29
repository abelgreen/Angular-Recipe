import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Food, SubType, Category , SubCategory} from '../app.data';
import { DataService } from '../data.service';
import { URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodComponent } from 'app/food/food.component';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit, AfterViewInit {
  @ViewChild(FoodComponent)foodComponent: FoodComponent;
    ngAfterViewInit(): void {
    }
  constructor(private service: DataService,
   private myFood: Food,
    private router: Router,
    private route: ActivatedRoute) {  }

  ngOnInit() {
  }
   assignTypeCategory(value1: Number, value2: Number) {
     this.myFood.subcategories = [{'sub_id' : value1, 'category_id': value2}];
      this.getTheFood();
      this.router.navigate(['food'], {relativeTo: this.route});
   }
 private getTheFood() {
    const myFormBody = new URLSearchParams();
    // console.log(this.myFood.subcategories[0].sub_id.toString());
    myFormBody.set('sub_id', this.myFood.subcategories[0].sub_id.toString());
    myFormBody.set('category_id', this.myFood.subcategories[0].category_id.toString());
    this.service.targetUrl = './src/ServerPHP/getFood.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getFood.php';
    this.service.getFoods(myFormBody.toString())
      .subscribe(
      e => {
        this.myFood.foods = null;
        if (e[0]) {this.myFood.foods = e; }
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Selected food category was filled......');
      }
      );
  }

   myCategory( value: Number) {
     return this.myFood.categories.filter(cat => cat.sub_id === value);
   }
}
