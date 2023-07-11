
import { Box, TextField, Button } from "@mui/material"
import { validarEmail} from "./validadores"
import useUserService from "../../../../../services/users"

const RememberPassword = ({getNotification, setNotification, setRecordarContra}) => {
    const user = useUserService()
    const recordarPassword = async event => {
        event.preventDefault()
        const email = event.target.email.value
        if(validarEmail(email)){
            try{
                const res = await user.recordarContrasena(email)
                if(res.data.verify){
                    setRecordarContra({
                        value: 2,
                        email,
                        token: res.data.token
                    })
                }
            }catch(e){
                setNotification({
                    notification: e.response.data.error,
                    isSuccess: false
                })
            }
        }else{
            setNotification({
                notification: 'El email introducido es inválido.',
                isSuccess: false
            })
        }
    }

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src="/llave_password.png" width="18%"/>
        </div>
        <br/>

        <Box component="form" onSubmit={recordarPassword} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
        {getNotification() === null ? <></> : getNotification()}
        <h1>Recordar contraseña</h1>
            <p>Para recordar tu contraseña es necesario que indiques tu email a continuación</p>
            <TextField fullwidth type="email" name="email" variant="outlined" label="Email"/><br/>
            <Button fullwidth variant="contained" type="submit">Validar Correo</Button>
        </Box>
        </>
    )
}

export default RememberPassword