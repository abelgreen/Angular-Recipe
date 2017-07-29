import { Component, OnInit, OnDestroy } from '@angular/core';
import { Food, FoodInfo, Recipe, FoodImage, Category, UserInfo, FavFood } from 'app/app.data';
import { DataService } from 'app/data.service';
import { ActivatedRoute } from '@angular/router';
import {URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})
export class RecipedetailsComponent implements OnInit, OnDestroy {
  private id;
  private sub;
  private food: FoodInfo;
  private foodImage: FoodImage;
  private recipe: Recipe;
  private categories: [Category];
  private myCheck: Boolean = false;
  private favFood: FavFood;
  private  dateNowString: string;
  private addFavFoodMessage = '';
  constructor(private myFood: Food, private service: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    const year = (new Date()).getFullYear().toString();
    // tslint:disable-next-line:radix
    const month = (parseInt((new Date()).getMonth().toString()) + 1).toString();
    const day = (new Date()).getDate().toString();
    this.dateNowString = year + '-' + month + '-' + day;
    this.setFood();
    this.setImagesNames();
    this.setRecipe();
    this.getIngridients();
    this.getRecipeIngridients(this.recipe.recipe_id);
    this.getFoodCategories(this.id);
  }


   private getIngridients() {
       this.service.targetUrl = './src/ServerPHP/getIngridient.php';
       // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getIngridient.php';
    this.service.getIngridients().subscribe(
      e => {
        this.myFood.ingridients = e;
        console.log(this.myFood.ingridients);
      },
      err => {      console.log(err);
      },
      () => {
        console.log('Ingridients was filled ......');
      }
    );
  }
  private getRecipeIngridients(recipe_id: Number) {
    this.service.targetUrl = './src/ServerPHP/getRecipeIngridient.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getRecipeIngridient.php';
    const myFormBody = new URLSearchParams();
    myFormBody.set('recipe_id', recipe_id.toString());
    this.service.getIngRecp(myFormBody).subscribe(
      e => {
        this.myFood.recipeIngridients = e;
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('RecipeIngridients was filled ......');
      }
    );
  }
 private getFoodCategories(food_id: Number) {
    this.service.targetUrl = './src/ServerPHP/getFoodCategories.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getFoodCategories.php';
    const myFormBody = new URLSearchParams();
    myFormBody.set('food_id', food_id.toString());
    this.service.getFoodCategories(myFormBody).subscribe(
      e => {
        this.categories = e;
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('Related Categories was filled ......');
      }
    );
  }

 private addFoodFav() {
    this.service.targetUrl = './src/ServerPHP/addFavorateFood.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/addFavorateFood.php';
    const myFormBody = new URLSearchParams();
    myFormBody.set('user_id', this.myFood.user.user_id.toString());
    myFormBody.set('recipe_id', this.recipe.recipe_id.toString());
    myFormBody.set('rating', this.recipe.rating.toString());
    myFormBody.set('rate_date', this.dateNowString.toString());
    this.service.addFavFood(myFormBody).subscribe(
      e => { if (e.rating) {
        this.addFavFoodMessage = 'Success';
      }else {
        this.addFavFoodMessage = 'Fail';
      }
        if (!this.myFood.favFoods) {
              this.myFood.favFoods = [];
          }
           this.myFood.favFoods.push(e);
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('Your Favorate Food was saved ......');
      }
    );
  }
private setFood() {
  this.food = this.myFood.foods ? this.myFood.foods.find(foo => foo.food_id === this.id) : null;
  console.log(this.food);
}
private  setImagesNames() {
this.foodImage =   this.myFood.foodImages.find(food => food.image_id === this.food.food_img_id);
  }

  private  getImagesNames() {
 return './src/app/images/' + this.foodImage.image_name;
  }

 private  getIngridientName(ingridient_id: Number) {
 return  this.myFood.ingridients.find(ing => ing.ingridient_id === ingridient_id).ingridient_name;
  }
private setRecipe() {
  this.recipe = this.myFood.recipes.find(rec => rec.recipe_id === this.food.recipe_id);
}
checkAllBoxes() {
this.myCheck = !this.myCheck;
}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
