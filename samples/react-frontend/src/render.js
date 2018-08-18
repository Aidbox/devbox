import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createDebug from 'debug'

import configureStore from 'ehrSrc/configureStore'
import Base from 'ehrSrc/components/Base'
import { actions as formActions } from 'react-redux-form'
import * as apiActions from 'ehrSrc/actions/api'

const debug = createDebug('ehr:render') // eslint-disable-line no-unused-vars

const initialState = {}

const store = configureStore(initialState)

// DEBUG {{{
window.APP.store = store
window.APP.formActions = formActions
window.APP.apiActions = apiActions
// }}}

render(
  React.createElement(
    Provider, { store }, React.createElement(Base)
  ), document.getElementById('app')
)
