import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateScope, Scope } from "./../../core/interfaces/scope";
import { ScopeService } from "./../../core/services/scope.service";
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
  templateUrl: "./scopes.component.html",
  styleUrls: [
    "./scopes.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})
export class ScopesComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = ["name", "description", "action"];
  dataSourceTable!: MatTableDataSource<Scope>;
  // create form
  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
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

  //constructor
  constructor(private _service: ScopeService, public dialog: MatDialog) {}

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
      .getScopes()
      .then((response: any) => {
        this.dataSourceTable = new MatTableDataSource(response.items);
        console.log(response.items);
        this.dataSourceTable.paginator = this.paginator as MatPaginator;
        this.dataSourceTable.sort = this.sort as MatSort;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error while trying to execute the request:", error);
      });
  }

  addData() {
    if (this.createForm.valid) {
      let data: CreateScope = {
        name: this.createForm.getRawValue().name,
        description: this.createForm.getRawValue().description,
      };
      console.log(data);
      this._service.createScope(data).subscribe((response) => {
        if (response) {
          Swal.fire("Added", "Scope sucessfully added", "success");
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
        description: data.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateScope(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(data);
        let body: any = {
          id: data.id,
          deleted: new Date(),
        };
        console.log(body);
        this._service.deleteScope(body).subscribe((response) => {
          this.onLoadRegisters();
          console.log(response);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
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
    description: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["description"].setValue(this.data.description);
  }
}
