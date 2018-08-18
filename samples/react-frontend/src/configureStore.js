import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'

import * as reducers from './reducers'

const logger = createLogger({
  collapsed: true,
})

export default function configureStore (initialState) {
  const store = createStore(
    combineReducers({
      ...reducers,
    }),
    initialState,
    applyMiddleware(
      thunk,
      promiseMiddleware(),
      logger,
    )
  )

  return store
}
