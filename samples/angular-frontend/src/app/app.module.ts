import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { patientReducer, patientsCountReducer } from './reducer/patient';

import { AppComponent } from './app.component';
import { PatientFormComponent } from './patient-form/patient-form.component';

import { HttpClientModule } from '@angular/common/http';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    PatientsListComponent,
    PaginationComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      StoreModule.forRoot({ patient: patientReducer, counter: patientsCountReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
