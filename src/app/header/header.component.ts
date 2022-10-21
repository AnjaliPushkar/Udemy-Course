//import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy {

  private userSub : Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService : DataStorageService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //!user?false:true
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  
  onSaveData(){
    this.dataStorageService.storeRecipes();
    //console.log(Recipe);
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
