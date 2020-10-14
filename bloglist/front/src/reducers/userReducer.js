import usersService from '../services/users'

const userReducer = ( state = {
                                user:null,
                                users:null
                                            } , action) => {
    switch(action.type) {
        case 'SET_USERS':
            return {...state, users: action.data}
        case 'INIT_USERS':
            return {...state, users: action.data}
        case 'SET_USER':
            return {...state, user: action.data}
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

export const setUsers = (user) => {
    
    return async dispatch => {
        
        await dispatch({
                type:'SET_USERS',
                data: user
            })
    }

}

export const initializeUsers = () => {
    
    return async dispatch => {

        const users = await usersService.getAll()
        dispatch({
            type:'INIT_USERS',
            data:users
        })
    }
}


export default userReducer