import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) =>{
  return(
      <div>
          <h1>{course.name}</h1>
      </div>
  )
}

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises} </p>
}

const Content = ({parts}) =>{
  return(
    <div>
      {parts.map((part) => {
        return <div key={part.id}> <Part part={part} /></div>
      })}
    </div>      
  )
}

const Total = (props) =>{
  const exercises = props.parts.map(part => part.exercises)
  const total = exercises.reduce(function(sum, part) {
    console.log("values of sum and part: ", sum, part)
    return sum + part
  }, 0)
  return <p><b>total of {total} exercises</b></p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
