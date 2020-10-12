import blogService from '../services/blogs'


const blogsReducer = (state = [] , action) => {
    switch(action.type) {
        case 'CREATE_NEW_BLOG':
            return state = state.concat(action.data)  
        case 'INIT_BLOGS':
            return state = action.data 
        case 'DELETE_BLOG_POST':
            return state = state.filter(blog => blog.id !== action.data)
            
        default:
            return state 
    }
}


export const createNewBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
         dispatch(
           {
            type: 'CREATE_NEW_BLOG',
            data: newBlog
        }
    )
  }

}

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(
        {
          type: 'INIT_BLOGS',
          data: blogs
         }
      )
    } 
  }


export const  deleteBlogPost = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(
            {
                type:'DELETE_BLOG_POST',
                data:id
            }
        )
    }
}


export default blogsReducer