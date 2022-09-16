import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const redesSociales = [
    {
        logo: 'https://i.ibb.co/8BQVWkH/211904-social-github-icon.png',
        uri: ''
    }
]

const Footer = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
      <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: {xs: 'center', md: 'left'}}}>
                <Grid container columns={{xs: 4, s: 4, md: 12}}>
                    <Grid container item columns={{xs: 4, s: 8}} xs={4} sx={{display: {md: 'none', s: 'block', xs: 'block'}}}>
                        
                    </Grid>
                    <Grid item xs={8} sx={{display: {s: 'none', xs: 'none', md: 'block'}}}>
                        Buenos dias
                    </Grid>
                </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>  
      </>  
    )

}

export default Footer