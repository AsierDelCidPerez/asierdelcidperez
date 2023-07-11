import axios from "axios"
import uris from "../urls/uris"
import subscription from "./subscription"

export const verifyToken = token => {
    const data = {token}
    const config = {
        headers: {
            Subscription: subscription
        }
    }

    return axios.post(`${uris.tokenControllerApi}/verify-token`, data, config)
}