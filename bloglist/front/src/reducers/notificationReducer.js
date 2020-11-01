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
        'color': 'green'
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
        'color': 'red'
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



export const setNotificationNull = () => {
    return async dispatch => {
        if(timeoutId){
            clearTimeout(timeoutId)
            await dispatch({
                type:'NOTIFICATION_NULL'
            })
        }else{
            dispatch({
                type:"NOTIFICATION_NULL"
            })
        }
    }
}
export default notificationReducer