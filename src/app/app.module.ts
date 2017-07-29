import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Food} from './app.data';
import { DataService} from './data.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import {routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { FoodComponent } from './food/food.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { FavorateComponent } from './favorate/favorate.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReadComponent } from './read/read.component';
import { WatchComponent } from './watch/watch.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubMenuComponent,
    HomeComponent,
    FoodComponent,
    SignupComponent,
    LoginComponent,
    RecipedetailsComponent,
    FavorateComponent,
    SearchComponent,
    PageNotFoundComponent,
    ReadComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
   NgbModule.forRoot(),
    routing
  ],
   providers: [Food, DataService/*, {provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
