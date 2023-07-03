import { I } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dockerform',
  templateUrl: './dockerform.component.html',
  styleUrls: ['./dockerform.component.scss'],

})
export class DockerformComponent implements OnInit, OnChanges{
  formulario: FormGroup = new FormGroup({});
  formBuilderDD: FormBuilder;
  onFormCreated: boolean = false;

  @Input() InputForms: any[] | undefined;
  @Input() buttonName!: string;

  @Output() formEnJson: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.formBuilderDD = formBuilder;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const resultado = this.InputForms?.reduce((obj, item) => {
      obj[item.name] = "";
      return obj;
    }, {});
    this.formulario = this.formBuilderDD.group(resultado);
    this.onFormCreated = true;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.formulario.valid) {
      this.formEnJson.emit(this.formulario.value);
    }
  }
}