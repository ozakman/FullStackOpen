import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({courseName}) =>{
  return <h1>{courseName}</h1>
}

const Part = ({part}) =>{
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({parts}) =>{
  return(
    <div>
      {parts.map( (part) =>{
        return <div key={part.id}><Part part={part} /></div>
      })}
    </div>
  )
}

const Total = ({exercises}) =>{
  const total = exercises.reduce( (sum, part) => sum + part, 0)
  return <p><b>total of {total} exercises</b></p>
}

const Course = ({course}) =>{
  const exercises = course.parts.map( part => part.exercises)
  return(
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exercises} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return(
    <div>
      {courses.map( course => {
        return  <div key={course.id}><Course course={course} /></div>
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))