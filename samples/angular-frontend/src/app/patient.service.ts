import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './reducer';
import { LOADING, RECEIVE, APPEND, DELETE, UPDATE, SET, INC, DEC } from './reducer/patient';

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

    getPatients(patientName = '', page = 0): void {
        // TODO page var
        let url = `${this.baseURL}/fhir/Patient?_page=0&_totalMethod=count`;
        this.store.dispatch({ type: LOADING });
        if (patientName && patientName.length >= 0) {
            url += `&name=${patientName}`;
        }
        this.http.get(url).subscribe(patients  => {
            console.log('patients', patients);
            const l = 10;
            // this.store.dispatch({ type: RECEIVE, data: patients["entry"].map(p => fhirToObject(p.resource))});
            this.store.dispatch({ type: RECEIVE, data: patients["entry"].slice(l * page, l * page + l).map(p => fhirToObject(p.resource))});
            this.store.dispatch({ type: SET, count: patients["total"], selectedPage: page });

        });
    }

    addPatient(patient: Patient): void {
        const url = `${this.baseURL}/fhir/Patient`;
        const patientData = objectToFhir(patient);
        this.http.post(url, patientData, httpOptions)
            .subscribe(p => {
                patient.id = p["id"];
                this.store.dispatch({ type: APPEND, data: [patient] });
                this.store.dispatch({ type: INC });
            });
    };

    deletePatient(patient: Patient): void {
        const url = `${this.baseURL}/fhir/Patient/${patient.id}`;
        this.http.delete(url, httpOptions)
            .subscribe(p => {
                this.store.dispatch({ type: DELETE, data: [patient] });
                this.store.dispatch({ type: DEC  });
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
