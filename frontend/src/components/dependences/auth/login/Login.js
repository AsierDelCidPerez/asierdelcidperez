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
import subscription from "../../../../services/subscription"

const LoginForm = ({toggleLikeRegistering, notification, sub=null, onlyLogin, tokenAuth=null, returnUrl=null}) => {
  sub = onlyLogin ? sub: subscription
  console.log(sub)
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
    const recordar = event.target.recordarCredenciales.value
    try{
    if(onlyLogin){
       const logData = {email: event.target.email.value, password: event.target.password.value, tenant: !event.target.tenant.value  ? subscription : event.target.tenant.value}
        if(tokenAuth === "null"){
          const res = await user.loginGeneral(logData.email, logData.password, logData.tenant)
            let argumentos = ""
            for(let i in res.data){
              argumentos+= `&${i}=${res.data[i]}`
            }
            window.location.href = `${returnUrl}?validated=true&date=${new Date()}${argumentos}`
        }else{
          await user.verificarLogin(logData.email, logData.password, tokenAuth)
          window.location.href = `${returnUrl}?validated=true&recordar=${recordarContra ? "true": "false"}&date=${new Date()}&token=${tokenAuth}`
          return
        }
        await user.verificarLogin(logData.email, logData.password, tokenAuth)
        window.location.href = `${returnUrl}?validated=true&recordar=${recordarContra ? "true": "false"}&date=${new Date()}&token=${tokenAuth}`
        return
    }else{
      const logData = {email: event.target.email.value, password: event.target.password.value}
      const res = await user.login(logData)
      localStorage.removeItem('userToken')
      if(recordarContra) localStorage.setItem('userToken', res.data.token)
      dispatch(actOfSetUser(res.data.name, res.data.apellidos, res.data.email, res.data.imageIcon,res.data.rank, res.data.blocked, res.data.token))
    }
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
        const res = await user.verificarCorreoByRemember(recordarContra.token, vCodigo, sub)
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
            {sub === "null" && returnUrl !== null ? (<TextField fullwidth type="text" variant="outlined" name="tenant" label="Suscripción"/>): (<></>)}
            <TextField fullwidth variant="outlined" autoComplete='off' name="email" label="Email"/><br/>
            <TextField fullwidth type="password" variant="outlined" name="password" label="Contraseña"/>
            <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', textAlign: 'right'}}>
            <FormControlLabel name="recordarCredenciales" control={<Checkbox />} label="Recordar credenciales" />
              {sub !== null ? (<Link to="#" style={{cursor: 'pointer'}} onClick={() => setRecordarContra({...recordarContra, value: 1})}>¿Has olvidado la contraseña?</Link>) : (<></>)}
              {!onlyLogin ? (<Link to="#" onClick={toggleLikeRegistering} style={{cursor: 'pointer'}}>¿No tienes cuenta? Registrarse</Link>) : (<></>)}
            </div>
            <Button variant="contained" type="submit">Acceder</Button>
        </Box>
      </>
      )
    case 1:
      return (
        <>
          <RememberPassword sub={sub} setRecordarContra={setRecordarContra} setNotification={setNotification} getNotification={getNotification}/>
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