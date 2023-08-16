/* eslint-disable */
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
    props.showNotification(`you created "${content}"`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
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

export default connect( 
  null, { createAnecdote, showNotification, hideNotification } )(AnecdoteForm)

