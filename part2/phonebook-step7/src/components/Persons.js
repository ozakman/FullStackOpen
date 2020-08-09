import React from 'react'


const Persons = ({ persons, filterName }) => {

const filteredName = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  if(filteredName.length === 0){
    return(
      <p>not any matching found</p>
    )
  }
  return filteredName.map(person => (
      <div key={person.name}>{person.name} {person.number}</div>
    )
  )
}

export default Persons