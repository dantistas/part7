import React, { useState} from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'


import {
  useHistory
} from "react-router-dom"


const LoginForm = ({store,user, setUser, setErrorMessage,setNotification}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()



if( user ){
  history.push("/")
}

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
          const loggedUser = await loginService.login({
            username,password,
          })
          window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
          blogService.setToken(loggedUser.token)
          store.dispatch(setUser(loggedUser))
          store.dispatch(setNotification(`Succesfully logged in. Welcome ${loggedUser.name}!`, 3000))
          setUsername('')
          setPassword('')
        }catch(exception){
          store.dispatch(setErrorMessage('wrong username or password', 3000))
        }
      }


    return (
          <div>
            <form onSubmit={handleLogin} id="login-form">
              <div className="field">
                  <input className="input"
                  id="username"
                  type="text"
                  value={username}
                  name="Username"
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                  />
              </div>
              <div className="field">
                  <input className="input"
                  id="password-login"
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                  />
              </div>
              <div className="buttons">
                <button  className="button is-primary" id="login-button" type="submit">login</button>
                <button  className="button is-link" >forgot password</button>
              </div>
            </form>
          </div>
            
            )
}


export default LoginForm