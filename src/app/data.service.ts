import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Recipe, FoodImage, SubType, Category, Food, Ingridient, RecipeIngridient,
  UserInfo, FoodInfo, FavFood, StatusError } from './app.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {

  private _targetUrl;
  set targetUrl(value: String) {
    this._targetUrl = value;
  }
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  public checkUser(data: String): Observable<UserInfo> {
    return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUsers(data): Observable<[UserInfo]> {
    return this.http.post(this._targetUrl, data)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public addUser(data): Observable<UserInfo> {
    return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public resetPassword(data): Observable<StatusError> {
     return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getSubTypes(): Observable<[SubType]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCategories(): Observable<[Category]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getRecipies(): Observable<[Recipe]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getImagesName(): Observable<[FoodImage]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public getFoodCategories(data): Observable<[Category]> {
    return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getFoods(data): Observable<[FoodInfo]> {
    return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
   public getAllFoods(): Observable<[FoodInfo]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

public getIngridients(): Observable<[Ingridient]> {
    return this.http.get(this._targetUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getIngRecp(data): Observable<[RecipeIngridient]> {
    return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

public addFavFood(data): Observable<FavFood> {
 return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
}
public getFavPersonFood(data): Observable<[FavFood]> {
  return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
}
public deleteUpdateSomeFavFoods(data): Observable<StatusError> {
     return this.http.post(this._targetUrl, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
   console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
