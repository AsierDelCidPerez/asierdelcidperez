import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getEffectiveRanksOf, includeAtLeastOneRank } from "../../../utils/ranks"
import { useSelector } from "react-redux"


const opcionesAdmin = [
    {
        id: 1,
        name: "Administar usuarios",
        description: "Permite la administración de los usuarios, en aspectos como agregar usuarios al tenant, editar información del usuario, etc.",
        ruta: "/dashboard/user",
        right: "adminUser",
        image: "./options/admin.png"
    },
    {
        id: 2,
        name: "Administar API",
        description: "Permite la administración de la API, ver las estadísticas de uso de sus suscripciones, renovar las suscripciones, etc.",
        ruta: "/dashboard/api",
        right: "adminAPI",
        image: "./options/api.png"
    },
    {
        id: 3,
        name: "Administar control de acceso",
        description: "Permite la administración del acceso mediante un sistema de roles (RBAC). Puede agregar roles, eliminarlos, asignarlos, desasignarlos desde esta opción.",
        ruta: "/dashboard/rbac",
        right: "adminRank",
        image: "./options/rbac.png"
    },
    {
        id: 4,
        name: "Administar email",
        description: "Permite la administración del buzón de correo vinculado a su tenant. Puede mandar emails, obtener todos los emails enviados, etc.",
        ruta: "/dashboard/email",
        right: "adminEmail",
        image: "./options/email.png"
    },
    {
        id: 5,
        name: "Administar web",
        description: "Permite la administración de la web, crear blogs, editarlos, administrar las aptitudes expuestas en la web, la evolución de los lenguajes, etc.",
        ruta: "/dashboard/web",
        right: "adminRank",
        image: "./options/web.png"
    },
    {
        id: 6,
        name: "Administar tenant",
        description: "Permite la administración del tenant, como asignar subTenants, modificar información del tenant, actualizar los servicios del tenant, etc.",
        ruta: "/dashboard/tenant",
        right: "adminTenant",
        image: "./options/tenant.png"
    },
]



const Options = ({setActiveElem}) => {
    const admin = useSelector(state => state.admin)
    const myOptions = opcionesAdmin.filter(option => includeAtLeastOneRank(getEffectiveRanksOf(...admin.rights), getEffectiveRanksOf(option.right)))

    const navigate = useNavigate()

    return (
        <div>
            <Box sx={{display: {md: 'block', sm: 'none', xs: 'none'}}}>
                <Grid container spacing={4}>
                    {myOptions.map((opcion, key) => (
                        <Grid key={key} item xs={6}>
                        <Card className="opcionAnimationClass" style={{opacity: '.8', background: '#1a1818', boxShadow: "10px 10px 50px"}}>
                            <CardActionArea onClick={() => navigate(opcion.ruta)}>
                            <CardContent sx={{textAlign: 'center'}}>
                                <img width="60" src={opcion.image}/>
                                <Typography sx={{color: 'white'}} gutterBottom variant="h4">{opcion.name}</Typography>
                                <Typography sx={{color: "white"}} variant="body2">{opcion.description}</Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{display: {md: 'none', sm: 'block', xs: 'block'}}}>
            <Grid container spacing={2}>
                    {opcionesAdmin.map((opcion, key) => (
                        <Grid key={key} item xs={12}>
                        <Card className="opcionAnimationClass" style={{opacity: '.8', background: '#1a1818', boxShadow: "10px 10px 50px"}}>
                            <CardActionArea onClick={() => {
                                navigate(opcion.ruta)
                                setActiveElem(opcion.id)
                            }}>
                            <CardContent sx={{textAlign: 'center'}}>
                                <img width="60" src={opcion.image}/>
                                <Typography sx={{color: 'white'}} gutterBottom variant="h4">{opcion.name}</Typography>
                                <Typography sx={{color: "white"}} variant="body2">{opcion.description}</Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                <br/>
            </Box>
        </div>
    )
}

export default Options