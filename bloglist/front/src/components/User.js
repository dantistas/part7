import React from 'react'
import {
    useParams
  } from "react-router-dom"
import Blogs from "../components/Blogs"


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
            <h1 className="title">{user.name}</h1>
            <h4 className="subtitle">added these blogs</h4>
            {user.blogs.map(blog=><li key={blog.id}>{blog.title} </li>)}
        </div>
    )


}

export default User