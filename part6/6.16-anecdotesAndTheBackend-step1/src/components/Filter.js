/* eslint-disable */
import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
 
  const handleChange = (event) => {
    event.preventDefault()
    let content = event.target.value
    props.setFilter(content)
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
      {props.filter}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Filter)