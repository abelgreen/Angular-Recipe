import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers, RequestOptions, ResponseType, URLSearchParams } from '@angular/http';
import { DataService } from 'app/data.service';
import { Food } from 'app/app.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private errorMessage: String;
  loginForm: FormGroup;
  constructor(fb: FormBuilder, private service: DataService, private myFood: Food, private router: Router) {
    this.loginForm = fb.group({
      'email': ['ab@cd.com', Validators.required],
      'pass': ['abcd', Validators.required ]
    });
  }
  submitForm(value: any) {
    const myFormBody = new URLSearchParams();
    myFormBody.set('email', value.email);
    myFormBody.set('pass', value.pass);
 console.log(myFormBody.toString());
    this.service.targetUrl = './src/ServerPHP/checkUser.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/checkUser.php';
    const myObservable = this.service.checkUser(myFormBody.toString());
    myObservable.subscribe(
      e => {
        this.myFood.user = e;
      if (this.myFood.user.email) {
        this.errorMessage = '';
        this.router.navigate(['/subMenu']);
       }else {
       this.errorMessage = 'User or pass is not correct. Try again!!!';
      }
    },
      err => { console.log(err); this.errorMessage = err; },
      () => { console.log('completed....'); }
    );
    // console.log(this.myUser);
  }

  public changePass() {
    const myFormBody = new URLSearchParams();
    myFormBody.set('email', this.loginForm.controls['email'].value);
    myFormBody.set('pass', this.loginForm.controls['pass'].value);
    console.log(myFormBody);
    this.service.targetUrl = './src/ServerPHP/resetPassword.php';
    // 'http://localhost:1234/dashboard/web/ProjectPHP/SAMRECIPE/src/ServerPHP/resetPassword.php';
    const myObservable = this.service.resetPassword(myFormBody.toString());
    myObservable.subscribe(
      e => {
        this.myFood.statusError = e;
        // console.log(e);
        console.log(this.myFood.statusError);
      if (this.myFood.statusError.Status === 'Success') {
        this.errorMessage = '';
        this.router.navigate(['/login']);
       }else {
       this.errorMessage = 'Fail : pass not changed. Enter correct Email Or UserName!!!';
      }
    },
      err => { console.log(err); this.errorMessage = err; },
      () => { console.log('completed....'); }
    );
  }
  get ErrorMessage(): String {
    return this.errorMessage;
  }

  ngOnInit() {
  }

}
