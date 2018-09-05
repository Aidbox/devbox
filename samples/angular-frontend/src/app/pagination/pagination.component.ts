import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientState } from '../reducer/patient';

import { select, Store } from '@ngrx/store';
import { AppState } from '../reducer';

import { PatientService, defaultCount } from '../patient.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  patients: Observable<PatientState>;
  currentPage: number;
  total: number;

  constructor(public patientService: PatientService, private store: Store<AppState>) {
    this.patients = store.pipe(select("patient"));
    this.patients.subscribe(pts => {
      this.currentPage = pts.selectedPage;
      this.total = pts.count;
    })
  }

  getPagesCount(): number {
    return Math.ceil(this.total / defaultCount);
  }

  getPagesList() {
    const pagesCount = this.getPagesCount();
    const list = Array(pagesCount).keys();
    return Array.from(list);
  }

  setPage(page): void {
    this.patientService.getPatients('', page);
  }

}
