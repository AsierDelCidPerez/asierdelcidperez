import axios from "axios"
import { useSelector } from "react-redux"
import uris from "../urls/uris"
import subscription from "./subscription"

const useUserService = () => {
    const token = useSelector(state => state?.user?.token)
   
    const register = ({name, apellidos, email, password}) => {
        const uri = `${uris.userControllerUri}/sign-in`
        const data = {name, apellidos, email, password}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }
    
    const changeEmail = email => {
        const uri = `${uris.userControllerUri}/edit/email`
        const data = {email}
        const config = {
            headers: {
                Subscription: subscription,
                Authorization: token
            }
        }
        return axios.put(uri, data, config)
    }

    const verifyEmailForChangingEmail = (tokenValidacion, vCodigo) => {
        const uri = `${uris.userControllerUri}/edit/email`
        const data = {tokenValidacion, vCodigo}
        const config = {
            headers: {
                Subscription: subscription,
                Authorization: token
            }
        }
        return axios.put(uri, data, config)
    }

    const login = ({email, password}) => {
        const uri = `${uris.userControllerUri}/login`
        const data = {email, password}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    const verificarCorreo = (tokenValidacion, vCodigo) => {
        const uri = `${uris.userControllerUri}/verify-sign-in`
        const data = {tokenValidacion, vCodigo}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    const verificarCorreoByRemember = (tokenValidacion, vCodigo) => {
        const uri = `${uris.userControllerUri}/verify-email`
        const data = {tokenValidacion, vCodigo}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    const cambiarContrasena = ({actual, nPass}) => {
        const uri = `${uris.userControllerUri}/changePassword`
        const data = {oldPassword: actual, newPassword: nPass}
        const config = {
            headers: {
                Authorization: token,
                Subscription: subscription
            }
        }
        return axios.put(uri, data, config)
    }

    const recordarContrasena = email => {
        const uri = `${uris.userControllerUri}/rememberPassword`
        const data = {email}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    const cambiarContrasenaByRemember = (tokenValidacion, nPass) => {
        const uri = `${uris.userControllerUri}/changePasswordByRemember`
        const data = {tokenValidacion, nPass}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.put(uri, data, config)
    }

    return {
        register, login, cambiarContrasena, verificarCorreo, recordarContrasena, verificarCorreoByRemember,
        cambiarContrasenaByRemember, changeEmail, verifyEmailForChangingEmail
    }
}

export default useUserService