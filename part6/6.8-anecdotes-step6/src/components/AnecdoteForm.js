import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {

  const store = props.store
  const anecdotes = props.store.getState()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote

