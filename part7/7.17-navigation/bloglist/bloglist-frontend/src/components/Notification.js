/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.type === 'success') {
    return (
      <div>
        <div id="success" style={success}>
          {notification.message}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div id="error" style={error}>
          {notification.message}
        </div>
      </div>
    )
  }
}

export default Notification
