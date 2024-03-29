import React from 'react'


const Persons = ({ persons, filterName, removePerson }) => {

const filteredName = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  if(filteredName.length === 0){
    return(
      <p>not any match</p>
    )
  }
  return filteredName.map(person => (
      <div key={person.name}>{person.name} {person.number}{' '}
        <button className="button" value={person.name} onClick={() => removePerson(person)}>
          {' '}delete{' '}
        </button>
      </div>
    )
  )
}

export default Persons