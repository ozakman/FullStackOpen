import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    /*
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
    */
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorMessage(`No data could be retreived from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
 
    if(!newName || newName === ''){
      return alert('Enter a name')
    }

    const personName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      if(personName && personName.number !== newNumber){
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)        
          personName.number = newNumber
          personService
            .update(personName.id, personName)
            .then(response =>{
              console.log('response is:', response)

              setPersons(persons.map(person => person.personName !== personName ? person : response.data))
              setNewName('')
              setNewNumber('')

              setMessage(
                `The old number for '${personName.name}' is successfully replaced with the new number`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(
                `Information of '${personName.name}' has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

              setPersons(persons.filter(person => person.personName !== personName))
            })
      }  

    else if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
        alert(`${newName} is already added to phonebook`)
    }
    else{
      /*
      axios
        .post('http://localhost:3001/persons', personObject)      
        .then(response => {
          console.log('promise fulfilled')
          setPersons(persons.concat(response.data))
        })    
      setNewName('')
      setNewNumber('')
      */
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(
            `${newName} with the number ${newNumber} is successfully added to the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of '${newName}' could not be added to the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } 
}

  const removePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(
            `${person.name} is successfully removed from the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of '${person.name}' has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
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

      <Notification message={message} errorMessage={errorMessage} />

      <Filter filterName={filterName} setFilterName={setFilterName} />

      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filterName={filterName} removePerson={removePerson} />
      </div>
    </div>
  )
}

export default App