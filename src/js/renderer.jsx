import '@babel/polyfill'
import throttle from 'lodash/throttle'
import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { loadFromStorage, saveToStorage } from './util/storage'
import { reducers } from './state'
import UI from './app/UI'

(function renderer() {
  if (/\bMSIE\b/.test(window.navigator.userAgent)) {
    /* eslint-disable no-alert */
    alert('Your browser is out of date and is not supported.')
    /* eslint-enable no-alert */
    return
  }

  const DEBUG = process.env.NODE_ENV !== 'production'

  const appReducer = combineReducers({ ...reducers })
  const rootReducer = (state, action) => {
    if (action.type === 'INITIALIZE') {
      state = void 0
    }
    return appReducer(state, action)
  }

  const dataKey = 'state'
  const restored = loadFromStorage(dataKey)
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer,
    restored,
    (DEBUG
      && window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__()) || void 0,
  )
  /* eslint-enable no-underscore-dangle */
  store.subscribe(throttle(() => saveToStorage(dataKey, store.getState()), 1000))

  render(
    <Provider store={store}>
      <UI />
    </Provider>,
    document.getElementById('root'),
  )
}())
