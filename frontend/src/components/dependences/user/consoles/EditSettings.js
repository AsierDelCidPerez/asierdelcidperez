import { Card, CardContent, TextField, Box, Button, Link } from "@mui/material"
import { useNotification } from "../../others/Notification"
import { useDispatch, useSelector } from "react-redux"
import useFormField from "../../inputs/FormFile"
import MyModal from "../../others/MyModal"
import { useState } from "react"
import { validacionCodigoSexaNumerico, validacionDatos } from "../../auth/login/dependences/validadores"
import useUserService from "../../../../services/users"
import VerifyPage from "../../auth/login/dependences/VerifyEmail"
import { actOfSetUser, actOfUpdateUser } from "../../../../redux/reducers/user"

const EditSettings = () => {

    const user = useSelector(state => state.user)
    const [getNotification, setNotification] = useNotification()
    const [getNotification2, setNotification2] = useNotification()
    const [verImagenPerfil, setVerImagenPerfil] = useState(false)
    const uploadImages = useFormField({name: 'imageIcon', acceptedExtensions: ["jpg", "png", "jpeg"], multiple: false, text: 'Subir imagen de perfil'})
    const userService = useUserService()
    const dispatch = useDispatch()
    const [changingEmail, setChangingEmail] = useState({
        value: 0,
        tokenValidacion: "",
        email: ""
    })
    const getVerImagenDePerfilActual = () => {
        if(user?.imageIcon && user?.imageIcon !== ""){
            return (
                <div style={{textAlign: 'center'}}>
                <Link sx={{cursor: 'pointer'}} onClick={() => setVerImagenPerfil(true)}>Ver imagen de perfil actual</Link>
                <br/><br/>
                </div>
            )
        }
    }

    const verifyEmail = async vCodigo => {
        if(validacionCodigoSexaNumerico(vCodigo)){
            const res = await userService.verifyEmailForChangingEmail(changingEmail.tokenValidacion, vCodigo)
            try {
                if(res.data.changed) {
                    dispatch(actOfUpdateUser({name: res.data.newData.name, email: res.data.newData.email, imageIcon: res.data.newData.imageIcon, rank: res.data.newData.rank, blocked: res.data.newData.blocked, token: res.data.token}))
                    localStorage.setItem('userToken', res.data.token)
                    setNotification({
                        notification: 'Ha cambiado exitósamente el email.',
                        isSuccess: true
                    })
                    setChangingEmail({
                        value: 0,
                        tokenValidacion: "",
                        email: ""
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
                notification: 'El código de verificación es inválido',
                isSuccess: false
            })
        }
    }

    const changeEmail = async event => {
        event.preventDefault()
        const newEmail = event.target.email.value
        if(validacionDatos({email: newEmail})){
            try{
                const res = await userService.changeEmail(newEmail)
                if(res.data.verify){
                    setChangingEmail({
                        value: 1,
                        email: newEmail,
                        tokenValidacion: res.data.tokenValidacion
                    })
                }
            }catch (e) {
                setNotification({
                    notification: e.response.data.error,
                    isSuccess: false
                })
            }
            
        }else{
            setNotification({
                notification: 'El email no es correcto.',
                isSuccess: false
            })
        }
    }

    return (
        <div>
            <MyModal open={verImagenPerfil} getBody={() => (
                <div style={{textAlign: 'center'}}>
                    <h2>Imagen de perfil actual:</h2><hr/>
                    <img width="100%" alt={user?.name + " " + user?.apellidos} src={user?.imageIcon}/>
                </div>
            )} handleClose={() => setVerImagenPerfil(false)}/>
            <MyModal open={changingEmail.value===1} getBody={() => (
                <VerifyPage email={changingEmail.email} getNotification={getNotification} onFinish={verifyEmail}/>
            )} handleClose={() => setChangingEmail({value:0,email:'',token:''})}/>
            <Card>
                <CardContent>
                    {getNotification()}<br/>
                    <Box component="form" onSubmit={changeEmail} sx={{display: {md: 'flex', sm:'block', xs:'block'}, gap: '3%'}}>
                        <TextField sx={{width: {sm: "100%", xs: "100%", md: '150%'}}} fullWidth variant="outlined" type="email" placeholder={user?.email} name="email" label="Nuevo email"/><br/><br/>
                        <Button fullWidth type="submit" variant="contained">Cambiar email</Button>
                    </Box>
                </CardContent>
            </Card>
            <br/>
            <Card>
                <CardContent>
                    <Box component="form">
                        {getNotification2()}<br/>
                        {uploadImages.getUploadFile() }<br/>
                        {getVerImagenDePerfilActual()}
                        <TextField fullWidth variant="outlined" type="name" name="name" placeholder={user?.name} label="Nombre"/><br/><br/>
                        <TextField fullWidth variant="outlined" type="apellidos" name="apellidos" placeholder={user?.apellidos} label="Apellidos"/><br/><br/>
                        <Button fullWidth type="submit" variant="contained">Guardar cambios</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )

}

export default EditSettings