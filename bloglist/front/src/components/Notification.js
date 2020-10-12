import React from 'react'


const Notification = ({notification}) => {
      
    if(notification === null ){
        return null
    }  else {
        return (
            <div style={notification.style}>
                {notification.content}
            </div>
        )
    } 

}


export default Notification