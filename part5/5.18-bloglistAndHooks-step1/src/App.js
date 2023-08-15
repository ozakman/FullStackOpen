/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/Blogs'
import loginService from './services/Login'
import { useField } from './hooks'

const App = () => {

  const { reset: resetName, ...name } = useField('text')
  const { reset: resetPsw, ...psw } = useField('text')
  
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('user VALUE IS: ', user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setAllBlogs(blogs)
  }

  const handleLogin = async (event) => {

    const username = name.value
    const password = psw.value
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      window.location.reload(false)
      blogService.setToken(user.token)
      resetName()
      resetPsw()

      setSuccessMessage(`Login successful, ${user.name} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
    setSuccessMessage('Logout successful')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    resetName()
    resetPsw()
    setUser(null)
    window.location.reload(false)
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
        .create(BlogToAdd)
      setSuccessMessage(
        `A new blog ${BlogToAdd.title} was successfully added`
      )
      setAllBlogs(allBlogs.concat(createdBlog))
      
      window.location.reload(false)
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      setSuccessMessage(
        `Blog ${BlogToUpdate.title} was successfully updated`
      )
      setAllBlogs(allBlogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${BlogToUpdate.title}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${BlogToDelete.title} by ${BlogToDelete.author} ?`)) {
        blogService
          .remove(BlogToDelete.id)
        setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setAllBlogs(allBlogs.filter(blog => blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (id, likes) => {
    await blogService.update({
      id: id,
      likes: likes + 1,
    });
    setUpdate(Math.floor(Math.random() * 1000))
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const tokenInText = user
  const plainText = JSON.stringify(tokenInText)
    
  if (user === null) {
    return (
      <div>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <h2>Log in to application</h2>
        
        <form onSubmit={handleLogin}>
            username: 
            <input
              {...name} 
            />
            <br/><br/> 
            password:
            <input
              {...psw} 
            />
            <br/><br/>
            <button id='login-button' type="submit">login</button>
            <br/><br/>
            <div>
              {name.value} {psw.value}
            </div> 
          </form>
        <br/>        
      </div>
    ) 
  } 
 
  const kayttaja = user

  if(user !== null){
    return(
      <div>
        <h2>Blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout} type="submit"> logout</button></p><br></br>

          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
          <br/>

          {allBlogs.sort(byLikes).map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            handleLogin={user.name}
            user={user.name}
            userToken={user.token} 
          />
          )}
      </div>
    )
  }
}

export default App