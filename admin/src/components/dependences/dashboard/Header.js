import { Box, Typography } from "@mui/material"


const Header = ({admin }) => {


    return (
        <header style={{position: 'relative'}}>
            <Box sx={{display: {sm: 'none', xs: 'none', md: 'flex'}, justifyContent: 'space-between'}}>
                <img src="./admin.png" width="13%"/>
                <img src="./logoBlanco.png" width="13%"/>
            </Box>
            <Box sx={{display: {sm: 'flex', xs: 'flex', md: 'none'}, justifyContent: 'center'}}>
                <img src="./admin.png" width="25%"/>
                <img src="./logoBlanco.png" width="25%"/>
            </Box>
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