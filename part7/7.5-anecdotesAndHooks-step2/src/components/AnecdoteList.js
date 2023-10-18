import React from 'react'
import {Link} from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {/* "anecdotes?" checks if the "anecdotes array" exists and maps only then over the array */}
      {anecdotes?.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}{' '}{ anecdote.author}</Link>
        </li>
    )}
    </ul>
</div>
)

export default AnecdoteList