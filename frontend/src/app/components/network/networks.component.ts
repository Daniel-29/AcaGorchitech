import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateNetwork, Network } from "./../../core/interfaces/network";
import { NetworkService } from "./../../core/services/network.service";
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

interface Test {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-containers",
  templateUrl: "./networks.component.html",
  styleUrls: [
    "./networks.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})
export class NetworksComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = [
    "name",
    "label",
    "alias",
    "subnet",
    "gateway",
    "driver",
    "action",
  ];
  dataSourceTable!: MatTableDataSource<Network>;
  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    label: new FormControl(null, [Validators.required]),
    alias: new FormControl(null, [Validators.required]),
    subnet: new FormControl(null, [Validators.required]),
    gateway: new FormControl(null, [Validators.required]),
    driver: new FormControl(null, [Validators.required]),
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

  tests: Test[] = [
    { value: "values-1", viewValue: "Value 1" },
    { value: "values-2", viewValue: "Value 2" },
    { value: "values-3", viewValue: "Value 3" },
  ];
  constructor(private _service: NetworkService, public dialog: MatDialog) {}

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
      .getNetworks()
      .then((response: any) => {
        this.dataSourceTable = new MatTableDataSource(response.items);
        console.log(response.items);
        this.dataSourceTable.paginator = this.paginator as MatPaginator;
        this.dataSourceTable.sort = this.sort as MatSort;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }

  addData() {
    //Swal.fire("Thank you...", "You submitted succesfully!", "success");
    // Swal.fire({
    //   title: "Are you sure want to remove?",
    //   text: "You will not be able to recover this file!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, delete it!",
    //   cancelButtonText: "No, keep it",
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire(
    //       "Deleted!",
    //       "Your imaginary file has been deleted.",
    //       "success"
    //     );
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
    //   }
    // });

    if (this.createForm.valid) {
      let data: CreateNetwork = {
        name: this.createForm.getRawValue().name,
        label: this.createForm.getRawValue().label,
        alias: this.createForm.getRawValue().alias,
        subnet: this.createForm.getRawValue().subnet,
        gateway: this.createForm.getRawValue().gateway,
        driver: this.createForm.getRawValue().driver,
        networkId: "",
      };
      console.log(data);
      this._service.createNetwork(data).subscribe((response) => {
        if (response) {
          Swal.fire("Agregado", "Se agrego correctamente", "success");
        }
        this.onLoadRegisters();
      });

      this.createForm.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los datos ingresados son incorrectos",
      });
    }
  }

  updateData(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(Modal, {
      data: {
        name: data.name,
        label: data.label,
        alias: data.alias,
        subnet: data.subnet,
        gateway: data.gateway,
        driver: data.driver,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateNetwork(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    console.log(data);
    this._service.deleteNetwork(data.id).subscribe((response) => {
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
    label: new FormControl(null, [Validators.required]),
    alias: new FormControl(null, [Validators.required]),
    subnet: new FormControl(null, [Validators.required]),
    gateway: new FormControl(null, [Validators.required]),
    driver: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["label"].setValue(this.data.label);
    this.updateForm.controls["alias"].setValue(this.data.alias);
    this.updateForm.controls["subnet"].setValue(this.data.subnet);
    this.updateForm.controls["gateway"].setValue(this.data.gateway);
    this.updateForm.controls["driver"].setValue(this.data.driver);
  }
}
