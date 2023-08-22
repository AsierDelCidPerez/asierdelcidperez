import uris from "../settings/uris"
import axios from 'axios'
import subscription from '../settings/subscription'

const useAdminService = () => {
    const uri = uris.admin

    const verifyRights = (adminToken, services) => axios.post(`${uri}/verify-rights`, {adminToken, services})

    const verifyRightsByToken = (rightsToken, services) => axios.post(`${uri}/verify-rights/token`, {rightsToken, services})

    return {
        verifyRights, verifyRightsByToken
    }

}

export default useAdminService