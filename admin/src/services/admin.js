import uris from "../settings/uris"
import axios from 'axios'
import subscription from '../settings/subscription'
import { useSelector } from "react-redux"

const useAdminService = () => {
    const uri = uris.admin

    const admin = useSelector(state => state?.admin)
    const adminToken = admin?.tokenAdmin
    const verifyRights = (adminToken, services) => axios.post(`${uri}/verify-rights`, {adminToken, services})

    const verifyRightsByToken = (rightsToken, services) => axios.post(`${uri}/verify-rights/token`, {rightsToken, services})

    const adminConsole = {
        listUsers: services => {
            const cmdlet = "admin|listUsers"
            return axios.post(`${uri}/admin-console`, {adminToken, cmdlet,services, params: []})
        },
        readUser: (id, services) => {
            const cmdlet = "admin|readUser"
            return axios.post(`${uri}/admin-console`, {adminToken, cmdlet, services, params: [id]})
        }
    }

    return {
        verifyRights, verifyRightsByToken, adminConsole
    }

}

export default useAdminService