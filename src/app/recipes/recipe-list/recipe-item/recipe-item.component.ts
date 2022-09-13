import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input,EventEmitter } from '@angular/core';
//import { RecipeService } from '../../recipe.service';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe: Recipe;
 
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
}
}
