import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ChipsComponent } from "./components/chips/chips.component";
import { ExpansionComponent } from "./components/expansion/expansion.component";
import { FormsComponent } from "./components/forms/forms.component";
import { GridListComponent } from "./components/grid-list/grid-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProgressSnipperComponent } from "./components/progress-snipper/progress-snipper.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { SlideToggleComponent } from "./components/slide-toggle/slide-toggle.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { TooltipsComponent } from "./components/tooltips/tooltips.component";
import { ProductComponent } from "./dashboard/dashboard-components/product/product.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FullComponent } from "./layouts/full/full.component";
import { ContainersComponent } from "./components/containers/containers.component";
import { ScopesComponent } from "./components/scopes/scopes.component";
import { ImagesComponent } from "./components/images/images.component";
import { VolumesComponent } from "./components/volumes/volumes.component";
import { NetworksComponent } from "./components/network/networks.component";
import { UsersComponent } from "./components/users/users.component";
import { LoginComponent } from "./layouts/login/login.component";
import { LoginTokenGuard } from "./core/guards/login-token.guard";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivateChild: [AuthGuard],
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
      { path: "containers", component: ContainersComponent },
      { path: "scopes", component: ScopesComponent },
      { path: "images", component: ImagesComponent },
      { path: "volumes", component: VolumesComponent },
      { path: "networks", component: NetworksComponent },
      { path: "users", component: UsersComponent },
    ],
  },
  {
    path: "login",
    canActivate: [LoginTokenGuard],
    loadChildren: () =>
      import("./layouts/login/login.module").then((m) => m.LoginModule),
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
