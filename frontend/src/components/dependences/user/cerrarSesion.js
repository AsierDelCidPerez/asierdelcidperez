import { useDispatch } from "react-redux"
import { actOfLogOut } from "../../../redux/reducers/user"


export const useToCloseSesion = () => {
    const dispatch = useDispatch()
    dispatch(actOfLogOut())
    localStorage.removeItem('userToken')
}