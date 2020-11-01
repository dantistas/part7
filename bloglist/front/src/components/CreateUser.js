import React, { useState } from 'react'
import userServices from '../services/users'

import {
  useHistory
} from "react-router-dom"


const CreateUser = ({store,setNotification, user, setErrorMessage }) => {
    const [userName, setUserName] = useState(null)
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)

    const history = useHistory()


    if( user ){

      history.push("/")
    }


    const createUser = (e) => {

        const userObject = {

          username: userName, 
          name: name, 
          password: password
          
        }
      
          if(!userName || !name || !password){

            e.preventDefault()
            store.dispatch(setErrorMessage(`Check input fields, can not be empty`, 3000))

          } else {

            e.preventDefault()
            userServices.createUser(userObject)
            store.dispatch(setNotification(`Your account was succesfully created, you can now login!`, 3000))
            setUserName('')
            setName('')
            setPassword('')
            history.push("/log-in")
            
          }

        
                
         
     }

return (
    <div className="formDiv">
      <form onSubmit={createUser}>
        <div className="field">
          <input className="input"
            id="userName"
            type="text"
            value={userName}
            name="userName"
            placeholder="username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div className="field">
          <input className="input"
            id="name"
            type="text"
            value={name}
            name="name"
            placeholder="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="field">
          <input className="input"
            id="password-signup"
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="buttons">
            <button className="button is-link" id="create-user-button" type="submit">Create account</button>
            <button className="button is-link" onClick={()=>{history.push("/")}} type="button">Cancel</button>
        </div>   
      </form>
  </div>

)


}



export default CreateUser