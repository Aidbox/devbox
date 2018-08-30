import { Component } from '@angular/core';
import { Patient } from './patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-frontend';
    selectedPatient: Patient = new Patient();
    selectedRow: number;

    onSelect({ patient, idx }): void {
        this.selectedPatient = patient;
        this.selectedRow = idx;
    }

    createNewPatient():void {
        this.selectedPatient = new Patient();
        this.selectedRow = -1;
    }

}
