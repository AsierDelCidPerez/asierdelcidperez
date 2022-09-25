

const notificationReducer = (state={msg: null, isSuccess: true}, action) => {
    switch(action.type){
        case "SET_MSG": {
            return action.notification
        }
        default: {
            return state
        }
    }
}

export const actOfSetNotification = (msg, isSuccess) => {
    return {
        type: "SET_MSG",
        notification: {msg, isSuccess}
    }
}


export default notificationReducer