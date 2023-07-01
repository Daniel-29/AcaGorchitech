import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateVolume, Volume } from "./../../core/interfaces/volume";
import { VolumeService } from "./../../core/services/volume.service";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-containers",
  templateUrl: "./volumes.component.html",
  styleUrls: [
    "./volumes.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})
export class VolumesComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = [
    "name",
    "type",
    "source",
    "mount",
    "target",
    "driver",
    "label",
    "size",
    "action",
  ];
  dataSourceTable!: MatTableDataSource<Volume>;
  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    source: new FormControl(null, [Validators.required]),
    mount: new FormControl(null, [Validators.required]),
    target: new FormControl(null, [Validators.required]),
    driver: new FormControl(null, [Validators.required]),
    label: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required]),
  });
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTable.paginator) {
      this.dataSourceTable.paginator.firstPage();
    }
  }
  constructor(private _service: VolumeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.onLoadRegisters();
  }
  setStep(index: number) {
    this.step = index;
    console.log(this.step);
  }

  selectedTabValue(event: any) {
    this.setStep(event.index);
  }

  onLoadRegisters(): any {
    this._service
      .getVolumes()
      .then((response: any) => {
        this.dataSourceTable = new MatTableDataSource(response.items);
        console.log(response.items);
        this.dataSourceTable.paginator = this.paginator as MatPaginator;
        this.dataSourceTable.sort = this.sort as MatSort;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error while trying to execute request:", error);
      });
  }

  addData() {
    if (this.createForm.valid) {
      let data: CreateVolume = {
        name: this.createForm.getRawValue().name,
        type: this.createForm.getRawValue().type,
        source: this.createForm.getRawValue().source,
        mount: this.createForm.getRawValue().mount,
        target: this.createForm.getRawValue().target,
        driver: this.createForm.getRawValue().driver,
        label: this.createForm.getRawValue().label,
        size: this.createForm.getRawValue().label,
        volumenld: "",
      };
      console.log(data);
      this._service.createVolume(data).subscribe((response) => {
        if (response) {
          Swal.fire("Added", "Volume sucessfully added", "success");
        }
        this.onLoadRegisters();
      });

      this.createForm.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid inputs",
      });
    }
  }

  updateData(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(Modal, {
      data: {
        name: data.name,
        type: data.type,
        source: data.source,
        mount: data.mount,
        target: data.target,
        driver: data.driver,
        label: data.label,
        size: data.label,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateVolume(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    console.log(data);
    this._service.deleteVolume(data.id).subscribe((response) => {
      console.log(response);
      this.onLoadRegisters();
    });
  }
}
@Component({
  selector: "modal",
  templateUrl: "modal.html",
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class Modal {
  //modal: Modal; // Agrega esta propiedad

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Modal>
  ) {}
  submitForm() {
    // Check if the form is valid
    if (this.updateForm.valid) {
      // Pass the form value back to the parent component
      this.dialogRef.close(this.updateForm.value);
    }
  }
  public updateForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    source: new FormControl(null, [Validators.required]),
    mount: new FormControl(null, [Validators.required]),
    target: new FormControl(null, [Validators.required]),
    driver: new FormControl(null, [Validators.required]),
    label: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["type"].setValue(this.data.type);
    this.updateForm.controls["source"].setValue(this.data.source);
    this.updateForm.controls["mount"].setValue(this.data.mount);
    this.updateForm.controls["target"].setValue(this.data.target);
    this.updateForm.controls["driver"].setValue(this.data.driver);
    this.updateForm.controls["label"].setValue(this.data.label);
    this.updateForm.controls["size"].setValue(this.data.size);
  }
}
