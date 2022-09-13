import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';


export class ShopppingListService{
    ingredientsChanged =  new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Mango', 10)
    ];
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // } or the below method, both are sm
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}