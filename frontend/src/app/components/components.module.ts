import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertsComponent } from "./alerts/alerts.component";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FormsComponent } from "./forms/forms.component";
import { DemoFlexyModule } from "../demo-flexy-module";
import { GridListComponent } from "./grid-list/grid-list.component";
import { MenuComponent } from "./menu/menu.component";
import { TabsComponent } from "./tabs/tabs.component";
import { ExpansionComponent } from "./expansion/expansion.component";
import { ChipsComponent } from "./chips/chips.component";
import { ProgressComponent } from "./progress/progress.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ProgressSnipperComponent } from "./progress-snipper/progress-snipper.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { SliderComponent } from "./slider/slider.component";
import { SlideToggleComponent } from "./slide-toggle/slide-toggle.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";
import { ContainersComponent } from "./containers/containers.component";
import { ScopesComponent } from "./scopes/scopes.component";
import { ImagesComponent } from "./images/images.component";
import { VolumesComponent } from "./volumes/volumes.component";
import { NetworksComponent } from "./network/networks.component";
import { UsersComponent } from "./users/users.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    ContainersComponent,
    ScopesComponent,
    ImagesComponent,
    VolumesComponent,
    NetworksComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    ContainersComponent,
    ScopesComponent,
    ImagesComponent,
    VolumesComponent,
    NetworksComponent,
    UsersComponent,
  ],
})
export class ComponentsModule {}
