import * as React from 'react';
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import logo from './logo_2_red.svg'
import avatarPovar from './avatar-povar.jpeg'
import avatarBoss from './avatar-boss.jpeg'
import avatarTechnolog from './avatar-technolog.jpeg'
import './style.css'

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const pagesBoss = ['Сотрудники', 'Отчет'];
// const settingsBoss = ['Выйти'];

const ResponsiveAppBar = () => {
  const login = useSelector((state) => state.auth.login)
  // console.log(login, "Это стейт логин в навбаре");
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
    // NavBar директора
    (login.role === 'Директор' ?
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters className='nav-bar-space-between'>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/boss"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            // letterSpacing: '.3rem',
            color: 'inherit', //цвет надписи LOGO
            textDecoration: 'none',
          }}>
            <img src={logo} className="logo" />
          Gelateria Di Neve 
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
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
            }}>
              <MenuItem key={'Сотрудники'} onClick={handleCloseNavMenu}>
              <Link to="/boss/addUser">
                <Typography  className="btn-navBar" textAlign="center">Сотрудники</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'Отчет'} onClick={handleCloseNavMenu}>
              <Link to="/">
                <Typography  textAlign="center">Отчет</Typography>
                </Link>
              </MenuItem>
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/boss"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            // letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          <img src={logo} className="logo" />
         Gelateria Di Neve
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <MenuItem key={'Сотрудники'} onClick={handleCloseNavMenu}>
           <Link to="/boss/addUser">
                <Typography  textAlign="center">Сотрудники</Typography>
               </Link>
              </MenuItem>
              <MenuItem key={'Отчет'} onClick={handleCloseNavMenu}>
              <Link to="/">
                <Typography  textAlign="center">Отчет</Typography>
               </Link>
              </MenuItem>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {/* // здесь вставить аватар */}
              <Avatar alt="Remy Sharp" src={avatarBoss} />
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
            onClose={handleCloseUserMenu}>
              <MenuItem key={"Выйти"} onClick={handleCloseUserMenu}>
              <Link className="btn-logout" to="/auth/logout">
                <Typography textAlign="center">Выйти</Typography>
                </Link>
              </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
    
  :  login.role === 'Повар' ?


  // навбар повара
  <AppBar position="static" >
  <Container maxWidth="xl" >
    <Toolbar disableGutters className='nav-bar-space-between' >
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          // letterSpacing: '.3rem',
          color: 'inherit', //цвет надписи LOGO
          textDecoration: 'none',
        }}>
          <img src={logo} className="logo" />
        Gelateria Di Neve
      </Typography>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/boss"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          // letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
         <img src={logo} className="logo" />
       Gelateria Di Neve 
      </Typography>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={avatarPovar} />
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
          onClose={handleCloseUserMenu}>
            <MenuItem key={"Выйти"} onClick={handleCloseUserMenu}>
            <Link className="btn-logout" to="/auth/logout">
              <Typography textAlign="center">Выйти</Typography>
              </Link>
            </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar> 

  :   
  
   // навбар технолога
   <AppBar position="static">
   <Container maxWidth="xl" >
     <Toolbar disableGutters className='nav-bar-space-between'>
        {/* здесь нужно заменить на логотип */}
        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />  */}
        
       <Typography
         variant="h6"
         noWrap
         component="a"
         href="/technolog"
         sx={{
           mr: 2,
           display: { xs: 'none', md: 'flex' },
           fontFamily: 'monospace',
           fontWeight: 700,
           // letterSpacing: '.3rem',
           color: 'inherit', //цвет надписи LOGO
           textDecoration: 'none',
         }}>
           <img src={logo} className="logo" />
         Gelateria Di Neve 
       </Typography>
 
       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
         <IconButton
           size="large"
           aria-label="account of current user"
           aria-controls="menu-appbar"
           aria-haspopup="true"
           onClick={handleOpenNavMenu}
           color="inherit">
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
           }}>
             <MenuItem key={'Сотрудники'} onClick={handleCloseNavMenu}>
             <Link to="/">
               <Typography  className="btn-navBar" textAlign="center">Вкусы</Typography>
               </Link>
             </MenuItem>
             <MenuItem key={'Отчет'} onClick={handleCloseNavMenu}>
             <Link to="/">
               <Typography  textAlign="center">Ингридиенты</Typography>
               </Link>
             </MenuItem>
         </Menu>
       </Box>
       <Typography
         variant="h5"
         noWrap
         component="a"
         href="/boss"
         sx={{
           mr: 2,
           display: { xs: 'flex', md: 'none' },
           flexGrow: 1,
           fontFamily: 'monospace',
           fontWeight: 700,
           // letterSpacing: '.3rem',
           color: 'inherit',
           textDecoration: 'none',
         }}>
         <img src={logo} className="logo" />
        Gelateria Di Neve 
       </Typography>
       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
       <MenuItem key={'Вкусы'} onClick={handleCloseNavMenu}>
          <Link to="/boss/addUser">
               <Typography  textAlign="center">Вкусы</Typography>
              </Link>
             </MenuItem>
             <MenuItem key={'Ингридиенты'} onClick={handleCloseNavMenu}>
             <Link to="/auth">
               <Typography  textAlign="center">Ингридиенты</Typography>
              </Link>
             </MenuItem>
       </Box>
 
       <Box sx={{ flexGrow: 0 }}>
         <Tooltip title="Open settings">
           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
           {/* // здесь вставить аватар */}
             <Avatar alt="Remy Sharp" src={avatarTechnolog} />
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
           onClose={handleCloseUserMenu}>
             <MenuItem key={"Выйти"} onClick={handleCloseUserMenu}>
             <Link className="btn-logout" to="/auth/logout">
               <Typography textAlign="center">Выйти</Typography>
               </Link>
             </MenuItem>
         </Menu>
       </Box>
     </Toolbar>
   </Container>
 </AppBar> 
    )
  );
};
export default ResponsiveAppBar;
