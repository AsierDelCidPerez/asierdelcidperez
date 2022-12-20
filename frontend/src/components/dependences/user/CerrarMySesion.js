import { useNavigate } from "react-router-dom"
import { useToCloseSesion } from "./cerrarSesion"


const CerrarMySesion = () => {
    const navigate = useNavigate()
    useToCloseSesion()
    navigate('/')
}

export default CerrarMySesion