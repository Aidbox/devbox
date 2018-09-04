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
  @Output("onSelect")onSelect = new EventEmitter();
  @Output("createNewPatient")createNewPatient = new EventEmitter();
  @Input() searchInput: string;
  @Input() selectedId: number;

  constructor(private patientService: PatientService, private store: Store<AppState>) {
    this.patients = store.pipe(select("patient"));
  }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients();
  }


  onClick(patient: Patient): void {
    this.onSelect.emit(patient);
  }

  newPatientForm(): void {
    this.createNewPatient.emit();
  }

  searchPatients(): void {
    this.patientService.getPatients(this.searchInput);
  }
}
