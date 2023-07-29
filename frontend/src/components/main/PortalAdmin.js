import { Grid, Box, Typography, Button, Card } from "@mui/material"
import ListedNav from "../dependences/others/ListedNav"
import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Grafica from "../dependences/Grafica"
import LanguageGrafica from "../dependences/home/LanguageGrafica"
import Home from "../dependences/user/consoles/Home"
import ChangePassword from "../dependences/user/consoles/ChangePassword"
import { useDispatch, useSelector } from "react-redux"
import EditSettings from "../dependences/user/consoles/EditSettings"
import useAdminService from "../../services/admin"
import { actOfSetAdmin } from "../../redux/reducers/admin"

const opcionesUsuario = [
    {
        name: "Inicio",
        icon: "fa-solid fa-house",
        onClick: () => (
            <Home/>
        )
    },
    {
        name: "Editar ajustes",
        icon: "fa-solid fa-pen-to-square",
        onClick: () => (
            <EditSettings/>
        )
    },
    {
        name: "Cambiar contraseña",
        icon: "fa-solid fa-key",
        onClick: () => (
            <ChangePassword/>
        )
    },
    {
        name: "Mis notificaciones",
        icon: "fa-solid fa-envelope",
        badge: 4,
        onClick: () => {
            
        }
    },
    {
        name: "Mis archivos",
        icon: "fa-solid fa-folder",
        onClick: () => {
            
        }
    }
]

const PortalAdmin = () => {
    const [openSideBar, setOpenSideBar] = React.useState(false)
    const [activeElem, setActiveElem] = React.useState(0)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const adminService = useAdminService()
    const admin = useSelector(state => state.admin)

    useEffect(() => {
        adminService.verifyRights().then(res => {
            dispatch(actOfSetAdmin(res.tokenAdmin, res.rights))
        }).catch(e => {
            navigate('/')
            console.error(e)
        })
    }, [])

    

    // QUITAR COMENTARIO PARA REESTRINGIR ACCESO A USUARIOS
    /*
    useEffect(() => {
        if(user === null) navigate('/')
    }, [])
    */

    //QUITAR COMENTARIO PARA REESTRINGIR ACCESO A USUARIOS
    /*
    const getPortal = () => user !== null ? 
    (
    <div>
        <Box sx={{display: {md: 'block', sm: 'none', xs: 'none'}}}>
            <Grid container gap={2}>
                <Grid item xs={3}>
                    <ListedNav list={opcionesUsuario} activeElem={activeElem} setActiveElem={setActiveElem}/>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <Typography
                        sx={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>
                            <i className={opcionesUsuario[activeElem].icon}/> &nbsp;
                            {opcionesUsuario[activeElem].name}
                        </Typography>
                    </Card>
                    <br/>
                    {opcionesUsuario[activeElem].onClick()}
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display: {md: 'none', sm: 'block'}}}>
            <ListedNav list={opcionesUsuario} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
            <div style={{textAlign: 'center'}}>
                <Button variant="contained" onClick={() => setOpenSideBar(!openSideBar)}>
                    Abrir opciones
                </Button>
            </div>
            <br/>
            <Typography sx={{textAlign: 'center', fontSize: 20}}>
                <i className={opcionesUsuario[activeElem].icon}/>&nbsp;
                {opcionesUsuario[activeElem].name}
            </Typography>
        </Box>
        <br/>
    </div>)
    :
    (<div></div>)
    */
    

    {
        /*Interfaz para el portal de usuario en ordenador */
    }
    // AÑADIR COMENTARIO PARA REESTRINGIR ACCESO A USUARIOS
    const getPortal = () => (
        <div>
        <Box sx={{display: {md: 'block', sm: 'none', xs: 'none'}}}>
            <Grid container gap={2}>
                <Grid item xs={3}>
                    <ListedNav list={opcionesUsuario} activeElem={activeElem} setActiveElem={setActiveElem}/>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <Typography
                        sx={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>
                            <i className={opcionesUsuario[activeElem].icon}/> &nbsp;
                            {opcionesUsuario[activeElem].name}
                        </Typography>
                    </Card>
                    <br/>
                    {opcionesUsuario[activeElem].onClick()}
                </Grid>
            </Grid>
        </Box>



        {
            /*Interfaz para el portal de usuario en móvil */
        }
        <Box sx={{display: {md: 'none', sm: 'block'}}}>
            <ListedNav list={opcionesUsuario} openSideBar={openSideBar} onClose={e => {console.log(e.target)}} activeElem={activeElem} setActiveElem={setActiveElem} setOpenSideBar={setOpenSideBar}/>
            <div style={{textAlign: 'center'}}>
                <Button variant="contained" onClick={() => setOpenSideBar(!openSideBar)}>
                    Abrir opciones
                </Button>
            </div>
            <br/>
            <Typography sx={{textAlign: 'center', fontSize: 20}}>
                <i className={opcionesUsuario[activeElem].icon}/>&nbsp;
                {opcionesUsuario[activeElem].name}
            </Typography>
            <br/>
            {opcionesUsuario[activeElem].onClick()}
        </Box>
        <br/>
    </div>
    )
    

    return (
        <div>
        {getPortal()}
        </div>
    )
}

export default PortalAdmin