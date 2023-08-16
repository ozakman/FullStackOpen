const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const showNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification
  }
}
  
export const hideNotification = notification => {
  return {
    type: 'HIDE_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer