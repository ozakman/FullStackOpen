/* eslint-disable */
import { createStore } from 'redux'

const reducer = (state = [], action) => {
  switch(action.type) {  
    case 'NEW_ANECDOTE': {
      const id = action.data
      let initialState = state.concat(action.data)
      let anecdotes = initialState
      return anecdotes
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
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdoteVote)
    }

    default:
    return state
  }       
}

const store = createStore(reducer)

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createVote = (id) => {
    return {
      type: 'ADD_VOTE',
      data: id
    }
  }

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: generateId(),
      votes: 0
    }
  }
}

export default reducer