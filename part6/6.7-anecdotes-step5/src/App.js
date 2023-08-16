/* eslint-disable */
import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  return (
    <div>
      <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App