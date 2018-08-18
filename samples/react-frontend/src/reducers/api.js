import { handleActions } from 'redux-actions'
import createDebug from 'debug'

import * as apiActions from 'ehrSrc/actions/api'

const debug = createDebug('ehr:reducers:api') // eslint-disable-line no-unused-vars

function updateApiPendingReducerMap (action, stateVal) {
  apiPendingReducerMap[`${action}_PENDING`] = function (state, action) {
    const type = action.type.replace(/_PENDING$/, '')
    const count = state.pending[type] || 0
    state = {
      ...state,
      pending: {
        ...state.pending,
        [type]: count + 1
      },
    }
    return state
  }
  apiPendingReducerMap[`${action}_FULFILLED`] = function (state, action) {
    const type = action.type.replace(/_FULFILLED$/, '')
    const count = state.pending[type] || 0
    state = {
      ...state,
      pending: {
        ...state.pending,
        [type]: count - 1
      },
    }
    return state
  }
  apiPendingReducerMap[`${action}_REJECTED`] = function (state, action) {
    const type = action.type.replace(/_REJECTED$/, '')
    const count = state.pending[type] || 0
    state = {
      ...state,
      pending: {
        ...state.pending,
        [type]: count - 1
      },
    }
    return state
  }
}

const apiPendingReducerMap = {}

Object.entries(apiActions).forEach(function ([key, action]) {
  updateApiPendingReducerMap(action, key)
})

export default handleActions({
  ...apiPendingReducerMap,
}, { pending: {} })
