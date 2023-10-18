import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/Blogs'
import loginService from './services/Login'

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [user, setUser] = useState(null)

  //Metodilla createRef luodaan ref blogFormRef, joka kiinnitetään bloggien
  //luomislomakkeen sisältävälle Togglable-komponentille. Nyt siis muuttuja
  //blogFormRef toimii viitteenä komponenttiin Togglable.
  const blogFormRef = React.createRef()

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
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        window.location.reload(false)
      }, 1000)
      setSuccessMessage(`${user.name} logged in`)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setSuccessMessage('logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    setUser(null)
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(BlogToAdd)
      setAllBlogs(allBlogs.concat(createdBlog))
      setSuccessMessage(`A new blog ${BlogToAdd.title} was successfully added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Cannot add blog ${BlogToAdd.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      setSuccessMessage(`Blog ${BlogToUpdate.title} was successfully updated`)
      setAllBlogs(
        allBlogs.map((blog) =>
          blog.id !== BlogToUpdate.id ? blog : updatedBlog
        )
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Cannot update blog ${BlogToUpdate.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (
        window.confirm(
          `Remove blog ${BlogToDelete.title} by ${BlogToDelete.author} ?`
        )
      ) {
        blogService.remove(BlogToDelete.id)
        setAllBlogs(allBlogs.filter((blog) => blog.id !== BlogToDelete.id))
        setSuccessMessage(`Blog ${BlogToDelete.title} was successfully deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(`Cannot delete blog ${BlogToDelete.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (user === null) {
    return (
      <div className="container">
        <Notification
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <h2>Log in to application</h2>
        <Togglable buttonLabel="Log in">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className="container">
      <Notification successMessage={successMessage} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout} type="submit">
          {' '}
          logout
        </button>
      </p>
      <br></br>
      {allBlogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          //likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          handleLogin={user.name}
          user={user.name}
          userToken={user.token}
        />
      ))}
      <br></br>
      <div className="container">
        <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      <br></br>
    </div>
  )
}

export default App
