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
import MyModal from '../dependences/others/MyModal';
import LoginForm from '../dependences/auth/login/Login';
import SignIn from '../dependences/auth/login/SignIn';
import { useNotification } from '../dependences/others/Notification';
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


const Navbar = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggingIn, setLoggingIn] = React.useState(false)
    const notification = useNotification()
    const [likeRegistering, setLikeRegistering] = React.useState(false);
    const [activeElem, setActiveElem] = React.useState(0)
    const [openSideBar, setOpenSideBar] = React.useState(false)
    const loggedIn = false
    const user = useSelector(state => state.user)
    // console.log(user)

    const pages = [
      {
        id: 0,
        name: 'Inicio',
        icon: 'fa-solid fa-house',
        onClick: () => {
          navigate('/')
          setActiveElem(0)
        },
        uri: '/'
    },
      {
          id: 1,
          name: 'Contactar',
          icon: 'fa-solid fa-headset',
          onClick: () => {
            navigate('/contactar')
            setActiveElem(1)
          },
          uri: '/contactar'
      },
      {
          id: 2,
          icon: 'fa-solid fa-gavel',
          onClick: () => {
            navigate('/legal')
            setActiveElem(2)
          },
          name: 'Documentación',
          uri: '/legal'
      },
      {
          id: 3,
          icon: 'fa-solid fa-blog',
          onClick: () => {
            navigate('/blogs')
            setActiveElem(3)
          },
          name: 'Blog',
          uri: '/blogs'
      }
  ];
  const settings = [
    {
      id: 1,
      name: 'Profile',
      uri: '/settings/profile',
      icon: "fa-solid fa-user"
    }, 
    {
      id: 2,
      name: 'Dashboard',
      uri: '/user',
      icon: "fa-solid fa-table-columns"
    },
    {
      id: 3,
      divided: true,
      name: 'Logout',
      uri: '/actions/logout',
      icon: "fa-solid fa-right-from-bracket"
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
    if(user.imageIcon !== ""){
      return (<Avatar alt={user.name + " " + user.apellidos} src={user.imageIcon} />)
    }else{
      return (<Avatar alt={user.name + " " + user.apellidos} >{user?.name?.toUpperCase().charAt(0)}</Avatar>)
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

  const toggleLogin = () => {
    setLoggingIn(!isLoggingIn)
    if(!loggedIn) setLikeRegistering(false)
  }

  const toggleLikeRegistering = () => setLikeRegistering(!likeRegistering)

  const properties = {
    notification,
    toggleLikeRegistering
  }


  const getTheModal = () => (
    <MyModal open={isLoggingIn && !user} handleClose={toggleLogin} getBody={() => (
      <>
      {likeRegistering ? <SignIn {...properties}/> : <LoginForm {...properties}/>}
      </>
    )}/>
  )

  const getIconLogo = () => {
    if(activeElem === 0){
      return (
        <img className="imgComputer" src="/logoBlanco.png" width="5%" style={{cursor: 'pointer'}} onClick={() => {
          navigate('/')
          setActiveElem(0)
        }}/>
      )
    }
    return (
      <img className="imgComputer" src="/logo.png" width="5%" style={{cursor: 'pointer'}} onClick={() => {
        navigate('/')
        setActiveElem(0)
      }}/>
    )
  }

  const getLoginButton = () => (
    <Button color="inherit" onClick={toggleLogin}>Acceder</Button>
  )
    return (
      <>
      {getTheModal()}
      <AppBar position="static">
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
            <TerminalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              ASIER
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


            {user !== null ? getAvatarInfo() : getLoginButton()}
            
          </Toolbar>
        </Container>
      </AppBar>  
      <br/>
      </>  
    )

}

export default Navbar