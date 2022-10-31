import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopppingListService } from './shopping-list/shoppping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list-module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
  ],

  //for ngif, for, form, http etc
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [ShopppingListService, RecipeService,
  {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
