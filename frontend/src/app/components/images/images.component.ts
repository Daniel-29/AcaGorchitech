import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateImage, Image } from "./../../core/interfaces/image";
import { ImageService } from "./../../core/services/image.service";
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

// export interface PeriodicElement {
//   name: string;
//   repository: string;
//   tag: string;
//   size: string;
//   imageId: string;
// }
interface Test {
  value: string;
  viewValue: string;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Image name', repository: 'Image repository', tag: 'Image tag', size: 'Image size', imageId: 'Image Id' },
//   { name: 'Image name', repository: 'Image repository', tag: 'Image tag', size: 'Image size', imageId: 'Image Id' },
//   { name: 'Image name', repository: 'Image repository', tag: 'Image tag', size: 'Image size', imageId: 'Image Id' },
// ];

@Component({
  selector: "app-containers",
  templateUrl: "./images.component.html",
  styleUrls: [
    "./images.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})

export class ImagesComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = [
    'name', 
    'repository', 
    'tag', 
    'size', 
    'action'
  ];

  dataSourceTable!: MatTableDataSource<Image>;
  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    repository: new FormControl(null, [Validators.required]),
    tag: new FormControl(null, [Validators.required]),
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

  tests: Test[] = [
    { value: "values-1", viewValue: "Value 1" },
    { value: "values-2", viewValue: "Value 2" },
    { value: "values-3", viewValue: "Value 3" },
  ];

  // tests2: Test[] = [
  //   { value: "values-1", viewValue: "Repository 1" },
  //   { value: "values-2", viewValue: "Repository 2" },
  //   { value: "values-3", viewValue: "Repository 3" },
  // ];



  constructor(private _service: ImageService, public dialog: MatDialog) {}

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
      .getImages()
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
      let data: CreateImage = {
        name: this.createForm.getRawValue().name,
        repository: this.createForm.getRawValue().repository,
        tag: this.createForm.getRawValue().tag,
        size: this.createForm.getRawValue().size,
        date: new Date(),
        imageId: "",
      };
      console.log(data);
      this._service.createImage(data).subscribe((response) => {
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
        repository: data.repository,
        tag: data.tag,
        size: data.size,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateImage(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    console.log(data);
    this._service.deleteImage(data.id).subscribe((response) => {
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
    repository: new FormControl(null, [Validators.required]),
    tag: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["repository"].setValue(this.data.repository);
    this.updateForm.controls["tag"].setValue(this.data.tag);
    this.updateForm.controls["size"].setValue(this.data.size);
  }
}
