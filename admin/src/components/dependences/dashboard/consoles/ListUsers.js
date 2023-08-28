import { Button, Card, CardContent } from "@mui/material"
import useAdminService from "../../../../services/admin"
import { Link } from "react-router-dom"

const { useEffect, useState } = require("react")
const { default: TableUsers } = require("./dependences/TableUsers")



const ListUsers = () => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")

    const adminService = useAdminService()

    useEffect(() => {

        adminService.adminConsole.listUsers(["interfacex"]).then(res => setUsers(res.data)).catch(err => console.error(err))

    }, [])

    // console.log(selectedUser)

    const link = `/dashboard/user/manage/${selectedUser}`


    return (

        <div>
            <TableUsers setSelectedUser={setSelectedUser} users={users}/>
            <br/>
            <Card>
                <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button component={Link} to={link} disabled={selectedUser === null || !selectedUser || selectedUser === ""} variant="contained">Gestionar usuario seleccionado</Button>
                </CardContent>
            </Card>

        </div>

    )

}


export default ListUsers