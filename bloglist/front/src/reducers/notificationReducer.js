const notificationReducer = (state = null , action) => {
    switch(action.type) {
        case 'NOTIFICATION_SET':
            return state = action.data 
        case 'NOTIFICATION_ERROR':
            return state = action.data 
        case 'NOTIFICATION_NULL':
            return state = null 
            
        default:
            return state 
    }
}


let timeoutId

export const setNotification = (content , timeout) => {
    const style = {
        'color': 'green',
        'background': 'lightgrey',
        'size': '20px',
        'border': 'solid',
        'radius': '5px',
        'padding': '10px',
        'margin': '10px',
      }
    
    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION_SET',
            data: {
                content,
                style
            }
        })
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            dispatch({
                type: 'NOTIFICATION_NULL'
            })
        }, timeout)
    }
}


export const setErrorMessage = (content , timeout) => {

    const style = {
        'color': 'red',
        'background': 'lightgrey',
        'size': '20px',
        'border': 'solid',
        'radius': '5px',
        'padding': '10px',
        'margin': '10px',
      }

    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION_ERROR',
            data:{
                content,
                style
            }
        })
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            dispatch({
                type: 'NOTIFICATION_NULL'
            })
        }, timeout)
    }
}

export default notificationReducer