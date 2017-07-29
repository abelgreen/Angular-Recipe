import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, Response, Request, RequestMethod, URLSearchParams } from '@angular/http';

import { Router } from '@angular/router';
import { Food, UserInfo } from 'app/app.data';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
private errorMsg: String;
private oneUser: UserInfo;
private showable: boolean;
signupForm: FormGroup;
  constructor(fb: FormBuilder, private service: DataService, private router: Router, private myFood: Food) {
    this.showable = true;
    this.signupForm = fb.group({
      'user_name': [ '', Validators.required],
      'email': [ '', Validators.compose([Validators.required, Validators.email])],
      'pass': [ '', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])]
    });
  }
  ngOnInit() {
  }

submitForm(value: any) {
    const myFormBody = new URLSearchParams();
    for (let key in value) {
      if (value.hasOwnProperty(key) ) {
        myFormBody.set(key , value[key]);
      }
    }
 this.service.targetUrl = './src/ServerPHP/addUser.php';
 // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/addUser.php';
    const myObservable = this.service.addUser(myFormBody.toString());
    console.log(myFormBody);
  myObservable.subscribe(
      e => {console.log(e);
        if (e.email) {
          this.errorMsg = '';
          this.myFood.user = e;
          if (!this.myFood.users) {
              this.myFood.users = [];
          }
           this.myFood.users.push(this.oneUser);
        this.router.navigate(['/home']);
        }else {
        this.errorMsg = e['Error'];
        }
    },
      err => { console.log(err); },
      () => { console.log('User was Added to DataBase....'); }
    );
}
get ErrorMsg (){
  return this.errorMsg;
}
}
