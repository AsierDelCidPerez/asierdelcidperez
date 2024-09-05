
import subscription from "../../../settings/subscription"
import uris from "../../../settings/uris"


export const authAdminUri = () => {
    const returnUrl = window.location.href
    const url = `${uris.login}?auth=true&return=${returnUrl}`
    window.location.href = url
}