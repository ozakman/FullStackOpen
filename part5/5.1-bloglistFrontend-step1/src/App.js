import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/Blogs'
import loginService from './services/Login'

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setAllBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

return (
  <div>
    <Notification errorMessage={errorMessage} successMessage={successMessage} />
    {user === null ?
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password} />
      </div> :

      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout} type="submit"> logout</button></p><br></br>
          {allBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
      </div>
      }
    </div>
  )
}

export default App