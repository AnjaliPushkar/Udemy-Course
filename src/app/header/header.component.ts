import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, EventEmitter, Output } from '@angular/core';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }
}