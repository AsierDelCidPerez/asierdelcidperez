

const userReducer = (state=null, action) => {

    /*
    _______________________________
    Estructura del usuario  _______
    _______________________________
    {
        nombre: (...)
        apellidos: (...)
        email: (...)
        token: (...)
    }
    */

    switch(action.type){
        case "SET_USR": {
            return action.user
        }
        case "EDIT_USR": {
            /*
            action = {
                toEdit: "email" / "apellidos" / "nombre" / "token"
                newValue: (...)
            }
            */
            const newState = {
                ...state,
                [action.toEdit]: action.newValue
            }
            return newState
        }
        case "UPDATE_USR": {
            const newState = {
                ...state,
                ...action.user
            }
            return newState
        }
        case "LOG_OUT": {
            return null
        }
        default: {
            return state
        }
    }
}

export const actOfSetUser = (name, apellidos, email, imageIcon, rank,  blocked, token) => {
    return {
        type: "SET_USR",
        user: {
            name, apellidos, email, imageIcon, rank, blocked, token
        }
    }
}

export const actOfUpdateUser = ({name=null, apellidos=null, email=null, imageIcon=null, rank=null,  blocked=null, token=null}) => {
    const dataUpdate = {}
    if(name !== null) dataUpdate.name = name
    if(apellidos !== null) dataUpdate.apellidos = apellidos
    if(email !== null) dataUpdate.email = email
    if(imageIcon !== null) dataUpdate.imageIcon = imageIcon
    if(rank !== null) dataUpdate.rank = rank
    if(blocked !== null) dataUpdate.blocked = blocked
    if(token !== null) dataUpdate.token = token

    return {
        type: "UPDATE_USR",
        user: dataUpdate
    }
}
export const actOfEditUser = (toEdit, newValue) => {
    return {
        type: "EDIT_USR",
        toEdit,
        newValue
    }
}

export const actOfLogOut = () => {
    return {
        type: "LOG_OUT"
    }
}


export default userReducer