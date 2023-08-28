
const adminReducer = (state=null,action) => {
    switch(action.type){
        case "SET_ADMIN": 
            return action.admin
        default:
            return state
    }
}

export const actOfSetAdmin = ({tokenAdmin, name, apellidos, email, imageIcon, rights, rank}) => {
    return {
        type: "SET_ADMIN",
        admin: {
            tokenAdmin,
            name,
            apellidos,
            email,
            imageIcon,
            rights,
            rank
        }
    }
}

export const actOfLogOut = () => {
    return {
        type: "SET_ADMIN",
        admin: null
    }
}


export default adminReducer

