import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
    <div>
      <h2>{props.headline}</h2>
      <h2>{props.secondHeadline}</h2>
    </div>
  )
}

const Statistics = (props) => {
  const sumAll = props.good + props.neutral + props.bad
  const average =(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad) || 0
  const positive = (props.good / (props.good + props.neutral + props.bad) * 100) || 0

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {sumAll}</p>
      <p>average {average}</p>
      <p>positive {positive} % </p>
    </div>
  )
}

const Button = (props) => (  
  <button onClick={props.handleClick}>{props.text}</button> 
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headline = 'give feedback'
  const secondHeadline = 'statistics'

  return (
    <div>
      <Header headline={headline} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header secondHeadline={secondHeadline} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))