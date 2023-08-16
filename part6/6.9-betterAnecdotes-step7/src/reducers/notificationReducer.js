const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'CREATE_NOTIFICATION':
        return action.notification
      case 'SHOW_NOTIFICATION':
        return action.notification
      case 'HIDE_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }

  export const createNotification = notification => {
    return {
      type: 'CREATE_NOTIFICATION',
      notification
    }
  }

  export const notificationChange = notification => {
    return {
      type: 'SET_NOTIFICATION',
      notification
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
      notification
    }
  }
  
  export default notificationReducer