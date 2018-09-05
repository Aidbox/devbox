import { Patient } from '../patient';
import _ from 'lodash';


export const RECEIVE = 'Patient/receive';
export const LOADING = 'Patient/loading';
export const APPEND = 'Patient/append';
export const DELETE = 'Patient/delete';
export const UPDATE = 'Patient/update';
export const SELECT_PATIENT = 'Patient/selectPatient';

const initialState = {
  loading: false,
  data: [],
  count: 0,
  selectedPage: 1,
  selectedPatientId: 0
};

export interface PatientState {
  loading: boolean;
  data: Patient[];
  count: number;
  selectedPage: number;
  selectedPatientId: number;
}

export interface PatientAction {
  type: string;
  data: Patient[];
  count: number;
  selectedPage: number;
  selectedPatientId: number;
}

export function patientReducer(state: PatientState = initialState, action: PatientAction) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };

    case SELECT_PATIENT:
      return { ...state, loading: false, selectedPatientId: action.selectedPatientId };

    case RECEIVE:
      return {
        ...state,
        loading: false,
        data: action.data,
        count: action.count,
        selectedPage: action.selectedPage
      };

    case APPEND:
      return {
        ...state,
        loading: false,
        data: [ ...state.data, ...action.data ],
        count: state.count += 1
      };

    case DELETE:
      const [deletedPatient] = action.data;
      return {
        ...state,
        loading: false,
        data: state.data.filter(p => p.id !== deletedPatient.id),
        count: state.count -= 1
      };

    case UPDATE:
      const [updatedPatient] = action.data;
      return { ...state, loading: false, data: state.data.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient ) };

    default:
      return state;
  }
}
