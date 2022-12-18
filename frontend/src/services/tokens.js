import axios from "axios"
import uris from "../urls/uris"

const uri = uris.tokenControllerApi
export const verifyToken = token => {
    const data = {token}
    return axios.post(`${uri}/verify-token`, data)
}