

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
        case "LOG_OUT": {
            return null
        }
        default: {
            return state
        }
    }
}

export const actOfSetUser = (name, apellidos, email, imageIcon, token) => {
    return {
        type: "SET_USR",
        user: {
            name, apellidos, email, token
        }
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