import uris from "../settings/uris"
import axios from 'axios'
import subscription from '../settings/subscription'

const useAdminService = () => {
    const uri = uris.admin

    const verifyRights = adminToken => {
        const headers = {
            headers: {
                Subscription: subscription
            }
        }
        return axios.post(`${uri}/verify-rights`, {adminToken}, headers)
    }


    return {
        verifyRights
    }

}

export default useAdminService