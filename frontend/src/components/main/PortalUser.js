import { Grid, Box, Typography, Button } from "@mui/material"
import ListedNav from "../dependences/others/ListedNav"
import React from "react"
import { Link } from "react-router-dom"

const opcionesUsuario = [
    {
        name: "Inicio",
        icon: "fa-solid fa-house",
        onClick: () => {
            
        }
    },
    {
        name: "Editar ajustes",
        icon: "fa-solid fa-pen-to-square",
        onClick: () => {
            
        }
    }
]

const PortalUser = () => {
    const [openSideBar, setOpenSideBar] = React.useState(false)
    return (
        <div>
            <Box sx={{display: {md: 'block', sm: 'none'}}}>
                <Grid container>
                    <Grid item xs={3}>
                        <ListedNav list={opcionesUsuario}/>
                    </Grid>
                    <Grid item xs={9}>
                        
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
            </Box>
            <br/>
        </div>
    )
}


export default PortalUser