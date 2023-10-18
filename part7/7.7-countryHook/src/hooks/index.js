import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        console.log('response', response)
        setCountry(response.data)
      })
    }, [name])

    if(name === '') {
      return null
    }

    if(!country) {
      return []
    }

    return country 
}