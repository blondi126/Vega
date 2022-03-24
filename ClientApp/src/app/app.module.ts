import { PhotoService } from './services/photo.service';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Sentry from "@sentry/angular";
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './shared/auth-button.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';


Sentry.init({
  dsn: "https://a6a6bf49ab2e4e5089547a9ee1b88f90@o1166278.ingest.sentry.io/6256683",
  tracesSampleRate: 1.0,
});


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: VehicleListComponent, pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent, canActivate: [AuthGuard] }
    ]),
    FontAwesomeModule,
    AuthModule.forRoot({
      domain: 'dev-k2eamjwk.us.auth0.com',
      clientId: 'eOdRUPCbNbkft2VZgf5CroJ2aTWn2wrc',
      audience: "https://api.vega.com",
      serverUrl: "https://localhost:7052",
      httpInterceptor: {
        allowedList: [
          'https://localhost:7052/api/vehicles/*',
          'https://localhost:7052/api/vehicles'
        ],
      },
    }),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    VehicleService,
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
