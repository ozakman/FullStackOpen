import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>{
  return(
      <div>
          <h1>{props.course.name}</h1>
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
  const {parts} = props
  console.log('values of Content props are: ', parts)
  return(
    <div>
      {parts.map((part, index) => {
        return <div key={index}><Part part={part}/></div>
      })}
    </div>      
  )
}

const Total = (props) =>{
  const {parts} = props
  const total = parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  
  return(
    <p><b>Total of {total} exercises</b></p>
  )
}

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))