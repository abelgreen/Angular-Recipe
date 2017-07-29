import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { HomeComponent } from './home/home.component';
import { FoodComponent } from './food/food.component';
import { LoginComponent } from 'app/login/login.component';
import { SignupComponent } from 'app/signup/signup.component';
import { RecipedetailsComponent } from 'app/recipedetails/recipedetails.component';
import { FavorateComponent } from 'app/favorate/favorate.component';
import { SearchComponent } from 'app/search/search.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { ReadComponent } from 'app/read/read.component';
import { WatchComponent } from 'app/watch/watch.component';




const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'read', component: ReadComponent },
    { path: 'watch', component: WatchComponent },
    { path: 'header', component: HeaderComponent },
    {
        path: 'search', component: SearchComponent,
        children: [
            { path: '', redirectTo: 'food', pathMatch: 'full' },
            { path: 'food', component: FoodComponent },
            { path: 'food/:id', component: RecipedetailsComponent }
        ]
    },
    { path: 'favorate', component: FavorateComponent },
    {
        path: 'subMenu', component: SubMenuComponent,
        children: [
            { path: '', redirectTo: 'subMenu', pathMatch: 'full' },
            { path: 'food', component: FoodComponent },
            { path: 'food/:id', component: RecipedetailsComponent }
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'prefix' },
    { path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(routes);
