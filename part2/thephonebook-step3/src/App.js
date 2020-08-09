import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  
  //adding state called newName for storing the user submitted input 
  const [ newName, setNewName ] = useState('')

  //adding state called newNumber for storing the user submitted input 
  const [ newNumber, setNewNumber ] = useState('')

  //adding an HTML form to the component that will be used for adding new names
  const addName = (event) => {
    event.preventDefault()
    const personObject = { 
      name: newName, 
      number: newNumber 
    }

    if( newName  === ''){
      return alert ('Enter a name')
    }
    
    const checkName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    checkName ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
      <div>
        name:       
        <input
          //state "newName" is set as the input element's value attribute 
          value={newName}
          //registering an event handler to the "onChange" attribute of the form's input element
	        onChange={handleNameChange}				                                   
        />
      </div>
      <div>
        number:
        <input
          //state "newNumber" is set as the input element's value attribute
          value={newNumber}
          //registering an event handler to the "onChange" attribute of the form's input element
          onChange={handleNumberChange}
        />
      </div>
        <div>
         <button type="submit">add</button> 
        </div>
      </form>
      <h2>Numbers</h2>
        {/*{persons.map( (person, index) => <div key={index}>{person.name}</div>)}*/}
        {/*{persons.map( (person, name) => <div key={name}>{person.name}</div>)}*/}
        {persons.map( (person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App