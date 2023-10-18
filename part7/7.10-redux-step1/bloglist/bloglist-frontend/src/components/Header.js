/* eslint-disable */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/autherReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const padding = {
    padding: 5,
    color: 'blue'
  }

  const style = {
    padding: 5,
    color: 'blue'
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/')
  }

  const headerStyle = {
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }

  return (
    <div style={headerStyle}>
      <Link style={padding} to="/blogs">
        blogs
      </Link>

      <Link style={padding} to="/users">
        users
      </Link>

      <span style={style}>{user.name} logged in </span>

      <button onClick={handleLogout} type="submit">
        logout
      </button>
    </div>
  )
}

export default Menu
