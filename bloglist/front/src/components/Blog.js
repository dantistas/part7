// import React, { useState, useEffect } from 'react'
// import {
//     useParams,
//     useHistory
//   } from "react-router-dom"

// import moment from 'moment'

// // nereikalingas


// const Blog = ({blogs,users, blogService, store, setErrorMessage, deleteBlogPost, user, initializeBlogs,setNotification}) => {  

//     const id = useParams().id
//     const history = useHistory()

//   let blog 

//   console.log("blogs: ",blogs)
//   console.log("users: ",users)


//   if(!blogs){
//     return (
//       null
//       )
//   } else {
//     blog = blogs.find(blog => blog.id === id)
    
//   }


//   return (
//     <div>
//       <button onClick={()=>{window.location.reload()}}>refresh</button>
//       <p>{blog.title}</p> 
//     </div>
     
//     )
  

//     // const blog =  blogs.find(b => b.id === id)
//     // if(!blog){
//     //   history.push('/')
//     // }
   
//     // const initialiazeBlog = async ()=>{
//     //     blog = await blogs.find(b => b.id === id)
//     // }

//     // initialiazeBlog()

//     // blogo neranda ant refresho kodel ???? nesmaone kazkoke


//     // const [blog, setBlog] = useState(blogs.find(b => b.id === id))
//     // const [likes, setLikes] = useState(blog.likes)
//     // const [comments, setComments] = useState(blog.comments)
//     // const [comment, setComment] = useState('')
    
    
//     // const createComment =  async(e) => {

//     //   if(comment !== ''){

//     //       const object = {
//     //         comment:comment,
//     //         id:blog.id,
//     //         date: moment().format('MMMM Do YYYY, h:mm:ss a')
//     //       }

//     //     e.preventDefault()
//     //     await blogService.postComment(object)
//     //     setComments(comments.concat(object))
//     //     store.dispatch(setNotification('Comment was succesfully posted!',3000))
//     //     // await store.dispatch(initializeBlogs())
//     //     // initialiazeBlog()
//     //     setComment('')
//     //   }else{
//     //     e.preventDefault()
//     //     store.dispatch(setErrorMessage('You cannot post empty comment!', 3000))
//     //   }
//     // }
 
//     // const deleteBlog = (id) => {
//     //     const toDelete = blogs.find(b => b.id === id)
//     //     if(toDelete.userID === user.id){
//     //       const ok = window.confirm(`Delete: ${toDelete.title} by ${toDelete.author} ?`)
//     //     if(ok){
//     //       store.dispatch(deleteBlogPost(id))
//     //       store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was deleted!`, 3000))
//     //       history.push('/')
//     //      }
//     //     }else{
//     //       store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was NOT deleted! because you are not creator `, 3000))
//     //     }
        
//     //   }

//     // const onClickLikePost = (id) => {
//     //     blogService.like(id)
//     //     store.dispatch(initializeBlogs())
        
//     //   }
      
//     // if(!blogs) {
//     //     return (
//     //         null
//     //     )
//     // } else {
//     //   return (
//     //     <div className="card" id="card">
//     //         <header className="card-header">
//     //         <button onClick={()=>{console.log(history)}}>history</button>
//     //           <p className="card-header-title title">
//     //             {blog.title} by: {blog.author}
//     //           </p>
//     //         </header>
//     //         <div className="card-content">
//     //           <div className="content">
//     //             <a href={`https://${blog.url}`}>{blog.url}</a>
//     //             <p>added by: {blog.user[0].name}</p>
//     //             <p>likes: {likes}</p>
//     //             <h2 className="subtitle is-4">Comments:</h2>
//     //               <form onSubmit={createComment}>
//     //                 <input  
                            
//     //                         id="comment"
//     //                         type="text"
//     //                         value={comment}
//     //                         name="comment"
//     //                         placeholder="write a comment"
//     //                         onChange={({ target }) => setComment(target.value)}>
//     //                 </input>
//     //                 <button  type="submit">Post</button>
//     //               </form>
//     //               <ul>
//     //                 {comments.map(c=><li key={c.date}><p>{c.comment} at: {c.date}</p> </li>)}
//     //               </ul>
//     //           </div>
//     //         </div>
//     //         <footer className="card-footer">
//     //           <a href={null} className="card-footer-item" onClick={() => { onClickLikePost(blog.id); setLikes(likes+1) }}>Like</a>
//     //           <a href={null} className="card-footer-item" onClick={() => deleteBlog(blog.id)}>Delete</a>
//     //           <a href={null} className="card-footer-item" onClick={()=>{history.push('/')}}>Back</a>
//     //         </footer>
//     //   </div>
      
      
//     //   )
//     // }

// }

// export default Blog