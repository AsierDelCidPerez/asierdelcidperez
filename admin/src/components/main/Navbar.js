import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider, ListItemIcon, ListItemText, TextField } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNotification } from '../dependences/Notification';
import { useSelector } from 'react-redux';
import ListedNav from '../dependences/others/ListedNav';

/*

Estructura de una page/setting

{
    id: <1, 2, ..., n>,
    name: <name>,
    uri: <url>
}

*/


const settings = [
  {
    id: 3,
    divided: true,
    name: 'Logout',
    uri: '/logout',
    icon: "fa-solid fa-right-from-bracket"
  }
];



export const useNavbar = () => {
    const navigate = useNavigate()
    const [isVisible, setVisible] = React.useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggingIn, setLoggingIn] = React.useState(false)
    const notification = useNotification()
    const [likeRegistering, setLikeRegistering] = React.useState(false);
    const [activeElem, setActiveElem] = React.useState(0)
    const [openSideBar, setOpenSideBar] = React.useState(false)
    const loggedIn = false

    const admin = useSelector(state => state.admin)

    // console.log(user)

    
const pages = [
  {
    id: 0,
    name: 'Inicio',
    icon: 'fa-solid fa-house',
    rights: "adminUser",
    onClick: () => {
      /*
      navigate('/')
      setActiveElem(0)
      */
    },
    uri: '/dashboard'
},
  {
      id: 1,
      name: 'Usuarios',
      icon: 'fa-solid fa-headset',
      onClick: () => {
        setActiveElem(1)
      },
      uri: '/dashboard/user'
  },
  {
      id: 2,
      icon: 'fa-solid fa-gavel',
      onClick: () => {
        setActiveElem(2)
      },
      name: 'API',
      uri: '/dashboard/api'
  },
  {
    id: 3,
    icon: 'fa-solid fa-gavel',
    onClick: () => {
      setActiveElem(3)
    },
    name: 'RBAC',
    uri: '/dashboard/rbac'
  },
  {
    id: 4,
    icon: 'fa-solid fa-gavel',
    onClick: () => {
      setActiveElem(4)
    },
    name: 'Email',
    uri: '/dashboard/email'
  },
  {
    id: 5,
    icon: 'fa-solid fa-gavel',
    onClick: () => {
      setActiveElem(5)
    },
    name: 'Web',
    uri: '/dashboard/web'
  },
  {
    id: 6,
    icon: 'fa-solid fa-gavel',
    onClick: () => {
      setActiveElem(6)
    },
    name: 'Tenant',
    uri: '/dashboard/tenant'
  }
];


  
    const handleOpenNavMenu = (event) => {
      setOpenSideBar(true)
      // setActiveElem()
      // setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setLikeRegistering(false)
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setLikeRegistering(false)
      setAnchorElUser(null);
    };

    const getBodyOfSetting = page => {
        return (
          <>
            <ListItemIcon>
              {page.icon ? <i className={page.icon} /> : ""}
            </ListItemIcon>
            <ListItemText>{page.name}</ListItemText>
          </>
        )
  }

  const getAvatar = () => {
    if(admin.imageIcon !== ""){
      return (<Avatar alt={admin.name + " " + admin.apellidos} src={admin.imageIcon} />)
    }else{
      return (<Avatar alt={admin.name + " " + admin.apellidos} >{admin?.name?.toUpperCase().charAt(0)}</Avatar>)
    }
  }

  const getAvatarInfo = () => (
    <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir ajustes">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {getAvatar()}
                </IconButton>
              </Tooltip>
              
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
                {settings.map((setting) => (
                  <div key={setting.id}>
                  {setting.divided ? <Divider/> : ''}
                  <MenuItem key={setting.id} onClick={() => navigate(setting.uri)}>
                    {getBodyOfSetting(setting)}
                  </MenuItem>
                  </div>
                ))}
              </Menu>
                
            </Box>
  )



  const toggleLikeRegistering = () => setLikeRegistering(!likeRegistering)

  const properties = {
    notification,
    toggleLikeRegistering
  }


  const getIconLogo = () => {
    /*
    if(activeElem === 0){
      return (
        <img className="imgComputer" src="/admin.png" width="5%" style={{cursor: 'pointer'}} onClick={() => {
          navigate('/')
          setActiveElem(0)
        }}/>
      )
    }
    */
    return (
      <Box component="img" className="imgComputer" src="/admin.png" width="5%" sx={{cursor: 'pointer', display: {md: 'block', sm: 'none', xs: 'none'}}} onClick={() => {
        navigate('/')
        setActiveElem(0)
      }}/>
    )
  }
  const getIconLogoMobile = () => {
    /*
    if(activeElem === 0){
      return (
        <img className="imgComputer" src="/admin.png" width="5%" style={{cursor: 'pointer'}} onClick={() => {
          navigate('/')
          setActiveElem(0)
        }}/>
      )
    }
    */
    return (
      <Box component="img" className="imgComputer" src="/admin.png" width="10%" sx={{cursor: 'pointer', display: {md: 'none', sm: 'block', xs: 'block'}}} onClick={() => {
        navigate('/')
        setActiveElem(0)
      }}/>
    )
  }
    const getNavBar = () =>  (
      <>
      <AppBar position="sticky">
        <Box sx={{display: {xs: 'block', md: 'none', sm: 'block'}}}>       <ListedNav list={pages} openSideBar={openSideBar} onClose={e => {console.log(e.target)}} activeElem={activeElem} setActiveElem={setActiveElem} setOpenSideBar={setOpenSideBar}/>
</Box>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            { 
            /* Logo */ 
            }
            {getIconLogo()}
            {/*}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ASIER
            </Typography> {*/}
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/*
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                {pages.filter(page => page.id !== 0).map(page => (
                  <MenuItem key={page.id} onClick={page.onClick}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
                */}
            </Box>
            {getIconLogoMobile()}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AdminX
            </Typography>

            {
            /* Enlaces del Navbar*/
            }

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.filter(page => page.id !== 0).map(page => (
                <Button
                  key={page.id}
                  sx={{
                    color: (page.id === activeElem) ? 'white' : 'black'
                  }}
                  onClick={page.onClick}
                  component={Link}
                  to={page.uri}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
  

            {
            /* Avatar de usuario y onClick Menu*/
            }


            {getAvatarInfo()}
            
          </Toolbar>
        </Container>
      </AppBar>  
      </>  
    )

    const getNavbar = () => admin !== null && isVisible ? getNavBar() : (<div></div>)

    return [
        getNavbar,
        setVisible,
        setActiveElem,
        isVisible,
        activeElem
    ]


}