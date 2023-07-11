import { TextField, Link, Button, Box, FormControlLabel, Checkbox } from "@mui/material"
import useUserService from "../../../../services/users"
import uris from "../../../../urls/uris"
import { useNotification } from "../../others/Notification"
import {useDispatch} from 'react-redux'
import { actOfSetUser } from "../../../../redux/reducers/user"
import { useState } from "react"
import RememberPassword from "./dependences/RememberPassword"
import VerifyPage from "./dependences/VerifyEmail"
import { validacionCodigoSexaNumerico } from "./dependences/validadores"
import ChangePassword from "./dependences/ChangePassword"

const LoginForm = ({toggleLikeRegistering, notification}) => {
  const [getNotification, setNotification] = notification
  const user = useUserService()
  const [recordarContra, setRecordarContra] = useState({
    value: 0,
    email: "",
    token: ""
  })

  const dispatch = useDispatch()
  const logIn = async event => {
    event.preventDefault()
    const logData = {email: event.target.email.value, password: event.target.password.value}
    try {
      const res = await user.login(logData)
      localStorage.removeItem('userToken')
      localStorage.setItem('userToken', res.data.token)
      dispatch(actOfSetUser(res.data.name, res.data.apellidos, res.data.email, res.data.token))
    }catch(err) {
      setNotification({
          notification: err.response.data.error,
          isSuccess: false
      })
    }
  }

  const validarMyEmail = async vCodigo => {
    if(validacionCodigoSexaNumerico(vCodigo)){
      try{
        const res = await user.verificarCorreoByRemember(recordarContra.token, vCodigo)
        if(res.data.verified){
          setRecordarContra({
            email: res.data.email,
            value: 3,
            token: res.data.tokenValidacion
          })
        }
      }catch(e){
        if(e.response.data.verify){
          setRecordarContra({
            ...recordarContra,
            token: e.response.data.token
          })
        }
        setNotification({
          notification: e.response.data.error,
          isSuccess: false
        })
      }
    }else{
      setNotification({
        notification: 'El código no es correcto',
        isSuccess: false
      })
    }
  } 

  // Se podría reservar para recordarContra.value = 3, un proceso de autenticación mfa

  const getLogin = () => {
    switch(recordarContra.value){
      case 0:
      return (
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src="/logoColor.png" width="18%"/>
        </div>
        <Box component="form" onSubmit={logIn} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
          {getNotification !== null ? getNotification() : null}
          <h1>Acceder</h1>          
            <TextField fullwidth variant="outlined" autoComplete='off' name="email" label="Email"/><br/>
            <TextField fullwidth type="password" variant="outlined" name="password" label="Contraseña"/>
            <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', textAlign: 'right'}}>
            <FormControlLabel name="recordarCredenciales" control={<Checkbox />} label="Recordar credenciales" />
              <Link to="#" style={{cursor: 'pointer'}} onClick={() => setRecordarContra({...recordarContra, value: 1})}>¿Has olvidado la contraseña?</Link>
              <Link to="#" onClick={toggleLikeRegistering} style={{cursor: 'pointer'}}>¿No tienes cuenta? Registrarse</Link>
            </div>
            <Button variant="contained" type="submit">Acceder</Button>
        </Box>
      </>
      )
    case 1:
      return (
        <>
          <RememberPassword setRecordarContra={setRecordarContra} setNotification={setNotification} getNotification={getNotification}/>
          </>
      )
    case 2:
      return (
        <>
          <VerifyPage email={recordarContra.email} onFinish={validarMyEmail} getNotification={getNotification}/>
        </>
      )
    case 3:
      return (
        <>
          <ChangePassword setRecordarContra={setRecordarContra} setNotification={setNotification} tokenValidacion={recordarContra.token} getNotification={getNotification}/>
        </>
      )

    default: 
      return (<></>)
  }
}

  return(
    <>
      {getLogin()}
    </>
  )
}

export default LoginForm