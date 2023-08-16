/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = ( props ) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state is: ', state)
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
    setNotification
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)