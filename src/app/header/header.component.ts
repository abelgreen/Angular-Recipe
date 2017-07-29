import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {bootstrap} from 'bootstrap';
import {URLSearchParams } from '@angular/http';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Food, FoodInfo } from 'app/app.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private errorMessage: String;
  searchForm: FormGroup;
  constructor(fb: FormBuilder, private service: DataService, private myFood: Food, private router: Router) {
    this.searchForm = fb.group({
      'foodname': ['', Validators.required]
    });
  }
  submitForm(value: any) {
    const myFormBody = new URLSearchParams();
    myFormBody.set('foodname', value.foodname);
    console.log(myFormBody.toString());
    this.service.targetUrl = './src/ServerPHP/getFoodsByName.php';
     // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/getFoodsByName.php';
    const myObservable = this.service.getFoods(myFormBody.toString());
    myObservable.subscribe(
      e => {this.myFood.foods = null;
       if (e[0]) { this.myFood.foods = e; }
      if (this.myFood.foods) {
        this.errorMessage = '';
       }else {
       this.errorMessage = 'Some Errors happen!!!';
      }
      this.router.navigate(['/search']);
    },
      err => { console.log(err); this.errorMessage = err; },
      () => { console.log('Search Foods was filled ....'); }
    );
  }
ngOnInit() {
  if (!this.myFood.user) {this.myFood.user = { email: '', pass: '', user_id: -1, user_name: 'Guest' } ; }
   }
}
