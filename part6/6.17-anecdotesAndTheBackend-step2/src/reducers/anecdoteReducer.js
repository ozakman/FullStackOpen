/* eslint-disable */
import { createStore } from 'redux'

const anecdoteReducer = (state = [], action) => {
  console.log('state now:', state)
  console.log('action now', action)

  switch(action.type) {  
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }

    case 'INIT_ANECDOTES': {
      return action.data
    }

    case 'ADD_VOTE': {
      const id = action.data.id
      let anecdotes = [...state, action.data]

      const anecdoteVoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)

      const changedAnecdoteVote = {
        ...anecdoteVoteToUpdate,
        votes: ++anecdoteVoteToUpdate.votes
      }

      let votes = changedAnecdoteVote.votes

      const content = changedAnecdoteVote.content
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdoteVote)
    }

    default:
    return state
  }       
}

const store = createStore(anecdoteReducer)

export const createVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: id
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer