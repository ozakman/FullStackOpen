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
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return (
      <div>
      <p>No feedback given</p>
      </div>
    )
  }
  else if (props.good !== 0 && props.neutral === 0 && props.bad === 0){
    return (
      <div>
        <p>good {props.good} </p>
      </div>
    )
  }
  else if (props.good !== 0 && props.neutral !== 0 && props.bad === 0){
    return (
      <div>
        <p>good {props.good} </p>
        <p>neutral {props.neutral} </p>
      </div>
    )
  }
  return (
    <div>
      <p>good {props.good} </p>
      <p>neutral {props.neutral} </p>
      <p>bad {props.bad} </p>
      <p>all {props.good + props.neutral + props.bad} </p>
      <p>average {(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad)} </p>
      <p>positive {props.good / (props.good + props.neutral + props.bad) * 100} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headline = 'give feedback'
  const secondHeadline = 'statistics'

  return (
    <div>
      <Header headline={headline} />
      <button onClick={() => setGood(good + 1)} > good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>
      <Header secondHeadline={secondHeadline} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
