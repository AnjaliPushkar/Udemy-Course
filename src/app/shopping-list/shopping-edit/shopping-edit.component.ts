import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ShopppingListService } from '../shoppping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm : NgForm;  
  subscription: Subscription;
  editedItemIndex : number;
  editMode = false;
  editedItem : Ingredient;

  
  constructor(private slService: ShopppingListService) { }

  ngOnInit(){
    this.subscription =  this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        }
        )
      }
    );
  }

  OnSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  OnClear(){
    //console.log(this.slForm);
    this.slForm.reset();
    //console.log(this.slForm);
    this.editMode = false;
  }

  OnDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.OnClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
