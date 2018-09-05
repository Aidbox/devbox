import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';

import { AppState } from '../reducer';

import { select, Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { PatientState } from '../reducer/patient';
import _ from 'lodash';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {

  patients: Observable<PatientState>;
  patient: Patient;
  loading: boolean;
  constructor(private patientService: PatientService, private store: Store<AppState>) {
    this.patients = store.pipe(select("patient"));
    this.patients.subscribe(patients => {
      this.loading = patients.loading;
      if (patients.selectedPatientId === 0) {
        this.patient = new Patient();
      } else {
        const selectedPatient = _.find(patients.data, ['id', patients.selectedPatientId]);
        if (selectedPatient) {
          this.patient = selectedPatient;
        }
      }
    });
  }

  getPatients(): void {
    this.patientService.getPatients();
  }

  addPatient(): void {
    this.patientService.addPatient(this.patient);
  }

  onSubmit(form): void {
    if (form.valid) {
      this.addPatient();
      this.setUntouchedForm(form);
    } else {
      this.setTouchedForm(form)
    }
  }

  deletePatient(): void {
    this.patientService.deletePatient(this.patient);
    this.patient = new Patient();
  }


  updatePatient(): void {
    this.patientService.updatePatient(this.patient)
  }

  setTouchedForm(form) {
    Object.keys(form.controls).forEach(field => {
      form.controls[field].markAsTouched(true);
    });
  }

  setUntouchedForm(form) {
    Object.keys(form.controls).forEach(field => {
      form.controls[field].markAsUntouched(true);
    });
  }

  getNameForPhone(idx: number): string {
    return `phoneName-${idx}`;
  }

  getNameForEmail(idx: number): string {
    return `emailName-${idx}`;
  }

  addEmailField(): void {
    this.patient.telecom.emails.push({ system: "email" });
  }

  addPhoneField(): void {
    this.patient.telecom.phones.push({ system: "phone" });
  }
}
