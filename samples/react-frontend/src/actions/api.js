import { createAction } from 'redux-actions'

import * as api from 'ehrSrc/api'
import * as types from 'ehrSrc/constants/actionTypes'

export const getAllPatients = createAction(types.API_GET_ALL_PATIENTS, function (data) {
  return {
    promise: api.getAllPatients(data)
  }
}, (data) => data)

export const getPatientByName = createAction(types.API_GET_PATIENT_BY_NAME, function (data) {
  return {
    promise: api.getPatientByName(data)
  }
}, (data) => data)

export const putPatient = createAction(types.API_PUT_PATIENT, function (data) {
  return {
    promise: api.putPatient(data)
  }
}, (data) => data)

export const postPatient = createAction(types.API_POST_PATIENT, function (data) {
  return {
    promise: api.postPatient(data)
  }
}, (data) => data)

export const deletePatient = createAction(types.API_DELETE_PATIENT, function (data) {
  return {
    promise: api.deletePatient(data)
  }
}, (data) => data)
