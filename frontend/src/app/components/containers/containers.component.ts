import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CreateContainer, Container } from "./../../core/interfaces/container";
import { ContainerService } from "./../../core/services/container.service";
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
import { MatSelectModule } from "@angular/material/select";
import { Network } from "src/app/core/interfaces/network";
import { NetworkService } from "./../../core/services/network.service";
import { Scope } from "src/app/core/interfaces/scope";
import { ScopeService } from "./../../core/services/scope.service";
import { Volume } from "src/app/core/interfaces/volume";
import { VolumeService } from "./../../core/services/volume.service";
import { Image } from "src/app/core/interfaces/image";
import { ImageService } from "./../../core/services/image.service";
import { CommonModule } from "@angular/common";
interface Test {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-containers",
  templateUrl: "./containers.component.html",
  styleUrls: ["./containers.component.scss"],
})
export class ContainersComponent {
  step = 0;
  displayedColumns: string[] = [
    "name",
    "scope",
    "image",
    "volumen",
    "network",
    "memory",
    "port",
    "status",
    "action",
  ];
  dataSourceTable!: MatTableDataSource<Container>;
  networksData: Network[] = [];
  scopesData: Scope[] = [];
  volumesData: Volume[] = [];
  imagesData: Image[] = [];
  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    cpu: new FormControl(null, [Validators.required]),
    memory: new FormControl(null, [Validators.required]),
    storage: new FormControl(null, [Validators.required]),
    label: new FormControl(null, [Validators.required]),
    ip: new FormControl(null, [Validators.required]),
    port: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    id_scope: new FormControl(null, [Validators.required]),
    id_image: new FormControl(null, [Validators.required]),
    id_network: new FormControl(null, [Validators.required]),
    id_volumen: new FormControl(null, [Validators.required]),
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
  constructor(
    private _service: ContainerService,
    public dialog: MatDialog,
    private _networkService: NetworkService,
    private _scopeService: ScopeService,
    private _volumeService: VolumeService,
    private _imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.onLoadRegisters();
    this.onLoadNetworks();
    this.onLoadScopes();
    this.onLoadVolumes();
    this.onLoadImages();
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
      .getContainers()
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
  onLoadNetworks(): any {
    this._networkService
      .getNetworks()
      .then((response: any) => {
        this.networksData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  onLoadScopes(): any {
    this._scopeService
      .getScopes()
      .then((response: any) => {
        this.scopesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  onLoadVolumes(): any {
    this._volumeService
      .getVolumes()
      .then((response: any) => {
        this.volumesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }

  onLoadImages(): any {
    this._imageService
      .getImages()
      .then((response: any) => {
        this.imagesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  addData() {
    if (this.createForm.valid) {
      let data: CreateContainer = {
        name: this.createForm.getRawValue().name,
        cpu: this.createForm.getRawValue().cpu,
        memory: this.createForm.getRawValue().memory,
        storage: this.createForm.getRawValue().storage,
        label: this.createForm.getRawValue().label,
        ip: this.createForm.getRawValue().ip,
        port: this.createForm.getRawValue().port,
        status: this.createForm.getRawValue().status,
        id_scope: this.createForm.getRawValue().id_scope,
        id_image: this.createForm.getRawValue().id_image,
        id_network: this.createForm.getRawValue().id_network,
        id_volumen: this.createForm.getRawValue().id_volumen,
        containerId: "",
      };
      console.log(data);
      this._service.createContainer(data).subscribe((response) => {
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
        name: data.name,
        cpu: data.cpu,
        memory: data.memory,
        storage: data.storage,
        label: data.label,
        ip: data.ip,
        port: data.port,
        status: data.status,
        id_scope: data.id_scope,
        id_image: data.id_image,
        id_network: data.id_network,
        id_volumen: data.id_volumen,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Access the form data here
      if (result) {
        // add id to result
        result.id = data.id;
        console.log("Form data:", result);

        // Perform the necessary operations with the form data
        this._service.updateContainer(result).subscribe((response) => {
          console.log(response);
          this.onLoadRegisters();
        });
      }
    });
  }

  deleteData(data: any) {
    console.log(data);
    this._service.deleteContainer(data.id).subscribe((response) => {
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
    MatSelectModule,
    CommonModule,
  ],
})
export class Modal {
  networksData: Network[] = [];
  scopesData: Scope[] = [];
  volumesData: Volume[] = [];
  imagesData: Image[] = [];
  //modal: Modal; // Agrega esta propiedad
  tests: Test[] = [
    { value: "values-1", viewValue: "Value 1" },
    { value: "values-2", viewValue: "Value 2" },
    { value: "values-3", viewValue: "Value 3" },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Modal>,
    private _networkService: NetworkService,
    private _scopeService: ScopeService,
    private _volumeService: VolumeService,
    private _imageService: ImageService
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
    cpu: new FormControl(null, [Validators.required]),
    memory: new FormControl(null, [Validators.required]),
    storage: new FormControl(null, [Validators.required]),
    label: new FormControl(null, [Validators.required]),
    ip: new FormControl(null, [Validators.required]),
    port: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    id_scope: new FormControl(null, [Validators.required]),
    id_image: new FormControl(null, [Validators.required]),
    id_network: new FormControl(null, [Validators.required]),
    id_volumen: new FormControl(null, [Validators.required]),
  });
  onLoadNetworks(): any {
    this._networkService
      .getNetworks()
      .then((response: any) => {
        this.networksData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  onLoadScopes(): any {
    this._scopeService
      .getScopes()
      .then((response: any) => {
        this.scopesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  onLoadVolumes(): any {
    this._volumeService
      .getVolumes()
      .then((response: any) => {
        this.volumesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  onLoadImages(): any {
    this._imageService
      .getImages()
      .then((response: any) => {
        this.imagesData = response.items;
        console.log(response.items);
      })
      .catch((error: any) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
  ngOnInit(): void {
    this.onLoadNetworks();
    this.onLoadScopes();
    this.onLoadVolumes();
    this.onLoadImages();
    this.updateForm.controls["name"].setValue(this.data.name);
    this.updateForm.controls["cpu"].setValue(this.data.cpu);
    this.updateForm.controls["memory"].setValue(this.data.memory);
    this.updateForm.controls["storage"].setValue(this.data.storage);
    this.updateForm.controls["label"].setValue(this.data.label);
    this.updateForm.controls["ip"].setValue(this.data.ip);
    this.updateForm.controls["port"].setValue(this.data.port);
    this.updateForm.controls["status"].setValue(this.data.status);
    this.updateForm.controls["id_scope"].setValue(this.data.id_scope);
    this.updateForm.controls["id_image"].setValue(this.data.id_image);
    this.updateForm.controls["id_network"].setValue(this.data.id_network);
    this.updateForm.controls["id_volumen"].setValue(this.data.id_volumen);
  }
}
