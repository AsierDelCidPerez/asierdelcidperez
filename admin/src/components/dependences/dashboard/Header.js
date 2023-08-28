import { Box, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"


const Header = ({admin }) => {

    const navigate = useNavigate()

    return (
        <header style={{position: 'relative'}}>
            {/*}
            <Box sx={{display: {sm: 'none', xs: 'none', md: 'flex'}, justifyContent: 'space-between', position: 'absolute', top: "0%", left: '5%'}}>
                <div style={{opacity: 0}}><img src="./logoBlanco.png" width="10%"/></div>
                <img onClick={() => navigate('/logout')} style={{cursor: 'pointer', opacity: 0}} src="./logout.png" width="10%"/>
            </Box>
            <Box sx={{display: {sm: 'flex', xs: 'flex', md: 'none'}, justifyContent: 'center'}}>
                <img style={{opacity: 0}} src="./logoBlanco.png" width="25%"/>
                <img style={{cursor: 'pointer', opacity: 0}} onClick={() => navigate('/logout')} src="./logout.png" width="25%"/>
            </Box>
    {*/}<br/>
            <Box sx={{display: {md: 'block', xs: 'none', sm: 'none'}}} style={{textAlign: 'center'}}>
                <Typography element="h1" fontSize={35}>Bienvenid@ <strong>{admin?.name} {admin.apellidos}</strong></Typography>
                <Typography element="h3" fontSize={25}>Rango: <strong>{admin?.rank}</strong></Typography>
            </Box>
            <Box sx={{display: {md: 'none', xs: 'block', sm: 'block'}}} style={{textAlign: 'center'}}>
                <Typography element="h1" fontSize={25}>Bienvenid@ <strong>{admin?.name} {admin.apellidos}</strong></Typography>
                <Typography element="h3" fontSize={20}>Rango: <strong>{admin?.rank}</strong></Typography>
            </Box>
            <hr/>
            <br/><br/>
    </header>
    )
}

export default Header