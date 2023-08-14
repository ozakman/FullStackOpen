import React from 'react'

const Filter = ({ filterName, setFilterName }) => {
  
  const filterPersons = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      filter shown with <input value={filterName} onChange={filterPersons} />
    </div>
  )
}

export default Filter