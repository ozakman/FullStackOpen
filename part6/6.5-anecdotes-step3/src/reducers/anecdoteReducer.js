/* eslint-disable */
import { createStore } from 'redux'

const reducer = (state = [], action) => {
  console.log('state now:', state)
  console.log('action now', action)

  switch(action.type) {  
    case 'NEW_ANECDOTE':
      {
        const id = action.data
        let initialState = state.concat(action.data)
        let anecdotes = initialState
        return anecdotes
      }

    case 'ADD_VOTE': {
      const id = action.data
      let anecdotes = [...state, action.data]
      const anecdoteVoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)

      const changedAnecdoteVote = {
        ...anecdoteVoteToUpdate,
        votes: ++anecdoteVoteToUpdate.votes
      }

      let votes = changedAnecdoteVote.votes
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdoteVote)
    }

      const maxVoteIndex = votes.indexOf(Math.max(...votes));
      const maxVoteAnecdote = anecdotes[maxVoteIndex]
      console.log('maxVoteAnecdote', maxVoteAnecdote)

      const sortHighestVotes = Math.max(...votes)
      const anecdoteWithHighestVotes = votes.indexOf(sortHighestVotes)
      console.log('anecdoteWithHighestVotes', anecdoteWithHighestVotes)

    default:
    return state
  }       
}

const store = createStore(reducer)

export default reducer