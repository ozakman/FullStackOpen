import React from 'react'
import CountryInfo from './CountryInfo'



const CountriesList = ({ countries, newFilter, setFilterUsingButton }) => {

  const filteredList = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  if (newFilter.length === 0 || filteredList.length === 0) {
    //return <div />
    return (null)
  }

  if (filteredList.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (filteredList.length > 1) {
    return filteredList.map(country => (
      <div key={country.name}>
        {country.name}{' '}
        <button value={country.name} onClick={setFilterUsingButton}>
          {' '}
          show{' '}
        </button>
      </div>
    ))
  } else {
    return (
      <div>
        <CountryInfo country={filteredList[0]} />
      </div>
    )
  }
}

export default CountriesList