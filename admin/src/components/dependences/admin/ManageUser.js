import { Box, Card, CardContent, Container, Typography } from "@mui/material"
import { useMatch, useParams } from "react-router-dom"
import CardUser from "./CardUser"
import { useEffect, useState } from "react"
import { useNotification } from "../Notification"
import useAdminService from "../../../services/admin"
import TableUser from "./TableUser"

const ManageUser = ({setVisible}) => {

    const [user, setUser] = useState({})
    setVisible(true)

    const [getNotification, setNotification] = useNotification()

    const adminService = useAdminService()
    const params = useParams()
    const id = params.id    

    useEffect(() => {
        adminService.adminConsole.readUser(id, ["interfacex"]).then(res => setUser(res.data))
        .catch(e => setNotification({
            notification: e.response.data.error,
            isSuccess: false
        }))
    }, [])


    const getEstado = () => {

        const blockValue = user?.blocked?.value

        if(blockValue === -1){
            return (
                <div style={{display: 'flex'}}>
                    <h2>Estado:&nbsp;</h2>
                    <h2 style={{color: "green"}}>ACTIVO</h2>
                </div>
            )
        }else {
            if(blockValue === -2){
                return (
                <div style={{display: 'flex'}}>
                    <h2>Estado:&nbsp;</h2>
                    <h2 style={{color: "red"}}>BLOQUEADO PERMANENTEMENTE</h2>
                </div>
                )
            }else{
                const fechaMaxima = new Date(blockValue)
                return (
                    <div style={{display: 'flex'}}>
                        <h2>Estado:&nbsp;</h2>
                        <h2 style={{color: "red"}}>BLOQUEADO HASTA {fechaMaxima.getDate()}/{fechaMaxima.getMonth()+1}/{fechaMaxima.getFullYear()}</h2>
                    </div>
                )
            }
        }

    }


    const getStickers = () => {

        const status = user?.status

        return (<>
                {status === 2 ? (<i class="fa-solid fa-user-tie"></i>) : (<></>)} {status === 1 ? (<i class="fa-regular fa-circle-check"></i>) : (<></>)}
</>
        )

    }


    


    const editEvents = [() => {console.log("OKKK")}, null]


    return (
        <div>
            <Container>
                {getNotification()}
                <div style={{textAlign: 'center'}}>
                <Typography variant="h3">{user.name} {user.apellidos} {getStickers()}</Typography>
                </div>
                <hr/>
                <br/>
                <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none'}, justifyContent: 'center'}}>
                    <CardUser user={user}/>
                </Box>
                {getEstado()}
                <TableUser user={user} editEvents={editEvents}/>
            </Container>
        </div>
    )

}


export default ManageUser