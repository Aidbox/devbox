import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';

import { fhirToObject } from '../patient.converter';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../reducer';
import { PatientState } from '../reducer/patient';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Observable<PatientState>;
  loading: boolean;
  selectedPatientId: number;
  data: Patient[];

  @Input() searchInput: string;

  constructor(private patientService: PatientService, private store: Store<AppState>) {
    this.patients = store.pipe(select("patient"));
    this.patients.subscribe(patients => {
      this.loading = patients.loading;
      this.selectedPatientId = patients.selectedPatientId;
      this.data = patients.data;
    });
  }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients();
  }


  onClick(patient: Patient): void {
    this.patientService.selectPatient(patient.id);
  }

  newPatientForm(): void {
    this.patientService.selectPatient(0);
  }

  searchPatients(): void {
    this.patientService.getPatients(this.searchInput);
  }
}
