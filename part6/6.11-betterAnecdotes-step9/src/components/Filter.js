import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const store = props.store
 
  const handleChange = (event) => {
    event.preventDefault()
    let content = event.target.value
    store.dispatch(setFilter(content))
    /*setTimeout(() => {
      store.dispatch(hideFilter(''))
    }, 15000)*/
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
    <p></p>
      filter <input onChange={handleChange} />
      <br></br>
      <br></br>
      {props.store.getState().filter}
    </div>
  )
}

export default Filter