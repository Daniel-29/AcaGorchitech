import { NgModule } from '@angular/core';
import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './core/services/auth.service';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      easeTime: 200,
      positionClass: "toast-top-right",
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
      countDuplicates: true,
      tapToDismiss: true,
    }),
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {
        provide : HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi   : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
