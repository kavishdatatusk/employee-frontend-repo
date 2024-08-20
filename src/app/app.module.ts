import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditPopupComponent } from './employee-edit-popup/employee-edit-popup.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { platformBrowser } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { MyServiceService } from '../services/my-service.service';
import { EmployeeListWrapperComponent } from './employee-list-wrapper/employee-list-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EmployeeEditPopupComponent,
    ConfirmationDialogComponent,
    AddEmployeeDialogComponent,
    EmployeeListComponent,
    EmployeeListWrapperComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    AgGridModule,
    AgGridAngular
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MyServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
