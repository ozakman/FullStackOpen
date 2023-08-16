import React from 'react'
import createRoot from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const initialState = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={neutral}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={initialState}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().neutral}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  createRoot.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)