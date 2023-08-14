import React, { useState, useEffect } from 'react'
import Find from './components/Find'
import CountriesList from './components/CountriesList'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const setFilterUsingButton = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Find newFilter={newFilter} setNewFilter={setNewFilter} />
      <CountriesList
        countries={countries}
        newFilter={newFilter}
        setFilterUsingButton={setFilterUsingButton}
      />
    </div>
  )
}

export default App