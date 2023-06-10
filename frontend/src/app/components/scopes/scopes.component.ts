import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  description: string;
}
// interface Test {
//   value: string;
//   viewValue: string;
// }
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Deep Javiya', description: 'testtest test test test test'},
  { name: 'Deep Javiya', description: 'test'},
  { name: 'Deep Javiya', description: 'test'},
];

@Component({
  selector: 'app-scopes',
  templateUrl: './scopes.component.html',
  styleUrls: ['./scopes.component.scss']
})
export class ScopesComponent {
  step = 0;
  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  // tests: Test[] = [
  //   {value: 'values-1', viewValue: 'Value 1'},
  //   {value: 'values-2', viewValue: 'Value 2'},
  //   {value: 'values-3', viewValue: 'Value 3'}
  // ];
  setStep(index: number) {
    this.step = index;
    console.log(this.step);
  }
  
  constructor() { 
    console.log(this.step);
    
  }

  ngOnInit(): void {
  }
}
