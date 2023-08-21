import logo from './logo.svg';
import './App.css';
import {Button, Card, CardContent, CardHeader, Typography} from '@mui/material'
import uris from './settings/uris';
import {useDispatch, useSelector} from 'react-redux'
import { actOfSetAdmin } from './redux/reducers/admin';
import useAdminService from './services/admin';
import { useNotification } from './components/dependences/Notification';
import {useEffect} from 'react'

const App = () => {
  const admin = localStorage.getItem('admin')
  const myAdmin = useSelector(state => state.admin)

  const dispatch = useDispatch()

  const [getNotification, setNotification] = useNotification()

  const adminService = useAdminService()

  const urlParams = new URLSearchParams(window.location.search)


  useEffect(() => {
    if(urlParams.get('validated') === "true"){
      const recordar = urlParams.get('recordar')
      console.log(recordar)
      const data = {
        tokenAdmin: urlParams.get('token'),
        name: urlParams.get('name'),
        apellidos: urlParams.get('apellidos'),
        email: urlParams.get('email'),
        imageIcon: urlParams.get('imageIcon')
      }
  
      const services = [
        "interfacex", "admin"
      ]
  
      adminService.verifyRights(data.tokenAdmin, services).then(res => {
        // console.log(res.data)
        data.rights = res.data.rights
        data.tokenAdmin = res.data.tokenAdmin
        // console.log(data)
        dispatch(actOfSetAdmin(data))
        if(recordar === "true"){
          localStorage.setItem('adminToken', data.tokenAdmin)
        }
        
        window.history.pushState(null, "", "/")

      }).catch(e => {
        setNotification({notification: e?.response?.data?.error, isSuccess: false})
      })



    }

  }, [])

  


  const authAdmin = () => {
    const returnUrl = window.location.href
    const url = `${uris.login}?auth=true&return=${returnUrl}`
    window.location.href = url
  }

  const getFrontEnd = () => {
    if(myAdmin === null){
      return (
        <div style={{paddingLeft: '2.5%',paddingRight: '2.5%', display: 'flex', gap: '3vh', flexDirection: 'column', justifyContent: 'center'}}>
          {getNotification()}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card sx={{ maxWidth: 345 }}>        
            <CardContent>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src="/logoColor.png" width="28%"/>
              </div>
              <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="div"> AdminX </Typography>
              <div>
              <p style={{textAlign: 'center'}}>Este servicio es un servicio de interfaz gráfica provisto por AsierX API Services. Además de tener el servicio el servicio <strong>admin API</strong> deberás tener el servicio <strong>interfaceX</strong> para usarlo.</p>
              <p style={{textAlign: 'center'}}>Para acceder deberás tener una suscripción, y las credenciales (correo y contraseña) de una cuenta con derechos de administración.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <Button onClick={authAdmin} variant='contained'>Acceder con AsierX ID</Button>
                </div>
            </CardContent>
          </Card>
        </div>
        </div>
      )
    }else{

    }
  }

  return (
    <div>
      <br/>
      {getFrontEnd()}
    </div>
  )

}

export default App;
