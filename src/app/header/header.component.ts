//import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class HeaderComponent {

  constructor(private dataStorageService : DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
    //console.log(Recipe);
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
