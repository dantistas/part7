import blogService from '../services/blogs'

const userReducer = ( state = null , action) => {
    switch(action.type) {
        case 'SET_USER':
            return state = action.data
        default:
            return state   
    }
}


export const setUser = (user) => {
    
    return async dispatch => {
        
        await dispatch({
                type:'SET_USER',
                data: user
            })
    }

}





export default userReducer