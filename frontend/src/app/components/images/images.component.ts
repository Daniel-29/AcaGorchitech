import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  repository: string;
  tag: string;
  size: string;
  imageId: string;
}
interface Test {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Deep Javiya', repository: 'testtest test test test test', tag: 'test', size: 'test', imageId: 'test' },
  { name: 'Deep Javiya', repository: 'test', tag: 'test', size: 'test', imageId: 'test' },
  { name: 'Deep Javiya', repository: 'test', tag: 'test', size: 'test', imageId: 'test' },
];

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  step = 0;
  displayedColumns: string[] = ['name', 'repository', 'tag', 'size', 'action'];
  dataSource = ELEMENT_DATA;
  tests: Test[] = [
    {value: 'values-1', viewValue: 'Value 1'},
    {value: 'values-2', viewValue: 'Value 2'},
    {value: 'values-3', viewValue: 'Value 3'}
  ];
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
