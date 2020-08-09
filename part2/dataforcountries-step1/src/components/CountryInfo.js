import React from 'react'

const CountryInfo = ({countryInfo}) => {
    return (
        <div>
            {countryInfo.map( (country, index) => <div key={index}>
                <h3>{country.name}</h3>
                <div>capital: { country.capital}</div>
                <div>population: { country.population}</div>
                <h4>languages</h4>
                {(country.languages).map((lang,index) => <ul key={index}><li>{lang.name}</li></ul>)}
                <img src={country.flag} alt={country.name} width= '100' height='67' />
            </div>
            )}
        </div>
    )
}

export default CountryInfo