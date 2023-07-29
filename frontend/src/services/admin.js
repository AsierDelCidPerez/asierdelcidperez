const { default: axios } = require("axios")
const { useSelector } = require("react-redux")
const { default: uris } = require("../urls/uris")
const { default: subscription } = require("./subscription")


const useAdminService = () => {
    const token = useSelector(state => state?.user?.token)


    const verifyRights = () => {
        const config = {
            headers: {
                Authorization: token,
                Subscription: subscription
            }
        }
        return axios.post(`${uris.adminControllerApi}/verify-rights`, {}, config)
    }


    return {
        verifyRights
    }
}


export default useAdminService