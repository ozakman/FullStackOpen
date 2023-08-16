const filterReducer = (state = '', action) => {
  console.log('state now:', state)
  console.log('action now', action)

  switch(action.type) {
    case 'SET_FILTER': {
      return action.filter
    }
    case 'HIDE_FILTER': {
      return action.filter
    }
    default:
      return state
  }
}

export const setFilter = filter => {
  return{
    type: 'SET_FILTER',
    filter
  }
}

export const hideFilter = () => {
  return {
    type: 'HIDE_FILTER',
    filter: ''
  }
}

export default filterReducer