import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header () {
  const pages = ['Bulletin', 'Notes', 'Discussion'];
  const settings = ['Profile', 'Account', 'Logout'];
  const [userAnchor, setUserAnchor] = useState(null);
  let navigate = useNavigate();

  const openUserMenu = (e) => {
    setUserAnchor(e.currentTarget);
  }
  const closeUserMenu = (e) => {
    setUserAnchor(null);
  }
  const clickSetting = (setting) => {
    setUserAnchor(null)
    if (setting !== 'Logout') {
      navigate('/users/'+setting)
    } else {
      localStorage.removeItem('token')
      navigate('/')
      window.location.reload()
    }

  }
  return (
    <AppBar position="static" sx={{ bgcolor: '#424242'}}>
       <Container maxWidth='xl' sx={{ml: 20}}> 
        <Toolbar disableGutters>

          <IconButton sx={{mr: 5}} onClick={() => {navigate('/')}}>
            <MenuIcon sx={{color: 'white'}}/>
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/'+page)}
                sx={{ my: 2, color: 'white', display: 'block', mr: 5 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{color: 'white'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={userAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userAnchor)}
              onClose={closeUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {clickSetting(setting)}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>

  )

}
