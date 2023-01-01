import { Grid, Box, Typography, Button, Card } from "@mui/material"
import ListedNav from "../dependences/others/ListedNav"
import React from "react"
import { Link } from "react-router-dom"
import Grafica from "../dependences/Grafica"
import LanguageGrafica from "../dependences/home/LanguageGrafica"
import Home from "../dependences/user/consoles/Home"

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
        onClick: () => {
            
        }
    },
    {
        name: "Cambiar contraseña",
        icon: "fa-solid fa-key",
        onClick: () => {
            
        } 
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

const PortalUser = () => {
    const [openSideBar, setOpenSideBar] = React.useState(false)
    const [activeElem, setActiveElem] = React.useState(0)
    return (
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
        </div>
    )
}

export default PortalUser