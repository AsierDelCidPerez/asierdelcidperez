import { Box, TextField, Button, recomposeColor } from "@mui/material"
import { validarContrasena } from "./validadores"
import useUserService from "../../../../../services/users"


const ChangePassword = ({tokenValidacion, setNotification, setRecordarContra}) => {
    const user = useUserService()
    const cambiarContrasena = async e => {
        e.preventDefault()
        const nContra = e.target.n_contrasena.value
        const vNContra = e.target.vn_contrasena.value
        if(nContra === vNContra){
            if(validarContrasena(nContra)){
                try {
                    const res = await user.cambiarContrasenaByRemember(tokenValidacion, nContra)
                    if(res.data.changePassword){
                        setRecordarContra({
                            value: 0,
                            email: "",
                            token: ""
                        })
                        setNotification({
                            notification: e.response.data.error,
                            isSuccess: false
                        })
                    }
                } catch (e) {
                    setNotification({
                        notification: e.response.data.error,
                        isSuccess: false
                    })
                }
            }else{
                setNotification({
                    notification: 'La contraseña no se ajusta a los estándares de seguridad.',
                    isSuccess: false
                })
            }
        }else{
            setNotification({
                notification: 'Las contraseñas no coinciden.',
                isSuccess: false
            })
        }
    }

    return (
        <Box component="form" onSubmit={cambiarContrasena}>
            <div style={{textAlign: 'center'}}><h1>Cambiar contraseña</h1></div>
            <TextField fullWidth variant="outlined" type="password" name="n_contrasena" label="Nueva contraseña"/><br/><br/>
            <TextField fullWidth variant="outlined" type="password" name="vn_contrasena" label="Verificar nueva contraseña"/><br/><br/>
            <div style={{textAlign: 'center'}}>
            <Button variant="contained" type="submit">Cambiar contraseña</Button>
            </div>
        </Box>
    )
}

export default ChangePassword