/* eslint-disable */
import React from 'react'
import { createVote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()

    const addVote = (anecdote) => {
      store.dispatch(createVote(anecdote))    
    }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  const byVotes = (v1, v2) => v2.votes - v1.votes

  function compareNumbers(a, b) {
    return b.votes - a.votes
  }

  anecdotes.sort(compareNumbers)
  console.log('anecdotes order compared by votes', anecdotes.sort(compareNumbers))

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
          {anecdote.content}
          </div>
            <div>
              <p></p>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote)}>vote</button>
              <p></p>                
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

export default App