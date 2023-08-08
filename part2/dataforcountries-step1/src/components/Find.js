import React from 'react'

const Find = ({countryName, handleChange}) => {

    return (
        <div>
           find countries <input value={countryName} onChange={handleChange} /> 
        </div>
    )
}

export default Find