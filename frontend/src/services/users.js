import axios from "axios"
import { useSelector } from "react-redux"

const useUserService = uri => {

    const token = useSelector(state => state?.user?.token)

    const register = ({name, apellidos, email, password}) => {
        const data = {name, apellidos, email, password}
        return axios.post(uri, data)
    }

    const login = ({email, password}) => {
        const data = {email, password}
        return axios.post(uri, data)
    }

    const cambiarContrasena = ({actual, nPass}) => {
        const data = {oldPassword: actual, newPassword: nPass}
        const config = {
            headers: {
                Authorization: token
            }
        }
        return axios.put(uri, data, config)
    }

    return {
        register, login, cambiarContrasena
    }
}

export default useUserService