import React, { useState, useEffect} from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
//veliau sita sutvarkysim su tou effectu


const LoginForm = ({store, setUser, setErrorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()
        try{
          const user = await loginService.login({
            username,password,
          })
          window.localStorage.setItem('loggedUser', JSON.stringify(user))
          blogService.setToken(user.token)
          store.dispatch(setUser(user))
          setUsername('')
          setPassword('')
        }catch(exception){
          store.dispatch(setErrorMessage('wrong username or password', 3000))
        }
      }


    return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin} id="login-form">
                <div>
                    <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
                </form>
            </div>
            )
}


export default LoginForm