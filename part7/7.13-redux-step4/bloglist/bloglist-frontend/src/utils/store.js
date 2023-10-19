/* eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from '../reducers/userReducer'
import autherReducer from '../reducers/autherReducer'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
  user: autherReducer,
  users: userReducer,
  blog: blogReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
