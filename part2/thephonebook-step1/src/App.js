import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
   
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName }  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        name:       
        <input 
          value={newName}
	        onChange={handleNameChange}				                                   
	      />
        <div>
         <button type="submit">add</button> 
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map( (person) => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
