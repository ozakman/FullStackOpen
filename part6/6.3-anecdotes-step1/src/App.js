/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import createRoot from 'react-dom'
import anecdoteReducer from './reducers/anecdoteReducer'
import { createStore } from 'redux'

const store = createStore(anecdoteReducer)

const App = (props) => {

  const anecdotes = store.getState()

  const addVote = (id) => {
    store.dispatch({
      type: 'ADD_VOTE',
      data: id
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
          {anecdote.content}
          </div>
            <div>
              <p></p>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote)}>vote</button>              
            </div>
          </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const renderApp = () => {
  createRoot.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
ReactDOM.unmountComponentAtNode(document.getElementById('root'))

export default App