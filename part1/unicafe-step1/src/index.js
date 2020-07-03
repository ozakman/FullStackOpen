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
      <button onClick={() => setGood(good + 1)} > good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>
      <Header secondHeadline={secondHeadline} />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))