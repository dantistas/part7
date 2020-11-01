import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="button is-link" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div className="buttons is-right">
          <button className="delete is-large" onClick={toggleVisibility}></button> 
        </div>
        {props.children}  
      </div>
    </div>
  )
}

export default Togglable

