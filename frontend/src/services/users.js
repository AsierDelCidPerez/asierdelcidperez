import axios from "axios"
import { useSelector } from "react-redux"

const useUserService = uri => {

    const token = useSelector(state => state?.user?.token)

    const register = ({name, apellidos, email, password}) => {
        const data = {name, apellidos, email, password}
        const config = {
            headers: {
                Subscription: 'L8jlJms7-jO7EE1aO-XnADT7om-MYk2ojB6-MS7bwhs2'
            }
        }
        return axios.post(uri, data, config)
    }

    const login = ({email, password}) => {
        const data = {email, password}
        const config = {
            headers: {
                Subscription: 'L8jlJms7-jO7EE1aO-XnADT7om-MYk2ojB6-MS7bwhs2'
            }
        }
        return axios.post(uri, data, config)
    }

    const cambiarContrasena = ({actual, nPass}) => {
        const data = {oldPassword: actual, newPassword: nPass}
        const config = {
            headers: {
                Authorization: token,
                Subscription: 'L8jlJms7-jO7EE1aO-XnADT7om-MYk2ojB6-MS7bwhs2'
            }
        }
        return axios.put(uri, data, config)
    }

    return {
        register, login, cambiarContrasena
    }
}

export default useUserService