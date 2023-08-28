import { Card, CardContent, Container, Typography } from "@mui/material"
import { useMatch, useParams } from "react-router-dom"
import CardUser from "./CardUser"
import { useEffect, useState } from "react"
import { useNotification } from "../Notification"
import useAdminService from "../../../services/admin"

const ManageUser = ({setVisible}) => {

    const [user, setUser] = useState({})
    setVisible(true)

    const [getNotification, setNotification] = useNotification()

    const adminService = useAdminService()
    const params = useParams()
    const id = params.id    

    useEffect(() => {
        adminService.adminConsole.readUser(id, ["interfacex"]).then(res => setUser(res.data))
    }, [])

    console.log(user)

    return (
        <div>
            <Container>
                <div style={{textAlign: 'center'}}>
                <Typography variant="h3">{user.name} {user.apellidos}</Typography>
                </div>
                <hr/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <CardUser/>
                </div>
            </Container>
        </div>
    )

}


export default ManageUser