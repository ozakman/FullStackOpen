/* eslint-disable */
import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  const store = props.store
  
  const notificationSelected = (value) => () => {
    console.log('notificationSelected', value)
  }
  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App