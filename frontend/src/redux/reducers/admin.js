

const adminReducer = (state=null,action) => {
    switch(action.type){
        case "SET_ADMIN": 
            return action.admin
        default:
            return state
    }
}

export const actOfSetAdmin = (tokenAdmin, rights) => {
    return {
        tokenAdmin,
        rights
    }
}


export default adminReducer