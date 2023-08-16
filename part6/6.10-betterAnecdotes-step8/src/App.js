/* eslint-disable */
import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
  const store = props.store

  const notificationSelected = (value) => () => {
    console.log('notificationSelected', value)
  }
  return (
    <div>
      <Notification store={props.store} />
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App