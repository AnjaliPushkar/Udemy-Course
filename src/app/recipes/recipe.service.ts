import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopppingListService } from '../shopping-list/shoppping-list.service';
import { Recipe} from "./recipe.model";

@Injectable()
export class RecipeService{

  //recipeChanges is for adding changes in recipe bcz all the changes in added in recipe will be a copy, so we
  //will copy changes in recipeChanged
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('first name', 'discription purpose',
          'https://www.gannett-cdn.com/media/2019/08/05/USATODAY/usatsports/247WallSt.com-247WS-565444-fast-food.jpg?crop=1365,768,x0,y0&width=660&height=372&format=pjpg&auto=webp',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Egg', 2)
          ]),
        new Recipe('second recipe', 'testing purpose',
        'https://www.gannett-cdn.com/media/2019/08/05/USATODAY/usatsports/247WallSt.com-247WS-565444-fast-food.jpg?crop=1365,768,x0,y0&width=660&height=372&format=pjpg&auto=webp',
        [
          new Ingredient('Bun', 1),
          new Ingredient('Chicken', 2)
        ]
        )
     
      ];

    constructor(private slService: ShopppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index :number){
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice()); //copying changes of recipes in recipeChanges bcz recipe will become a copy and chnges will not reflect
    }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }

}