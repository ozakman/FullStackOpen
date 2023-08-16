/* eslint-disable */
import React from 'react'
import { createStore } from 'redux'
import createRoot from 'react-dom'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

const renderApp = () => {
  createRoot.render(<App />, document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)