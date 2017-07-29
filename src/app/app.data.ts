
import { Injectable } from '@angular/core';

@Injectable()
export class Food {
   public foods: Array<FoodInfo>;
   public users: Array<UserInfo>;
   public user: UserInfo;
   public foodImages: Array<FoodImage>;
   public subcategories: Array<SubCategory>;
   public subtypes: Array<SubType>;
   public categories: Array<Category>;
   public foodcategory: Array<FoodCategory>;
   public recipes: Array<Recipe>;
   public ingridients: Array<Ingridient>;
   public recipeIngridients: Array<RecipeIngridient>;
   public favFoods: Array<FavFood>;
   public statusError: StatusError;
}

export class FoodInfo {
    constructor(public food_id: number,
      public food_name: string,
      public food_img_id: number,
      public sub_food_type: number,
      public recipe_id: number ) {}
}
export class UserInfo {
    user_id: Number;
    user_name: string;
    email: string;
    pass: string;
};
export interface FoodImage {
    image_id: Number;
    image_name: string;
};
export interface SubCategory {
    sub_id: Number;
    category_id: Number;
};
export interface SubType {
   sub_id: Number;
   sub_type_name: string;
};
export interface Category {
   category_id: Number;
   sub_id: Number;
   basic_food_category: string;
   image_id: Number;
};

export interface FoodCategory {
    food_category_id: Number;
    category_id: Number;
    food_id: Number;
};
export interface Recipe {
    recipe_id: Number;
    description: string;
    preperation_time: Date;
    cooking_time: Date;
    serving: Number;
    rating: Number;
    recepie_date: Date;
};

export interface Ingridient {
   ingridient_id: Number;
   ingridient_name: string;
};

export interface RecipeIngridient {
   recipe_id: Number;
   ingridient_id: Number;
   unit: string;
   quantity: Number;
};

export interface FavFood {
    user_recipe_id: Number;
    user_id: Number;
    recipe_id: Number;
    rating: Number;
    rate_date: Date;
}
export interface StatusError {
    Status: string;
    Error: string;
}
