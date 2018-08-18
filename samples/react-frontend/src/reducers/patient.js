import { handleActions } from 'redux-actions'
import createDebug from 'debug'

import * as apiActions from 'ehrSrc/actions/api'
// import * as types from '../constants/actionTypes'

const debug = createDebug('ehr:reducers:patients') // eslint-disable-line no-unused-vars

export default handleActions({
  [`${apiActions.getAllPatients}_FULFILLED`]: function (state, action) {
    const allItems = {}
    const searchResults = []
    action.payload.entry.forEach(function (item) {
      allItems[item.resource.id] = item.resource
    })
    state = {
      ...state,
      allItems,
      searchResults,
      total: action.payload.total,
      page: action.meta.page,
    }
    return state
  },
  [`${apiActions.getPatientByName}_FULFILLED`]: function (state, action) {
    const allItems = {}
    const searchResults = []
    action.payload.entry.forEach(function (item) {
      allItems[item.resource.id] = item.resource
      searchResults.push(item.resource.id)
    })
    state = {
      ...state,
      allItems: {
        ...state.allItems,
        ...allItems,
      },
      searchResults,
      total: action.payload.total,
      page: action.meta.page,
    }
    return state
  },
  [`${apiActions.putPatient}_FULFILLED`]: function (state, action) {
    state = {
      ...state,
      allItems: {
        ...state.allItems,
        [action.payload.id]: action.payload,
      },
    }
    return state
  },
  [`${apiActions.postPatient}_FULFILLED`]: function (state, action) {
    state = {
      ...state,
      allItems: {
        ...state.allItems,
        [action.payload.id]: action.payload,
      },
      total: state.total + 1,
    }
    return state
  },
  [`${apiActions.deletePatient}_FULFILLED`]: function (state, action) {
    state = {
      ...state,
      allItems: {
        ...state.allItems,
      },
    }
    if (state.allItems[action.meta.patientId]) {
      delete state.allItems[action.meta.patientId]
      state.total = state.total - 1
    }
    return state
  },
}, {
  allItems: {},
  searchResults: [],
  total: 0,
  page: 0,
})
