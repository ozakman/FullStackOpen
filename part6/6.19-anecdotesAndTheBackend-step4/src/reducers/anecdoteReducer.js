/* eslint-disable */
import anecdoteService from '../services/anecdotes'

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

export const createVote = (anecdote) => {
  return async dispatch => {
    const voteAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: voteAnecdote,
    })
  }
}

export const createAnecdote = content => {
  return  async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer