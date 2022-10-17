import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: 
  //directly calling html from "css loading spinner" page from google
  '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
