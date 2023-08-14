import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
      <div>
          <h1>{props.course}</h1>
      </div>
  )
}

const Part = (props) => {
  const {part} = props
  return(
    <div>{part.name} {part.exercises}</div>
  )
}

const Content = (props) =>{
  const {part1, part2, part3, exercises1, exercises2, exercises3} = props
  console.log('value of Content props', props)
  return(
    <div>          
      <p>{part1} {exercises1}</p>
      <p>{part2} {exercises2}</p>
      <p>{part3} {exercises3}</p>       
    </div>
  )     
}

const Total = ({exercises1, exercises2, exercises3}) =>{
  return(
    <div>
      <p><b>Total of {exercises1 + exercises2 + exercises3} exercises</b></p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1}  exercises2={exercises2}  exercises3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
