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
      {/*Using higher-order function "map"*/}
      {parts.map((part, index) => {
        return <div key={index}><Part part={part}/></div>
      })}
      {/*
      <p> {props.course.parts[0].name} {props.course.parts[0].exercises}</p>
      <p> {props.course.parts[1].name} {props.course.parts[1].exercises}</p>
      <p> {props.course.parts[2].name} {props.course.parts[2].exercises}</p>
      */}
    </div>      
  )
}

const Total = (props) =>{
  const {parts} = props
  //Using higher-order function "reduce"
  const total = parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  
  return(
    <p><b>Total of {total} exercises</b></p>
  )
  /*
  return(
      <div>
          <p><b>yhteensä {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} tehtävää</b></p>
      </div>
  )
  */
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