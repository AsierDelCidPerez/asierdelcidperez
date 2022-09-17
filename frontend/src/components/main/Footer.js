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
        logo: 'https://bit.ly/3QTq0ue',
        uri: 'https://github.com/AsierDelCidPerez'
    },
    {
      id: 2,
      logo: 'https://bit.ly/3BNhpVF',
      uri: 'https://twitter.com/adelcidp_175'
    },
    {
      id: 3,
      logo: 'https://bit.ly/3Uv3WJN',
      uri: 'https://www.youtube.com/channel/UCuTIBAGx8nxUYE5r0-ezt0Q'
    },
    {
      id: 4,
      logo: 'https://bit.ly/3dkBMQT',
      uri: 'https://www.instagram.com/adelcidp142/'
    },
    {
      id: 5,
      logo: 'https://bit.ly/3dtMrZk',
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
                  <Container sx={{display: {xs: 'block', s: 'block', md: 'none'}}}>
                    <Grid container item columns={{xs: 4, s: 8}} spacing={2} xs={4} sx={{display: {md: 'none', s: 'flex', xs: 'flex'}, justifyContent: 'center'}}>
                      {
                        redesSociales.map(red => (
                          <Grid key={red.id} item xs={2} sx={{display: 'flex', justifyContent: 'center'}}>
                            <a href={red.uri} target="_blank" rel="noreferrer"><Box component="img" src={red.logo} sx={{width: 50, cursor: 'pointer'}}/></a>
                            { /* <Box component="img" src={red.logo} sx={{width: 50, cursor: 'pointer'}} onClick={() => window.location.href = red.uri}></Box> */ }
                          </Grid>
                          ))
                        }
                    </Grid>
                    <div style={{textAlign: 'center', margin: '3%'}}>
                          <Typography style={{
                            whiteSpace: 'initial',
                            textAlign: 'center',
                            padding: '1%',
                            fontFamily: 'Cascadia Code'
                          }} class="tippingAction">Asier Del Cid Pérez</Typography>
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                          <TerminalIcon sx={{fontSize: 35}}/>
                          </div>
                      </div>
                    </Container>
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