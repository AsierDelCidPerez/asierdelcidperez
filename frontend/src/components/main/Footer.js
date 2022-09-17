import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal'

const redesSociales = [
    {
        id: 1,
        logo: 'https://i.ibb.co/8BQVWkH/211904-social-github-icon.png',
        uri: 'https://github.com/AsierDelCidPerez'
    },
    {
      id: 2,
      logo: 'https://i.ibb.co/RY9XB2k/104501-twitter-bird-icon.png',
      uri: 'https://twitter.com/adelcidp_175'
    },
    {
      id: 3,
      logo: 'https://i.ibb.co/YZ6Lm3j/211929-social-youtube-icon.png',
      uri: 'https://www.youtube.com/channel/UCuTIBAGx8nxUYE5r0-ezt0Q'
    },
    {
      id: 4,
      logo: 'https://i.ibb.co/h2SRJZ9/1161953-instagram-icon.png',
      uri: 'https://www.instagram.com/adelcidp142/'
    },
    {
      id: 5,
      logo: 'https://i.ibb.co/qFJyXqs/3671674-badge-icon.png',
      uri: 'https://www.credly.com/users/asier-del-cid-perez/badges'
    }
]

const Footer = () => {

    return (
      <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{padding: '.5%'}}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: {xs: 'center', md: 'left'}}}>
                <Grid container columns={{xs: 4, s: 4, md: 12}}>
                  {
                    /* Footer para móviles/tablets */
                  }
                    <Grid container item columns={{xs: 4, s: 8}} xs={4} sx={{display: {md: 'none', s: 'block', xs: 'block'}}}>
                        
                    </Grid>

                    {
                      /* Footer para PCs */ 
                    }
                    <Grid item xs={8} container sx={{display: {s: 'none', xs: 'none', md: 'flex'}}} spacing={2}>
                        {
                        redesSociales.map(red => (
                          <Grid key={red.id} item xs={2}>
                            <a href={red.uri} target="_blank" rel="noreferrer"><Box component="img" src={red.logo} sx={{width: 50, cursor: 'pointer'}}/></a>
                            { /* <Box component="img" src={red.logo} sx={{width: 50, cursor: 'pointer'}} onClick={() => window.location.href = red.uri}></Box> */ }
                          </Grid>
                          ))
                        }
                    </Grid>

                    <Grid item xs={4} sx={{display: {s: 'none', xs: 'none', md: 'flex', flexDirection:"column", alignItems: 'center'}}}>
                      <div style={{display: 'flex'}}>
                        <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 60}}/>&nbsp;
                        <Typography
                          variant="h6"
                          noWrap
                          component={Link}
                          to="/"
                          sx={{
                            mr: 2,
                            fontSize: 40,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                        >
                          ASIER
                        </Typography>
                      </div>
                      <Typography
                        variant="p"
                        noWrap
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          fontFamily: 'Cascadia Code',
                          fontWeight: 100,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                          width: "100%",
                          whiteSpace: 'initial',
                          textAlign: 'center'
                        }}
                      >
                        Página web creada en su totalidad por Asier Del Cid Pérez
                      </Typography>
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