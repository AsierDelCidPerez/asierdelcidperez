import axios from "axios"

const useUserService = uri => {
    const register = ({name, apellidos, email, password}) => {
        const data = {name, apellidos, email, password}
        return axios.post(uri, data)
    }

    const login = ({email, password}) => {
        const data = {email, password}
        return axios.post(uri, data)
    }

    return {
        register, login
    }
}

export default useUserService