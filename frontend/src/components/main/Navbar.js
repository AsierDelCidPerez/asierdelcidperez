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

/*

Estructura de una page/setting

{
    id: <1, 2, ..., n>,
    name: <name>,
    uri: <url>
}

*/

const pages = [
    {
        id: 1,
        name: 'Contactar',
        uri: '/contactar'
    },
    {
        id: 2,
        name: 'Documentación',
        uri: '/legal'
    },
    {
        id: 3,
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
    uri: '/settings/dashboard',
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

const Navbar = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggingIn, setLoggingIn] = React.useState(false)
    const notification = useNotification()
    const [likeRegistering, setLikeRegistering] = React.useState(false);
    const loggedIn = false
    const user = useSelector(state => state.user)
    // console.log(user)

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
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

  const getAvatarInfo = () => (
    <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" >A</Avatar>
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

  const getLoginButton = () => (
    <Button color="inherit" onClick={toggleLogin}>Acceder</Button>
  )
    return (
      <>
      {getTheModal()}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            { 
            /* Logo */ 
            }
              <img src="/logo.png" width="5%" style={{cursor: 'pointer'}} onClick={() => navigate('/')}/>
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
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={() => navigate(page.uri)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
              {pages.map((page) => (
                <Button
                  key={page.id}
                  color="inherit"
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