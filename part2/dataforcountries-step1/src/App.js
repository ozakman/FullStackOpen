import React, { useState, useEffect } from 'react'
import CountriesList from './components/CountriesList'
import Find from './components/Find'

import axios from 'axios'


const App = () => {

  const[countries, setCountries] = useState([])
  const[countryName, setCountryName] = useState('')
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const filterCountryName = countries.filter(country => country.name.toLowerCase().includes(countryName))
  
  const handleChange = (event) => {
    setCountryName(event.target.value)
  }

  return (
    <div>
      <Find countryName={countryName} handleChange={handleChange} />
      <CountriesList countryName={countryName} countries={filterCountryName ? filterCountryName : countries} />
    </div>
  )
}

export default App