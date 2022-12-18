import axios from "axios"
import uris from "../../../urls/uris"

export const revisarCredencialesGuardadas = () => {
    if(localStorage.getItem('userToken')){
        const token = localStorage.getItem('userToken')
        return axios.post(`${uris.tokenControllerApi}/verify-token`, {token})
    }
    return null
}