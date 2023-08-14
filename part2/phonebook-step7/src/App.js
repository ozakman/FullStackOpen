import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {

  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
        alert(`${newName} is already added to phonebook`)
    }
    else{
      axios
        .post('http://localhost:3001/persons', personObject)      
        .then(response => {
          console.log('promise fulfilled')
          setPersons(persons.concat(response.data))
        })    
      setNewName('')
      setNewNumber('')
    }
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
      <Filter filterName={filterName} setFilterName={setFilterName} />

      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filterName={filterName} />
      </div>
    </div>
  )
}

export default App