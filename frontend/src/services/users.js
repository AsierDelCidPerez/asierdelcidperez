import axios from "axios"
import { useSelector } from "react-redux"
import uris from "../urls/uris"
import subscription from "./subscription"

const useUserService = () => {
    const token = useSelector(state => state?.user?.token)
   
    const register = ({name, apellidos, email, password, sub=null}) => {
        const uri = `${uris.userControllerUri}/sign-in`
        const data = {name, apellidos, email, password}
        const config = {
            headers: {
                Subscription: sub===null || sub === "null"?subscription:sub
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

    const changeDataUser = data => {
        const uri = `${uris.userControllerUri}/edit`
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

    const login = ({email, password}, sub=null) => {
        const uri = `${uris.userControllerUri}/login`
        const data = {email, password}
        const config = {
            headers: {
                Subscription: sub===null || sub === "null"?subscription:sub
            }
        }
        return axios.post(uri, data, config)
    }

    const verificarCorreo = (tokenValidacion, vCodigo, sub=null) => {
        const uri = `${uris.userControllerUri}/verify-sign-in`
        const data = {tokenValidacion, vCodigo}
        const config = {
            headers: {
                Subscription: sub===null || sub === "null" ?subscription:sub
            }
        }
        return axios.post(uri, data, config)
    }

    const verificarCorreoByRemember = (tokenValidacion, vCodigo, sub=null) => {
        const uri = `${uris.userControllerUri}/verify-email`
        const data = {tokenValidacion, vCodigo}
        const config = {
            headers: {
                Subscription: sub===null || sub === "null"?subscription:sub
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

    const recordarContrasena = (email, sub) => {
        const uri = `${uris.userControllerUri}/rememberPassword`
        const data = {email}
        const config = {
            headers: {
                Subscription: sub===null ? subscription : sub
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

    const verificarLogin = (email, password, tokenAuth) => {
        const uri = `${uris.userControllerUri}/auth/login`
        const data = {email, password, tokenAuth}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    const loginGeneral = (email, password, tenant) => {
        const uri = `${uris.userControllerUri}/auth/static-login`
        const data = {email, password, subscription:tenant}
        const config = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(uri, data, config)
    }

    return {
        register, login, cambiarContrasena, verificarCorreo, recordarContrasena, verificarCorreoByRemember,
        cambiarContrasenaByRemember, changeEmail, verifyEmailForChangingEmail, changeDataUser, verificarLogin,
        loginGeneral
    }
}

export default useUserService