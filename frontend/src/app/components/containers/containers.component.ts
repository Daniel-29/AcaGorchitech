import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  scope: string;
  image: string;
  volumen: string;
  network: string;
  cpu: string;
  memory: string;
  storage: string;
  label: string;
  ip: string;
  port: string;
  status: string;
  containerId: string;
}
interface Test {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Deep Javiya', scope: 'testtest test test test test', image: 'test', volumen: 'test', network: 'test', cpu: 'test', memory: 'test', storage: 'test', label: 'test', ip: 'test', port: 'test', status: 'test', containerId: 'test' },
  { name: 'Deep Javiya', scope: 'test', image: 'test', volumen: 'test', network: 'test', cpu: 'test', memory: 'test', storage: 'test', label: 'test', ip: 'test', port: 'test', status: 'test', containerId: 'test' },
  { name: 'Deep Javiya', scope: 'test', image: 'test', volumen: 'test', network: 'test', cpu: 'test', memory: 'test', storage: 'test', label: 'test', ip: 'test', port: 'test', status: 'test', containerId: 'test' },
];

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {
  step = 0;
  displayedColumns: string[] = ['name', 'scope', 'image', 'volumen', 'network', 'cpu', 'memory', 'storage', 'label', 'ip', 'port', 'status', 'action'];
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
