/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import createRoot from 'react-dom'
import anecdoteReducer from './reducers/anecdoteReducer'
import { createStore } from 'redux'

const store = createStore(anecdoteReducer)

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


const App = (props) => {
  const anecdotes = store.getState()

  const addVote = (id) => {
    store.dispatch({
      type: 'ADD_VOTE',
      data: id
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  const byVotes = (v1, v2) => v2.votes - v1.votes

  function compareNumbers(a, b) {
    return a - b
  }

  anecdotes.sort(compareNumbers)
  console.log('anecdotes compared by votes', anecdotes.sort(compareNumbers))
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
          {anecdote.content}
          </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote.id)}>vote</button>                  
            </div>
          </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
      <p></p>

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