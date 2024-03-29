import React, { useState } from "react"
import ReactDOM from "react-dom"


const highestVote = (votes, anecdote) => {
  let i = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdote[i]}</div>
      <div>has {votes[i]} votes</div>
    </div>
  )
}

const App = props => {
  const dataLenght = props.anecdotes.length

  const randomPick = () => Math.floor(Math.random() * dataLenght)

  const [selected, setSelected] = useState(randomPick)
  const [votes, setVotes] = useState(Array(dataLenght).fill(0))
  
  const giveVote = selected => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => giveVote(selected)}>vote</button>
      <button onClick={() => setSelected(randomPick)}> next anecdote </button>
      <div>{highestVote(votes, props.anecdotes)}</div>
    </div>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))