import React from 'react'


const Notification = ({notification, setNotificationNull , store}) => {
      
    if(notification === null ){
        return null
    }  else if(notification.style.color === "green"){
        return (
            <div className="notification is-success has-text-centered">
                <button className="delete" onClick={()=>{store.dispatch(setNotificationNull())}}></button>
                <strong>{notification.content}</strong> 
            </div>
        )
    } else if(notification.style.color === "red"){
        return (
            <div className="notification is-danger has-text-centered">
                <button className="delete" onClick={()=>{store.dispatch(setNotificationNull())}}></button>
                <strong>{notification.content}</strong> 
            </div>
        )
    }

}


export default Notification