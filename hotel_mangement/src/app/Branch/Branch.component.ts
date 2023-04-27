import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'selector-name',
  templateUrl: 'Branch.component.html',
  styleUrls:['Branch.component.css']
})

export class BranchComponent  {
  isSideNavOpened : boolean =false;
  constructor() { }
  toggleSideNav() {
    console.log("changed")
    this.isSideNavOpened = !this.isSideNavOpened;
  }
}
