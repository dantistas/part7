import blogService from '../services/blogs'


const blogsReducer = (state = [] , action) => {
    switch(action.type) {
        case 'CREATE_NEW_BLOG':
            return state.concat(action.data)  
        case 'INIT_BLOGS':
            return state = action.data 
            
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

export default blogsReducer