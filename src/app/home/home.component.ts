import { Component, OnInit } from '@angular/core';
import { Food } from 'app/app.data';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private myFood: Food , private service: DataService) {
  }

  ngOnInit() {
   this.getRecepies();
    this.getsubtype();
    this.getcategory();
    this.getImages();
    this.getAllFoods();
    if (!this.myFood.user) {this.myFood.user = { email: '', pass: '', user_id: -1, user_name: 'Guest' } ; }
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
      }
    );
    
  }
private getsubtype() {
     this.service.targetUrl = './src/ServerPHP/getSubType.php';
     // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getSubType.php';
    this.service.getSubTypes().subscribe(
      e => {
        this.myFood.subtypes = e;
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('SubType was filled ......');
      }
    );
   }
    public getcategory() {
     this.service.targetUrl = './src/ServerPHP/getCategory.php';
     // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getCategory.php';
    this.service.getCategories().subscribe(
      e => {
        this.myFood.categories = e;
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('Category was filled ......');
      }
    );
   }
    public getImages() {
     this.service.targetUrl = './src/ServerPHP/getImage.php';
     // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getImage.php';
    this.service.getImagesName().subscribe(
      e => {
        this.myFood.foodImages = e;
      },
      err => {
      console.log(err);
      },
      () => {
        console.log('Images was filled ......');
      }
    );
   }
   public getRecepies() {
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
      }
    );
   }
}
