import React from 'react'


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

export default Course