import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
   
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = { 
      name: newName, 
      number: newNumber 
    }

    if( newName  === ''){
       alert ('Enter a name')
    }
    
    const checkName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    checkName ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')    
  }

  const filteredName = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName} >
      <div>
        name:       
        <input 
          value={newName}
	        onChange={handleNameChange}				                                   
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
        <div>
         <button type="submit">add</button> 
        </div>
      </form>
      <h2>Numbers</h2>
        {filteredName.map( (person) => <div key={person.name}>{person.name} {person.number}</div>)}
        {(filteredName.length === 0) ? <p>not any match</p> : null}       
    </div>
  )
}

export default App
