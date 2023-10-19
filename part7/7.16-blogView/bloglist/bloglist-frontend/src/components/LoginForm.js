/* eslint-disable */
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/autherReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    navigate('/blogs')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username: <input type="text" name="username" id="username" />{' '}
      </div>
      <div>
        password: <input type="password" name="password" id="password" />{' '}
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
