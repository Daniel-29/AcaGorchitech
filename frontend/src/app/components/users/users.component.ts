import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateUser, User } from "./../../core/interfaces/user";
import { UserService } from "./../../core/services/user.service";
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
  templateUrl: "./users.component.html",
  styleUrls: [
    "./users.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})
export class UsersComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = ["user", "name", "email", "action"];
  dataSourceTable!: MatTableDataSource<User>;
  public createForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    roleId: new FormControl(null, [Validators.required]),
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
    { value: "values-1", viewValue: "Admin" },
    { value: "values-2", viewValue: "Employee" },
    { value: "values-3", viewValue: "User" },
  ];
  constructor(private _service: UserService, public dialog: MatDialog) {}

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
      .getUsers()
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
    if (this.createForm.valid) {
      let data: CreateUser = {
        username: this.createForm.getRawValue().username,
        name: this.createForm.getRawValue().name,
        password: this.createForm.getRawValue().password,
        passwordConfirm: this.createForm.getRawValue().passwordConfirm,
        email: this.createForm.getRawValue().email,
        emailVisibility: true,
        //roleId: "",
      };
      console.log(data);
      this._service.createUser(data).subscribe((response) => {
        if (response) {
          Swal.fire("Agregado", "Se agrego correctamente", "success");
        }
        this.onLoadRegisters();
      });

      this.createForm.reset();
    } else {
      console.log(this.createForm);
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
        user: data.user,
        name: data.name,
        password: data.password,
        email: data.email,
        roleId: data.roleId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateUser(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    console.log(data);
    this._service.deleteUser(data.id).subscribe((response) => {
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
    user: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    roleId: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updateForm.controls["user"].setValue(this.data.user);
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["password"].setValue(this.data.password);
    this.updateForm.controls["email"].setValue(this.data.email);
    this.updateForm.controls["role"].setValue(this.data.roleId);
  }
}
