import { useEffect } from "react"
import { actOfSetAdmin } from "../../redux/reducers/admin"
import { getUriParam } from "../../utils/uri"
import useAdminService from "../../services/admin"
import { useNotification } from "../dependences/Notification"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CardAuth from "../dependences/auth/CardAuth"

const Auth = () => {
    const admin = localStorage.getItem('adminToken')
  
    const myAdmin = useSelector(state => state.admin)
  
    const dispatch = useDispatch()
  
    const navigate = useNavigate()

    const [getNotification, setNotification] = useNotification()
  
    const adminService = useAdminService()
  

    useEffect(() => {   
      if(myAdmin !== null) navigate('/dashboard')
     
      if(admin && myAdmin === null){
        adminService.verifyRightsByToken(admin, ["admin", "interfacex"]).then(res => {
            // console.log(res.data)
          dispatch(actOfSetAdmin(res.data))
          navigate('/dashboard')
        }).catch(e => {
          setNotification({
            notification: e.response.data.error,
            isSuccess: false
          })
        })
      }else if(!admin){
        if(getUriParam('validated') === "true"){
          const recordar = getUriParam('recordar')
          // console.log(recordar)
          const data = {
            tokenAdmin: getUriParam('token'),
            name: getUriParam('name'),
            apellidos: getUriParam('apellidos'),
            email: getUriParam('email'),
            imageIcon: getUriParam('imageIcon')
          }
      
          const services = [
            "interfacex", "admin"
          ]
      
          adminService.verifyRights(data.tokenAdmin, services).then(res => {
            dispatch(actOfSetAdmin(res.data))
            if(recordar === "true"){
              localStorage.setItem('adminToken', data.tokenAdmin)
            }
            navigate('/dashboard')

          }).catch(e => {
            setNotification({notification: e?.response?.data?.error, isSuccess: false})
            console.error(e)
          })
        }
      }
    }, [])

    return (
        <CardAuth getNotification={getNotification}/>
    )
}


export default Auth