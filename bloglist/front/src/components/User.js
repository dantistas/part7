import React from 'react'
import {
    useParams
  } from "react-router-dom"


const User = ({users}) => {
    
    const id = useParams().id
    let user 
    if(!users) {
        return (
            null
        )
    } else {
        user = users.find(user => user.id === id)
    }
    
    return (
        <div>
            <h1>{user.name}</h1>
            <h4>added these blogs</h4>
            {user.blogs.map(blog=><li key={blog.id}>{blog.title}</li>)}
        </div>
    )


}

export default User