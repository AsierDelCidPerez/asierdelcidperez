

const userReducer = (state=null, action) => {

    /*
    _______________________________
    Estructura del usuario  _______
    _______________________________
    {
        nombre: (...)
        apellidos: (...)
        email: (...)
    }
    */

    switch(action.type){
        case "SET_USR": {
            return action.user
        }
        case "EDIT_USR": {
            /*
            action = {
                toEdit: "email" / "apellidos" / "nombre"
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

export const actOfSetUser = (name, apellidos, email) => {
    return {
        type: "SET_USR",
        user: {
            name, apellidos, email
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


export default userReducer