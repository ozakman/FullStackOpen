import React from 'react'
import CountryInfo from './CountryInfo'


const CountriesList = ({countries, countryName}) => {

    if(countryName && countries.length > 10){
        return <p>Too many matches, specify another filter</p>
    }else if(countries.length === 1){
        return <CountryInfo countryInfo={countries} />
    }else{
        return (
            <div>
                {countries.map((country, index) => <div key={index}>{country.name}</div>)}
            </div>
        )
    }
}

export default CountriesList