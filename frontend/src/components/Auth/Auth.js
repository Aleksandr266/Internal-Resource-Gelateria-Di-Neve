import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/auth/reducer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const login = useSelector((state) => state.auth.login)

const loginForm = (e) => {
  e.preventDefault()
  const  log  = e.target.login.value;
  const  pass  = e.target.password.value;
  // console.log(log, "Login");
  // console.log(pass, "Password");
  dispatch(loginUser({login:log, password:pass}))
  if (login.role === 'Технолог') navigate('/technolog')
  if (login.role === 'Повар') navigate('/')
  if (login.role === 'Директор') navigate('/boss')
}

  return (
    <section className='auth-section'>
    <Box
      component="form"
      onSubmit={loginForm}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className="box-form"
    >
      <div className='form-login'>
        <TextField
          className="input-login"
          id="standard-password-input1"
          label="Login"
          autoComplete="current-password"
          variant="outlined"
          name='login'
        />
         <TextField sx={{ borderRadius: '50%' }}
           className="input-password"
          id="standard-password-input2"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          name='password'
        />
        <Button 
       id='btn-login'
        size="small" type="Submit">Войти</Button>
       
      </div>
    </Box>
     </section>
  );
}
