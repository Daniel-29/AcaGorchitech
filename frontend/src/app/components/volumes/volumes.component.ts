import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  type: string;
  source: string;
  mount: string;
  target: string;
  driver: string;
  label: string;
  size: string;
  volumeId: string;
}
interface Test {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Deep Javiya', type: 'testtest test test test test', source: 'test', mount: 'test', target: 'test', driver: 'test', label: 'test', size: 'test', volumeId: 'test' },
  { name: 'Deep Javiya', type: 'testtest test test test test', source: 'test', mount: 'test', target: 'test', driver: 'test', label: 'test', size: 'test', volumeId: 'test' },
  { name: 'Deep Javiya', type: 'testtest test test test test', source: 'test', mount: 'test', target: 'test', driver: 'test', label: 'test', size: 'test', volumeId: 'test' },
  { name: 'Deep Javiya', type: 'testtest test test test test', source: 'test', mount: 'test', target: 'test', driver: 'test', label: 'test', size: 'test', volumeId: 'test' }
];

@Component({
  selector: 'app-containers',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss']
})
export class VolumesComponent {
  step = 0;
  displayedColumns: string[] = ['name', 'type', 'source', 'mount', 'target', 'driver', 'label', 'size', 'action'];
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
