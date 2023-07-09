import axios from "axios"
import uris from "../../../urls/uris"

export const revisarCredencialesGuardadas = () => {
    if(localStorage.getItem('userToken')){
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Subscription: "L8jlJms7-jO7EE1aO-XnADT7om-MYk2ojB6-MS7bwhs2"
            }
        }
        return axios.post(`${uris.tokenControllerApi}/verify-token`, {token}, config)
    }
    return null
}