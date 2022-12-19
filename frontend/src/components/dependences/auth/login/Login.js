import { TextField, Link, Button, Box, FormControlLabel, Checkbox } from "@mui/material"
import useUserService from "../../../../services/users"
import uris from "../../../../urls/uris"
import { useNotification } from "../../others/Notification"
import {useDispatch} from 'react-redux'
import { actOfSetUser } from "../../../../redux/reducers/user"

const LoginForm = ({toggleLikeRegistering, notification}) => {
  const [getNotification, setNotification] = notification
  const logInResource = useUserService(`${uris.userControllerUri}/login`)
  const dispatch = useDispatch()
  const logIn = async event => {
    event.preventDefault()
    const logData = {email: event.target.email.value, password: event.target.password.value}
    try {
      const res = await logInResource.login(logData)
      localStorage.removeItem('userToken')
      localStorage.setItem('userToken', res.data.token)
      dispatch(actOfSetUser(res.data.name, res.data.apellidos, res.data.email, res.data.token))
    }catch(err) {
      setNotification({
          notification: err.request.response,
          isSuccess: false
      })
    }
  }


  return(
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
            <Link to="#">¿Has olvidado la contraseña?</Link>
            <Link to="#" onClick={toggleLikeRegistering} style={{cursor: 'pointer'}}>¿No tienes cuenta? Registrarse</Link>
          </div>
          <Button fullwidth variant="contained" type="submit">Acceder</Button>
      </Box>
    </>
  )
}

export default LoginForm