import React  from 'react'



const Blogs = ({blog, Link}) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle} className={'blog-class'} id="blog">
     <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export default Blogs


