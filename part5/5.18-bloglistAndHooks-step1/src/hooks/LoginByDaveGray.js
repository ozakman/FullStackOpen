/* eslint-disable */
import { useRef, useState, useEffect } from 'react'

const Login = () => {
  const useRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    useRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, password])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('user and password: ', user, password)
    setUser('')
    setPassword('')
    setSuccess(true)
  }

  return (
    <div>
      {success ? (
        <div>
          <h1>You are logged in</h1>
          <br/>
          <p>
          <a href="#">Go to Home</a>
          </p>
        </div>
      ) 
        : 
      (
      <div>    
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          ref={username}
          onChange={(event) => setUser(event.target.value)}
          value={user}
        />
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button id='login-button' type="submit">login</button>
        </form>
      </div>
      )}
    </div>
  )
}

export default Login