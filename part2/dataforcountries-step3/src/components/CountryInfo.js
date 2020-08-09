import React from 'react'
import Weather from './Weather'


const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      {/*<img src={country.flag} alt={`${country.name} flag`} style={{ width: "100px" }} />*/}
      <img src={country.flag} alt={country.name} width= '100' height='67' />
      <Weather capital={country.capital} />
    </div>
  )
}

export default CountryInfo