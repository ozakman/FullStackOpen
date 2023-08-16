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

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        notification: ''          
      })
    }, displayTime * 1000)
  }
}
  
export default notificationReducer