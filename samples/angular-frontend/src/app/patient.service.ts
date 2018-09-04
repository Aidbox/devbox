import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './reducer';
import { LOADING, RECEIVE, APPEND, DELETE, UPDATE } from './reducer/patient';

import { Patient } from './patient';
import { objectToFhir, fhirToObject } from './patient.converter';
import { enviroment } from '../../enviroment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseURL:string = enviroment.AIDBOX_URL;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getPatients(patientName = '', page = 1, count = 10): void {
    let url = `${this.baseURL}/fhir/Patient?_page=${page}&_count=${count}`;
    this.store.dispatch({ type: LOADING });
    if (patientName && patientName.length >= 0) {
      url += `&name=${patientName}`;
    }
    this.http.get(url).subscribe(patients  => {
      console.log('patients', patients);
      this.store.dispatch({
        type: RECEIVE,
        data: patients["entry"].map(p => fhirToObject(p.resource)),
        count: patients["total"],
        selectedPage: page
      });
    });
  }

  addPatient(patient: Patient): void {
    const url = `${this.baseURL}/fhir/Patient`;
    const patientData = objectToFhir(patient);
    this.http.post(url, patientData, httpOptions)
      .subscribe(p => {
        patient.id = p["id"];
        this.store.dispatch({ type: APPEND, data: [patient] });
      });
  };

  deletePatient(patient: Patient): void {
    const url = `${this.baseURL}/fhir/Patient/${patient.id}`;
    this.http.delete(url, httpOptions)
      .subscribe(p => {
        this.store.dispatch({ type: DELETE, data: [patient] });
      });
  }

  updatePatient(patient: Patient): void {
    const url = `${this.baseURL}/fhir/Patient/${patient.id}`;
    const patientData = objectToFhir(patient);
    this.http.put(url, patientData, httpOptions)
      .subscribe(p => {
        this.store.dispatch({ type: UPDATE, data: [patient]});
      });
  }
}
