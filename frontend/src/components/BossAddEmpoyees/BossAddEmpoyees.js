import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { registerUser } from '../../store/auth/reducer'
import './style.css'
import { useNavigate } from 'react-router-dom';

function BossAddEmpoyees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value)
    console.log(role);
  }

  function registerForm(e)  {
    e.preventDefault()
    const  role  = e.target.role.value;
    const  fullname  = e.target.fullname.value;
    const  login  = e.target.login.value;
    const  password  = e.target.password.value;
    console.log(role, fullname, login, password);
    dispatch(registerUser({role, fullname, login, password}))
    navigate('/boss/employees')
  }

  return (
    <div className='boxForm'>
       <Box component="form" onSubmit={registerForm} noValidate sx={{ mt: 1 }}>
 
         <FormControl variant="standard" sx={{ m: 1, minWidth: 470 }}>
             <InputLabel id="demo-simple-select-standard-label">Должность</InputLabel>
             <Select
                labelId="demo-simple-select-standard-label"
               id="demo-simple-select-standard"
               value={role}
                onChange={handleChange}
                name='role'
                sx={{ marginBottom: 1 }}
              > 
                <MenuItem value={"Повар"}>Повар</MenuItem>
                <MenuItem value={"Технолог"}>Технолог</MenuItem>
             </Select>
          <TextField  type="text" name='fullname'  label="Фамилия и имя" sx={{ padding: '10px'}}/>
          <TextField  type="text" name='login'  label="Логин" sx={{ padding: '10px'}} />
          <TextField  type="password"  name='password' label="Пароль" sx={{ padding: '10px'}} />
          <Button type='submit' id='btn' color="secondary" variant="outlined">Зарегистрировать</Button>
         </FormControl>
     </Box>
</div>
  );
}

export default BossAddEmpoyees;

