import logo from './logo.svg';
import './App.css';
import {Button, Card, CardContent, CardHeader, Typography} from '@mui/material'
import uris from './settings/uris';
import {useDispatch} from 'react-redux'
import { actOfSetAdmin } from './redux/reducers/admin';
import useAdminService from './services/admin';

const App = () => {
  const admin = localStorage.getItem('admin')

  const adminService = useAdminService()

  const urlParams = new URLSearchParams(window.location.search)

  const dispatch = useDispatch()
  if(urlParams.get('validated') === "true"){
    const recordar = urlParams.get('recordar')
    const data = {
      tokenAdmin: urlParams.get('token'),
      name: urlParams.get('name'),
      apellidos: urlParams.get('apellidos'),
      email: urlParams.get('email'),
      imageIcon: urlParams.get('imageIcon')
    }

    

    adminService.verifyRights(data.tokenAdmin).then(res => {
      console.log(res.data)
      data.rights = res.data.rights
      data.tokenAdmin = res.data.tokenAdmin
      console.log(data)
      dispatch(actOfSetAdmin(data))
      if(recordar){
        localStorage.setItem('adminToken', data.tokenAdmin)
      }
    })

  }


  const authAdmin = () => {
    const returnUrl = window.location.href
    const url = `${uris.login}?auth=true&return=${returnUrl}`
    window.location.href = url
  }

  const getFrontEnd = () => {
    if(!admin){
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card sx={{ maxWidth: 345 }}>        
            <CardContent>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src="/logoColor.png" width="18%"/>
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
      )
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
