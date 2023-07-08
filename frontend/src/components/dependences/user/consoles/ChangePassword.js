
import { useSelector } from "react-redux"
import CardIcon from "../../others/CardIcon"
import { Card, TextField, Box, Button } from "@mui/material"
import { useNotification } from "../../others/Notification"
import useAlert from "../../others/MyAlert"
import { validarContrasena } from "../../auth/login/validadores"
import useUserService from "../../../../services/users"
import uris from "../../../../urls/uris"

const ChangePassword = () => {

    // const user = useSelector(state => state.user)
    const {setAlert, getAlert} = useAlert()
    const userService = useUserService(`${uris.userControllerUri}/changePassword`)

    const enviarCambiarPassword = async (actual, nPass) => {
        try{
            await userService.cambiarContrasena({actual, nPass})
            setNotification({notification: "Se ha modificado exitósamente la contraseña", isSuccess: true})
        }catch(e){
            setNotification({notification: e.response.data.error, isSuccess: false})
        }
    }

    const cambiarContrasena = async event => {
        event.preventDefault()
        const actual = event.target.actual_password.value
        const nPass = event.target.n_contrasena.value
        const vNPass = event.target.vn_contrasena.value
        if(nPass === vNPass){
            if(validarContrasena(nPass)){
                // const changePassowrdInfo = {actual, nPass} 
                setAlert({
                    open: true,
                    isConfirmAlert: true,
                    onConfirm: () => enviarCambiarPassword(actual, nPass),
                    title: "¿Cambiar contraseña?",
                    text: "Si cambias la contraseña no podrás volver a iniciar sesión con tu cuenta actual, es decir, deberás hacerlo con la nueva contraseña que has elegido ahora.",
                    type: "danger"
                })

            }else{
                setNotification({notification: 'La contraseña no cumple los estándares de seguridad', isSuccess: false})
            }
        }else{
            setNotification({notification: 'Las contraseñas no coinciden', isSuccess: false})
        }
    }

    const [getNotification, setNotification] = useNotification()

    return (
        <Card sx={{padding: "5%"}}>
            {getAlert()}
            {getNotification()}
            <br/>
            <Box component="form" onSubmit={cambiarContrasena}>
                <TextField fullWidth variant="outlined" type="password" name="actual_password" label="Contraseña actual"/><br/><br/>
                <TextField fullWidth variant="outlined" type="password" name="n_contrasena" label="Nueva contraseña"/><br/><br/>
                <TextField fullWidth variant="outlined" type="password" name="vn_contrasena" label="Verificar nueva contraseña"/><br/><br/>
                <div style={{textAlign: 'center'}}>
                <Button variant="contained" type="submit">Cambiar contraseña</Button>
                </div>
            </Box>
        </Card>
    )
    
}

export default ChangePassword