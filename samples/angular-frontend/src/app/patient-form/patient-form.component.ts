import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

    @Input() patient: Patient;
    @Output("createNewPatient")createNewPatient = new EventEmitter();
    constructor(private patientService: PatientService) { }

    ngOnInit() {
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
        } else {
            Object.keys(form.controls).forEach(field => {
                form.controls[field].markAsTouched(true);
            });
        }
    }



    deletePatient(): void {
        this.patientService.deletePatient(this.patient);
        // TODO its ok?
        this.createNewPatient.emit();
    }

    updatePatient(): void {
        this.patientService.updatePatient(this.patient)
    }

    getNameForPhone(idx: number): string {
        return `phoneName-${idx}`;
    }

    getNameForEmail(idx: number): string {
        return `emailName-${idx}`;
    }

    addEmailField(emails): void {
        emails.push({ system: "email" });
    }

    addPhoneField(phones): void {
        phones.push({ system: "phone" });
    }
}
