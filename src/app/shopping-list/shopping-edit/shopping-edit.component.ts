import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { ShopppingListService } from '../shoppping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('amountInput') amountInputRef : ElementRef;
  

  constructor(private slService: ShopppingListService) { }

  ngOnInit(): void {
  }
  OnAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }
}
