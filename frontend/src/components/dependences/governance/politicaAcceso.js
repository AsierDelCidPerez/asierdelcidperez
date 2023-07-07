import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const usePolitica = () => {
    const navigation = useNavigate()
    const user = useSelector(state => state.user)
    const soloUsuarios =  redirectionIfFailed => {
        if(user===undefined)
        {
            navigation(redirectionIfFailed)
            return false
        }
        return true
    }

    return {
        soloUsuarios
    }
}