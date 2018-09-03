import { Component } from '@angular/core';
import { Patient } from './patient';
import { PatientService } from './patient.service';
import { Observable } from 'rxjs';
import { PatientState } from './reducer/patient';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-frontend';
    selectedPatient: Patient = new Patient();
    selectedPatientId: number;

    onSelect(patient): void {
        this.selectedPatient = patient;
        this.selectedPatientId = patient.id;
    }

    createNewPatient(): void {
        this.selectedPatient = new Patient();
        this.selectedPatientId = -1;
    }

}
