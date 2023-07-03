import { I, T } from "@angular/cdk/keycodes";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ContainerService } from "src/app/core/services/container.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-containerlist",
  templateUrl: "./containerlist.component.html",
  styleUrls: ["./containerlist.component.scss"],
})
export class ContainerListComponent implements OnInit {

  @Input() list!: any[];
  @Input() title!: String;


  constructor(
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {}


}
