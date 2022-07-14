import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, editUser } from '../../store/profile/reducer'
import { changeFullName, changeLogin } from '../../store/profile/reducer'
import './style.css'

function Profile() {

  const { user, userEdit } = useSelector((state) => state.profile)

  const dispatch = useDispatch();
  
  const [isEdit, setEdit] = useState(true)
  
  function showForm() {
    setEdit((prev) => !prev)
  }

  function handlerFullNameChange(e) {
    dispatch(changeFullName(e.target.value))
  }

  function handlerLoginChange(e) {
    dispatch(changeLogin(e.target.value))
  }

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  function edit(e) {
    // e.preventDefault() если раскоментировать то в userEdit будет приходить ответ
    dispatch(editUser(e))
  }

  return (
    <>
      {
        isEdit ?
        (<div className='glavn'>
        <Box component={Paper} className='container'>
          <Box className='boxProfile'>
            <Box className='profile'>
              <div className='div'>Должность: {user['UserType.title']}</div>
              <br />
              <div className='div'>ФИО: {user.fullname}</div>
              <br />
              <div className='div'>Login: {user.login} </div>
              <br />
              <Button onClick={showForm} variant="outlined">изменить</Button>
            </Box>
          </Box>
        </Box>
      </div>)
      :
      (<>
      <div className='glavn'>
        <Box component={Paper} className='container'>
          <Box className='boxProfile'>
            <form onSubmit={edit} className='profile'>
              <div className='div'>Должность: {user['UserType.title']}</div>
              <br />
              <TextField
                id="outlined-basic"
                label="FullName" 
                variant="outlined" 
                className='div' 
                onChange={(e) => handlerFullNameChange(e)} 
                value={user.fullname} 
                name='fullName'></TextField>
              <br />
              <TextField 
                id="outlined-basic" 
                label="Login" 
                variant="outlined" 
                className='div' 
                onChange={(e) => handlerLoginChange(e)} 
                value={user.login} 
                name='login' ></TextField>
              <br />
              <Button type='submit' variant="outlined">сохранить</Button>
            </form>
          </Box>
        </Box>
      </div>
      </>)
      }
    </>
  )
}

export default Profile;
