import React from 'react'

const Notification = ( props ) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
    {/*render here notification...*/}
    {props.store.getState().notification}
    </div>
  )
}

export default Notification