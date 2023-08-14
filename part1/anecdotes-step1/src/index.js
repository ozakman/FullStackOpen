import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <p><button onClick={props.handleClick}>{props.text}</button> </p>
)

const App = (props) => {
  const dataLenght = props.anecdotes.length
  const [selected, setSelected] = useState(0)

  const setRandom = (props) => {
    setSelected([Math.floor(Math.random() * dataLenght)])
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <Button handleClick={() => setRandom(dataLenght)} text='Next anectode' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))