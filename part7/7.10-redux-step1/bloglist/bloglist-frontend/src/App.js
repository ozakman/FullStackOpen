/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Header from './components/Header'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs, like, comment } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { initializeUser } from './reducers/autherReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)

  const margin = {
    margin: 5
  }

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      <Routes>
        <Route
          path="/users/:id"
          element={
            <React.Fragment>
              {user === null ? (
                <div>
                  <Notification />
                  <LoginForm />
                </div>
              ) : (
                <div>
                  <Header />
                  <h2>Bloglist</h2>
                  <Notification />
                  <h3>{user.name}</h3>
                  <h4>Added blogs</h4>
                  {!foundUser ? null : (
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            {foundUser.blogs.map((blog) => (
                              <Blog key={blog.id} blog={blog} />
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <React.Fragment>
              {' '}
              {user === null ? (
                <div>
                  <Notification />
                  <LoginForm />
                </div>
              ) : (
                <div>
                  <Header />
                  <h2>Bloglist</h2> <Notification />
                  {!foundBlog ? null : (
                    <div>
                      <h2>{foundBlog.title}</h2>
                      <p>{foundBlog.url}</p>
                      <p>added by {foundBlog.author}</p>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/blogs"
          element={
            <React.Fragment>
              {user === null ? (
                <div>
                  <Notification />
                  <LoginForm />
                </div>
              ) : (
                <div>
                  <Header />
                  <h2>Bloglist</h2>
                  <Notification />
                  <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                    <BlogForm />
                  </Togglable>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <BlogList />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/users"
          element={
            <React.Fragment>
              {user === null ? (
                <div>
                  <Notification />
                  <LoginForm />
                </div>
              ) : (
                <div>
                  <Header />
                  <h2>Bloglist</h2>
                  <Notification />
                  <h2>Users</h2>
                  <UserList />
                </div>
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/"
          element={
            <React.Fragment>
              <Notification />
              <LoginForm />
            </React.Fragment>
          }
        />
      </Routes>
    </div>
  )
}

export default App
