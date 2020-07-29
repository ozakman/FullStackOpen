import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({capital}) => {

  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
    /* When using axios.get('https://api.weatherstack.com/current'...)
       with the free subscription plan of weatherstack.com the following 
       error notification occurs:

       Response error: code: 105, info: Access Restricted - Your current 
       Subscription Plan does not support HTTPS Encryption.

       This is worked around by changing to http only which will be less 
       secure:

       axios.get('http://api.weatherstack.com/current'...)        
    */            
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
      .then(response => {

        console.log('promise fulfilled')
        const apiResponse = response.data;              
        console.log('apiResponse:', apiResponse)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)

        setWeather(response.data.current)
      })
    }, [capital])

    return (
      <div>
        <h3>Weather in {capital}</h3>
        {
          <div>
            <p>Temparature:  {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt='Weather-icon' />
            <p>Wind: {weather.wind_speed} kph, direction {weather.wind_dir}</p>
          </div>
        }                
      </div>
    )
}

export default Weather
