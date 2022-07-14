import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo_2_red.svg'
import avatarPovar from './avatar-povar.jpeg'
import avatarBoss from './avatar-boss.jpeg'
import avatarTechnolog from './avatar-technolog.jpeg'
import {logoutUser} from '../../store/auth/reducer'
import './style.css'

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const pagesBoss = ['Сотрудники', 'Отчет'];
// const settingsBoss = ['Выйти'];

const ResponsiveAppBar = () => {
  const login = useSelector((state) => state.auth.login)
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const logout = () => {
    dispatch(logoutUser());
    navigate('/')
  }

  return (
    // NavBar директора
    (login.role === 'Директор' ?
    <AppBar position="static" color="secondary">
    <Container maxWidth="xl">
      <Toolbar disableGutters className='nav-bar-space-between'>
        <Link to="/" >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: '',
            color: '#cd3039', 
            fontWeight: 700,
            textDecoration: 'none!important',
          }}>
            <img src={logo} className="logo" />
          Gelateria Di Neve Big
        </Typography>
          </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {/* вклдка со скрытым меню */}
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
              <Link to="/boss/employees">
                <Typography  
                className="btn-navBar" 
                textAlign="center"
                fontFamily="roboto"
                color="#cd3039"
                >Сотрудники</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'Отчет'} onClick={handleCloseNavMenu}>
              <Link to="/boss/statistic/production">
                <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Отчет производство</Typography>
                </Link>
                </MenuItem>
                <MenuItem key={'Отчет'} onClick={handleCloseNavMenu}>
                <Link to="/boss/statistic/price" >
                <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Отчет прайс</Typography>
                </Link>
              </MenuItem>
          </Menu>
        </Box>
        <Link to="/" sx={{textDecoration: 'none', color: '#cd3039', fontFamily: 'roboto'}}>
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'roboto',
            color: '#cd3039', 
            fontWeight: 700,
          }}>
          <img src={logo} className="logo" />
         Gelateria Di Neve Small
        </Typography>
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <MenuItem key={'Сотрудники'} onClick={handleCloseNavMenu}>
           <Link to="/boss/employees">
                <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Сотрудники</Typography>
               </Link>
        </MenuItem>
        <MenuItem key={'Отчет производство'} onClick={handleCloseNavMenu}>
           <Link to="/boss/statistic/production">
                <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Отчет производство</Typography>
               </Link>
        </MenuItem>
        <MenuItem key={'Отчет прайс'} onClick={handleCloseNavMenu}>
           <Link to="/boss/statistic/price">
                <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Отчет прайс</Typography>
               </Link>
        </MenuItem>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
             <MenuItem key={"Выйти"} onClick={logout}>
            {/* <Link className="btn-logout" to="/auth/logout"> */}
              <Typography textAlign="center">Выйти</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
    
  :  login.role === 'Повар' ?


  // навбар повара
  <AppBar position="static" color="secondary">
  <Container maxWidth="xl" >
    <Toolbar disableGutters className='nav-bar-space-between' >
      <Link to='/'>
        <Typography
         variant="h6"
          noWrap
         component="a"
         fontFamily='roboto'
         color='#cd3039'
         sx={{
           mr: 2,
           display: { xs: 'none', md: 'flex' },
           fontWeight: 700,

         }}>
           <img src={logo} className="logo" />
          Gelateria Di Neve
       </Typography>
      </Link>
      <Link to='/'>
       <Typography
         variant="h5"
         noWrap
         component="a"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
           fontWeight: 700,
           fontFamily:'roboto',
           color:'#cd3039',
         }}>
          <img src={logo} className="logo" />
         Gelateria Di Neve 
        </Typography>
      </Link>
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
            <MenuItem key={"Выйти"} onClick={logout}>
              <Typography textAlign="center">Выйти</Typography>
            </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar> 

  :   login.role === 'Технолог' ?
  
   // навбар технолога
   <AppBar position="static" color="secondary">
   <Container maxWidth="xl" >
     <Toolbar disableGutters className='nav-bar-space-between'>
      <Link to='/'>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
             display: { xs: 'none', md: 'flex' },
             fontWeight: 700,
             color: '#cd3039',
              fontFamily: 'roboto'
             }}>
            <img src={logo} className="logo" />
          Gelateria Di Neve Big
        </Typography>
       </Link>
 
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
             <MenuItem key={'Вкусы'} onClick={handleCloseNavMenu}>
             <Link to="/">
               <Typography  className="btn-navBar" textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Вкусы</Typography>
               </Link>
             </MenuItem>
             <MenuItem key={'Ингридиенты'} onClick={handleCloseNavMenu}>
             <Link to="/ingridients">
               <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Ингридиенты</Typography>
               </Link>
             </MenuItem>
         </Menu>
       </Box>
       <Link to='/'>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontWeight: 700,
            color: '#cd3039', 
            fontFamily: 'roboto'

          }}>
          <img src={logo} className="logo" />
          Gelateria Di Neve Small
         </Typography>
       </Link>
       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
       <MenuItem key={'Вкусы'} onClick={handleCloseNavMenu}>
          <Link to="/" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>
               <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Вкусы</Typography>
              </Link>
             </MenuItem>
             <MenuItem key={'Ингридиенты'} onClick={handleCloseNavMenu}>
             <Link to="/ingridients" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>
               <Typography  textAlign="center" sx={{  color: '#cd3039', fontFamily: 'roboto'}}>Ингридиенты</Typography>
              </Link>
             </MenuItem>
       </Box>
 
       <Box sx={{ flexGrow: 0 }}>
         <Tooltip title="Open settings">
           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
             <MenuItem key={"Выйти"} onClick={logout}>
              <Typography textAlign="center">Выйти</Typography>
            </MenuItem>
         </Menu>
       </Box>
     </Toolbar>
   </Container>
 </AppBar> 
 : 
 ''
    )
  );
};
export default ResponsiveAppBar;
