import { Patient } from '../patient';
import _ from 'lodash';


export const RECEIVE = 'Patient/receive';
export const LOADING = 'Patient/loading';
export const APPEND = 'Patient/append';
export const DELETE = 'Patient/delete';
export const UPDATE = 'Patient/update';


const initialState = {
    loading: false,
    data: []
};

export interface PatientState {
    loading: boolean;
    data: Patient[];
}

export interface PatientAction {
    type: string;
    data: Patient[];
}

export function patientReducer(state: PatientState = initialState, action: PatientAction) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };

        case RECEIVE:
            return { ...state, loading: false, data: action.data };

        case APPEND:
            return { ...state, loading: false, data: [ ...state.data, ...action.data ]};

        case DELETE:
            const [deletedPatient] = action.data;
            return { ...state, loading: false, data: state.data.filter(p => p.id !== deletedPatient.id) };

        case UPDATE:
            const [updatedPatient] = action.data;
            return { ...state, loading: false, data: state.data.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient ) };

        default:
            return state;
    }
}
