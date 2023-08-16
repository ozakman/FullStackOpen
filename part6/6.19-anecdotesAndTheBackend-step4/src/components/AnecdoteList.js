/* eslint-disable */
import React from 'react'
import { createAnecdote, createVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    
  const addVote = (anecdote) => {
    props.createVote(anecdote)
    props.showNotification(`you voted "${anecdote.content}"`)
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
         
  return (
    <div>  
      <h2>Anecdotes</h2>
        {/*{anecdotes.sort(compareNumbers).map(anecdote =>  This also works!*/}
        {props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => { 
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
}

const mapStateToProps = (state) => {
  console.log('state in mapStateToProps: ', state)
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state),
  }
}

const mapDispatchToProps = {
  createAnecdote,
  createVote,
  setFilter,
  showNotification,
  hideNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)