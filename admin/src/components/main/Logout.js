import { useDispatch } from "react-redux"
import { actOfLogOut } from "../../redux/reducers/admin"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(actOfLogOut())
        localStorage.removeItem('adminToken')
        navigate('/')
    }, [])


    return (
        <div>Espere... Se está cerrando sesión</div>
    )

}

export default Logout