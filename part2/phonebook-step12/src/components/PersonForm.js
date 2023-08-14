import React from "react"

const PersonForm = ({ addName, newName, newNumber,handleNameChange,
                      handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div className="form">
        <label>      
          name: <input value={newName} onChange={handleNameChange} /> 
        </label>     
      </div>
      <div>
        <label>      
          number: <input value={newNumber} onChange={handleNumberChange} />
        </label>      
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm