import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { URLSearchParams } from '@angular/http';
import { Food } from 'app/app.data';

@Component({
  selector: 'app-favorate',
  templateUrl: './favorate.component.html',
  styleUrls: ['./favorate.component.css']
})
export class FavorateComponent implements OnInit {
  private deletedRecipeId: Number[];
  private isRecReady = false;
  private isFavReady = false;
  private isFoodReady = false;
  myDeleteParam: string;
  onlyRead: Boolean = true;
  private editable: [{ recipe_id: string, rating: Number }];
  constructor(private service: DataService, private myFood: Food) {
    this.deletedRecipeId = [];
    this.editable = [{ recipe_id: '', rating: -1 }];
  }

  ngOnInit() {
    if (this.myFood.user.user_id !== -1) {
      this.getRecepies();
      this.getFavFoods();
      this.getAllFoods();
    }
   
  }
  private toggleEdit() {
    this.onlyRead = !this.onlyRead;
  }
  private doRateEdit(value, value2) {
    this.editable.push({ recipe_id: value, rating: value2 });
  }
  private deleteFromClient(recipe_id: Number) {
    this.myFood.favFoods = this.myFood.favFoods.filter(food => food.recipe_id !== recipe_id);
    this.deletedRecipeId.push(recipe_id);
  }
  saveChanges() {
    console.log(this.deletedRecipeId);
    console.log(this.editable);
     this.myDeleteParam = this.deletedRecipeId.join(',');
    if (this.myDeleteParam !== '') { this.doDelete(); }
    this.editable.forEach(
      rec => { if (rec.rating !== -1) {
        const myFormBody = new URLSearchParams();
        myFormBody.set('user_id', this.myFood.user.user_id.toString());
        myFormBody.set('rating', rec.rating.toString());
        myFormBody.set('recipe_id', rec.recipe_id.toString());
        this.doUpdate(myFormBody);
      }
    });
    setTimeout(() => {
      this.cancelChanges();
    }, 20);
  }

  private doDelete() {
    this.service.targetUrl = './src/ServerPHP/deleteSomeFavFoods.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/deleteSomeFavFoods.php';
    const myFormBody = new URLSearchParams();
    myFormBody.set('user_id', this.myFood.user.user_id.toString());
    myFormBody.set('recipe_ids', this.myDeleteParam.toString());
    this.service.deleteUpdateSomeFavFoods(myFormBody).subscribe(
      e => {
        this.myFood.statusError = e;
        if (this.myFood.statusError.Status === 'Success') {
          console.log('Deleted Successfully');
        } else {
          console.log('delete Not Works ...');
        }
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }


  private doUpdate(data) {
    this.service.targetUrl = './src/ServerPHP/updateFavFoodRating.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/updateFavFoodRating.php';
    this.service.deleteUpdateSomeFavFoods(data).subscribe(
      e => {
        this.myFood.statusError = e;
        if (this.myFood.statusError.Status === 'Success') {
          console.log('Updated Successfully');
        } else {
          console.log('Update Not Works ...');
        }
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  cancelChanges() {
    this.getRecepies();
    this.getFavFoods();
    this.deletedRecipeId = [];
    this.editable = [{ recipe_id: '', rating: -1 }];
  }
  private getFavFoods() {
    this.service.targetUrl = './src/ServerPHP/getAllFavorate.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getAllFavorate.php';
    const myFormBody = new URLSearchParams();
    myFormBody.set('user_id', this.myFood.user.user_id.toString());
    this.service.getFavPersonFood(myFormBody).subscribe(
      e => {
        if (e[0]) {
          this.myFood.favFoods = e;
          this.isFavReady = true;
        }
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Favorate Foods filled ......');
      }
    );
  }
  private getRecepies() {
    this.service.targetUrl = './src/ServerPHP/getRecipe.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getRecipe.php';
    this.service.getRecipies().subscribe(
      e => {
        this.myFood.recipes = e;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Recipes was filled ......');
        this.isRecReady = true;
      }
    );
  }


  private getAllFoods() {
    this.service.targetUrl = './src/ServerPHP/getAllFoods.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getAllFoods.php';
    this.service.getAllFoods().subscribe(
      e => {
        this.myFood.foods = e;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('All Foods was filled ......');
        this.isFoodReady = true;
      }
    );
  }

  getFoodName(recipe_id: Number) {
    return this.myFood.foods.find(food => food.recipe_id === recipe_id).food_name;
  }
  getAvrageRating(recipe_id: Number) {
    return this.myFood.recipes.find(rec => rec.recipe_id === recipe_id).rating;
  }
}
