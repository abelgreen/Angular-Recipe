import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Food, SubCategory } from '../app.data';
import { DataService } from '../data.service';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import {ofobjectchanges } from 'rx/ts/core/linq/observable/ofobjectchanges';
import 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SubMenuComponent } from 'app/sub-menu/sub-menu.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
    }
  constructor(private service: DataService, private router: Router, private route: ActivatedRoute,
    private myFood: Food) {     }

  ngOnInit() {
  }

private  getImagesNames(imageId: Number) {
return './src/app/images/' + this.myFood.foodImages.find(food => food.image_id === imageId).image_name;
  }
private  getRecepie(recipeId) {
return this.myFood.recipes.find(rcp => rcp.recipe_id === recipeId);
  }

private goFoodDetail(foodId: Number) {
  this.router.navigate([ foodId], {relativeTo: this.route});
}
}
