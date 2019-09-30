import { Subject } from "rxjs";
import { Ingredient } from "./../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "French Fries",
      "Super Tasty - Awesome Fries !!",
      "https://www.spendwithpennies.com/wp-content/uploads/2013/10/Crispy-Oven-Fries-SpendWithPennies-27.jpg",
      [new Ingredient("potato", 10), new Ingredient("cheese", 3)]
    ),
    new Recipe(
      "Burger",
      "A big Fat double patty Burger",
      "https://www.spendwithpennies.com/wp-content/uploads/2013/10/Crispy-Oven-Fries-SpendWithPennies-27.jpg",
      [new Ingredient("bun", 2), new Ingredient("patty", 2)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.slice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
