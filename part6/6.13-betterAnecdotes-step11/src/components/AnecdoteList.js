import React from 'react'
import { createVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    
    const addVote = (id, content) => {
      props.createVote(id)
      props.showNotification(`you voted "${content}"`)
      setTimeout(() => {
        props.hideNotification()
      }, 5000)    
    }

    //Make sure that the anecdotes are ordered by the number of votes:
    const byVotes = (v1, v2) => v2.votes - v1.votes

    //Alternative code for sort function
    function compareNumbers(a, b) {
        return b.votes - a.votes
    }
      
    props.anecdotes.sort(compareNumbers)
    console.log('anecdotes order compared by votes', props.anecdotes.sort(compareNumbers))
   
    return (
      <div>
        <h2>Anecdotes</h2>
          {props.anecdotes.sort(byVotes).map(anecdote =>
          //{anecdotes.sort(compareNumbers).map(anecdote => // This also works!
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>                
              </div>
            </div>
          )}
      </div>
    )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  createVote,
  showNotification,
  hideNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)