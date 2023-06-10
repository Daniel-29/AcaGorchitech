import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  label: string;
  alias: string;
  subnet: string;
  gateway: string;
  driver: string;
  networkId: string;
}
interface Test {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Deep Javiya', label: 'testtest test test test test', alias: 'test', subnet: 'test', gateway: 'test', driver: 'test', networkId: 'test' },
  { name: 'Deep Javiya', label: 'testtest test test test test', alias: 'test', subnet: 'test', gateway: 'test', driver: 'test', networkId: 'test' },
  { name: 'Deep Javiya', label: 'testtest test test test test', alias: 'test', subnet: 'test', gateway: 'test', driver: 'test', networkId: 'test' },
  { name: 'Deep Javiya', label: 'testtest test test test test', alias: 'test', subnet: 'test', gateway: 'test', driver: 'test', networkId: 'test' }
];

@Component({
  selector: 'app-containers',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent {
  step = 0;
  displayedColumns: string[] = ['name', 'label', 'alias', 'subnet', 'gateway', 'driver', 'action'];
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
