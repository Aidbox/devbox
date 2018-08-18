import { actions as formActions } from 'react-redux-form'

import getPageCount from 'ehrSrc/utils/getPageCount'
import * as apiActions from 'ehrSrc/actions/api'

export function submitFindPatientByNameForm (values) {
  return function (dispatch, getState) {
    // dispatch(loaderActions.show())
    // dispatch(formActions.reset('rrf.curPatientId'))
    const search = values.search.trim()

    return dispatch(apiActions.getPatientByName({...values, patientName: search})).finally(function () {
      return dispatch(formActions.change('rrf.patientListSearchText', search))
      // dispatch(loaderActions.hide())
    })
  }
}

export function selectPage (page) {
  return function (dispatch, getState) {
    const state = getState()
    const patientListSearchText = state.rrf.patientListSearchText
    return dispatch(submitFindPatientByNameForm({search: patientListSearchText, page}))
  }
}

export function submitPatientInfoForm (values, isNew) {
  return function (dispatch, getState) {
    if (isNew) {
      return dispatch(apiActions.postPatient(values)).then(function ({action, value}) {
        dispatch(selectPatient(value.id))
        const state = getState()
        const total = state.patient.total
        let nextPage = getPageCount(total)
        return dispatch(selectPage(nextPage - 1))
      })
    } else {
      return dispatch(apiActions.putPatient(values)).then(function ({action, value}) {
        return dispatch(cancelPatientInfoForm())
      })
    }
  }
}

export function addPhonePatientInfoForm () {
  return formActions.push('rrf.patientInfoForm.phone', '')
}

export function addEmailPatientInfoForm () {
  return formActions.push('rrf.patientInfoForm.email', '')
}

export function editPatientInfoForm () {
  return formActions.change('rrf.isEditPatientInfoForm', true)
}

function getFieldArray (dataArray, key) {
  const fieldArray = dataArray.filter(item => (item.system === key)).map(item => item.value)
  if (!fieldArray.length) fieldArray.push('')
  return fieldArray
}

export function resetPatientInfoForm () {
  return function (dispatch, getState) {
    dispatch(formActions.reset('rrf.patientInfoForm'))
    const state = getState()
    const patientId = state.rrf.curPatientId
    const formValues = state.rrf.patientInfoForm
    const patientItem = state.patient.allItems[patientId]
    if (!patientItem) {
      return dispatch(formActions.setPristine('rrf.patientInfoForm'))
    }
    dispatch(formActions.change('rrf.patientInfoForm', {
      ...formValues,
      firstName: patientItem.name[0].given[0] || '',
      lastName: patientItem.name[0].family || '',
      gender: patientItem.gender || '',
      birthDate: patientItem.birthDate || '',
      address: {
        ...formValues.address,
        ...patientItem.address[0],
      },
      //identifier: patientItem.identifier[0].value || '',
      phone: getFieldArray(patientItem.telecom, 'phone'),
      email: getFieldArray(patientItem.telecom, 'email'),
    }, {silent: true}))
    return dispatch(formActions.setPristine('rrf.patientInfoForm'))
  }
}

export function cancelPatientInfoForm () {
  return function (dispatch, getState) {
    dispatch(formActions.change('rrf.isEditPatientInfoForm', false))
    return dispatch(resetPatientInfoForm())
  }
}

export function selectPatient (patientId) {
  return function (dispatch, getState) {
    dispatch(formActions.change('rrf.curPatientId', patientId))
    return dispatch(cancelPatientInfoForm())
  }
}

export function closePatientInfoForm () {
  return function (dispatch, getState) {
    dispatch(formActions.reset('rrf.patientInfoForm'))
    return dispatch(formActions.change('rrf.curPatientId', ''))
  }
}

export function addPatient () {
  return function (dispatch, getState) {
    dispatch(selectPatient('_new'))
    return dispatch(editPatientInfoForm())
  }
}

export function deletePatient (patientId) {
  return function (dispatch, getState) {
    const state = getState()
    const curPage = state.patient.page
    const total = state.patient.total
    return dispatch(apiActions.deletePatient({patientId})).then(function () {
      dispatch(cancelPatientInfoForm())
      if ((curPage + 1) > getPageCount(total - 1)) return dispatch(selectPage(curPage - 1))
      return dispatch(selectPage(curPage))
    })
  }
}
