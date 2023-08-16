import React from 'react'
import { createVote } from '../reducers/anecdoteReducer'

const CreateAnecdoteList = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()

  const addVote = (id) => {
    store.dispatch(createVote(id))    
  }

  //Make sure that the anecdotes are ordered by the number of votes:
  const byVotes = (v1, v2) => v2.votes - v1.votes

  //Alternative code for sort function
  function compareNumbers(a, b) {
      return b.votes - a.votes
  }
  anecdotes.sort(compareNumbers)
  console.log('anecdotes order compared by votes', anecdotes.sort(compareNumbers))    

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.sort(byVotes).map(anecdote =>
        //{anecdotes.sort(compareNumbers).map(anecdote => // This also works!
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
    </div>
  )
}

export default CreateAnecdoteList