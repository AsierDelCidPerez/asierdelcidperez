import {Button, Card, CardContent, Typography} from '@mui/material'

import { authAdminUri } from '../../../utils/functions/auth/admin'
import { useEffect } from 'react'

const CardAuth = ({getNotification}) => {

    return (
        <div style={{paddingLeft: '2.5%',paddingRight: '2.5%', display: 'flex', gap: '3vh', flexDirection: 'column', justifyContent: 'center'}}>
          {getNotification()}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card sx={{ maxWidth: 345 }}>        
            <CardContent>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src="/admin.png" width="28%"/>
              </div>
              <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="div"> AdminX </Typography>
              <div>
              <p style={{textAlign: 'center'}}>Este servicio es un servicio de interfaz gráfica provisto por AsierX API Services. Además de tener el servicio el servicio <strong>admin API</strong> deberás tener el servicio <strong>interfaceX</strong> para usarlo.</p>
              <p style={{textAlign: 'center'}}>Para acceder deberás tener una suscripción, y las credenciales (correo y contraseña) de una cuenta con derechos de administración.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <Button onClick={authAdminUri} variant='contained'>Acceder con AsierX ID</Button>
                </div>
            </CardContent>
          </Card>
        </div>
        </div>
      )
}


export default CardAuth