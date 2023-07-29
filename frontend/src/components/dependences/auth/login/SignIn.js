import { TextField, Link, Button, Box, Checkbox, FormControlLabel } from "@mui/material"
import useUserService from "../../../../services/users"
import uris from "../../../../urls/uris"
import { useNotification } from "../../others/Notification"
import { validarContrasena, validarTexto, validarEmail} from "./dependences/validadores"
import useAlert from "../../others/MyAlert"
import { useState } from "react"
import VerifyPage from "./dependences/VerifyEmail"

const SignIn = ({toggleLikeRegistering, notification, sub=null}) => {
    const [getNotification, setNotification] = notification
    const userService = useUserService()
    // const {setAlert, getAlert} = useAlert()
    const [verifying, setVerifying] = useState({
        value: false,
        correo: "",
        token: ""
    })


    const registrarse = async event => {
        event.preventDefault()
        const form = event.target
        if(validar(form)){
            await completarRegistro()
        }
    }

    const completarRegistro = async ({nombre, apellidos, email, contrasena}) => {
        // console.log(email)
        try{
            const res = await userService.register({name: nombre, apellidos, email, password: contrasena, sub})
            if(res.data.verify){
                setVerifying({
                    value: true,
                    token: res.data.tokenValidacion,
                    correo: email
                })
                
                /*
                setAlert({
                    open: true,
                    isConfirmAlert: false,
                    onConfirm: () => {},
                    title: "Verificación de correo",
                    text: `Acaba de recibir un correo en la dirección ${email}. Especifique el código que haya recibido`,
                    type: "nothing",
                    needsPrompt: {
                        value: true,
                        data: {
                            placeholder: "Código de verificación",
                            onSubmit: async prompt => {
                                const token = res.data.tokenValidacion
                                console.log("Verificacion | " + token + " | " + prompt)
                                const res2 =  await userService.verificarCorreo({token, prompt})
                                if(res2.data.verified === true && res2.status === 200){
                                    setNotification({
                                        notification: 'Se ha registrado exitósamente',
                                        isSuccess: true
                                    })
                                }
                            }
                        }
                    }
                })
                */
            }else{
                setNotification({
                    notification: 'Se ha registrado exitósamente',
                    isSuccess: true
                })
            }
        }catch(err){
            console.error(err)
            setNotification({
                notification: err.response.data.error,
                isSuccess: false
            })
        }
    }

    const validar = form => {
        // Validación de aceptar términos
        if(form.aceptarTerminos.checked){
            const fields = ["nombre", "apellidos", "email", "contrasena", "vContrasena"]
            /* Validación de campos rellenados */
            for(let field of fields){
                if(!validarTexto(form[field].value)){
                    setNotification({
                        notification: "Debe rellenar todos los campos",
                        isSuccess: false
                    })
                    return
                }
            }
            // Validación email
            if(!validarEmail(form.email.value)){
                setNotification({
                    notification: "El email no es válido",
                    isSuccess: false
                })
                return
            }

            // Validación contraseña
            if(form.contrasena.value !== form.vContrasena.value){
                setNotification({
                    notification: 'Las contraseñas no coinciden',
                    isSuccess: false
                })
                return
            }

            if(!validarContrasena(form.contrasena.value)){
                setNotification({
                    notification: 'La contraseña no se ajusta a la política',
                    isSuccess: false
                })
                return
            }
            const myFields = {
                nombre: form.nombre.value,
                apellidos: form.apellidos.value,
                email: form.email.value,
                contrasena: form.contrasena.value
            }
            completarRegistro(myFields)

        }else{
            setNotification({
                notification: "Debe aceptar los términos legales",
                isSuccess: false
            })
            return
        }
    }

    const validarCorreo = async vCodigo => {
        try{
            const res = await userService.verificarCorreo(verifying.token, vCodigo, sub)
            if(res.status === 200 && res.data.verified === true){
                setNotification({
                    notification: 'Se ha registrado exitósamente',
                    isSuccess: true
                })
                setVerifying({
                    value: false,
                    correo: "",
                    token: ""
                })
            }
        }catch(e){
            if(e.response.data.verify === true){
                setVerifying({
                    value: true,
                    correo: verifying.correo,
                    token: e.response.data.tokenValidacion
                })
            }
            setNotification({
                notification: e.response.data.error,
                isSuccess: false
            })
        }
    }

    const getSignIn = () => {
        if(verifying.value){
            // console.log(verifying.email)
            return (
                <VerifyPage email={verifying.correo} getNotification={getNotification} onFinish={validarCorreo}/>
            )
        }else{
            return (
                <>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img src="/logoColor.png" width="18%"/>
                </div>
                    <Box component="form" onSubmit={registrarse} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
                        {getNotification()}
                        <h1>Registrarse</h1>
                            <TextField fullwidth variant="outlined" name="nombre" autoComplete='off' label="Nombre"/><br/>
                            <TextField fullwidth variant="outlined" name="apellidos" autoComplete='off' label="Apellidos"/><br/>
                            <TextField fullwidth variant="outlined" type="email" name="email" autoComplete='off' label="Email"/><br/>
                            <TextField fullwidth type="password" name="contrasena" variant="outlined" label="Contraseña"/><br/>
                            <TextField fullwidth type="password" name="vContrasena" variant="outlined" label="Confirmar contraseña"/><br/>
                            <FormControlLabel name="aceptarTerminos" control={<Checkbox />} label="Acepto los términos legales y de privacidad" />
                                <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', textAlign: 'right'}}>
                                <Link to="#" style={{cursor: 'pointer'}} onClick={toggleLikeRegistering}>¿Has cambiado de idea? Acceder</Link>
                            </div>
                            <Button fullwidth variant="contained" type="submit">Registrarse</Button>
                    </Box>
                </>
            )   
        }
    }


    return (
        <>
        {getSignIn()}
        </>
    )
}

export default SignIn