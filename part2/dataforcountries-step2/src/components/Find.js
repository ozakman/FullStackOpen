import React from 'react'


const Find = ({ newFilter, setNewFilter }) => {
  const filterCountries = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries {' '}
      <input value={newFilter} onChange={filterCountries} />
    </div>
  )
}

export default Find