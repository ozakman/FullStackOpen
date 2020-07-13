import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  
  //Adding state called newName for storing the user submitted input 
  const [ newName, setNewName ] = useState('')

  //adding an HTML form to the component that will be used for adding new names
  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName }  
    setPersons(persons.concat(personObject)) //or: setPersons([...persons, personObject])
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
          //state "newName" is set as the input element's value attribute 
          value={newName}
          //registering an event handler to the "onChange" attribute of the form's input element
	        onChange={handleNameChange}				                                   
	      />
        <div>
         <button type="submit">add</button> 
        </div>
      </form>
      <h2>Numbers</h2>
        {/*{persons.map( (person, index) => <div key={index}>{person.name}</div>)}*/}
        {/*{persons.map( (person, name) => <div key={name}>{person.name}</div>)}*/}
        {persons.map( (person) => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
