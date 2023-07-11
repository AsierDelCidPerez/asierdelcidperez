
import { TextField, Button, Box } from "@mui/material"

const VerifyPage = ({email,getNotification=null, onFinish=()=>{}}) => {
    
    const validarCorreo = async event => {
        event.preventDefault()
        await onFinish(event.target.vCodigo.value)
    }
    
    return (
        <Box component="form" onSubmit={validarCorreo} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
        {getNotification() === null ? <></> : getNotification()}
        <h1>Verificar correo</h1>
            <p>Te hemos mandado mandado un código numérico de seis dígitos al correo: {email}. Escriba el código que le hemos especificado a continuación. Tras 30 minutos el código deja de ser válido.</p>
            <TextField fullwidth type="password" name="vCodigo" variant="outlined" label="Código de verificación"/><br/>
            <Button fullwidth variant="contained" type="submit">Validar Correo</Button>
        </Box>
    )
} 

export default VerifyPage