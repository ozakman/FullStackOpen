import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createVote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {

  const store = props.store
  const anecdotes = props.store.getState()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  const byVotes = (v1, v2) => v2.votes - v1.votes

  //Toinen versio
  function compareNumbers(a, b) {
    return b.votes - a.votes
  }
  anecdotes.sort(compareNumbers)
  console.log('anecdotes order compared by votes', anecdotes.sort(compareNumbers))

  const addVote = (anecdote) => {
    store.dispatch(createVote(anecdote))    
  }

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
    </div>
  )
}

export default NewAnecdote

