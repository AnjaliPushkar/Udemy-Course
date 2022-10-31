import { Ingredient } from "../../shared/ingredient.model";
import * as ShopppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Mango', 10)
    ]
};

export function shoppingListReducer(state = initialState, action : ShopppingListActions.AddIngredient){
    switch (action.type){
        case ShopppingListActions.ADD_INGREDIENT :
            return{
            //js syntax, it pulls out all the property and overrite the ingredients
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
    }
}