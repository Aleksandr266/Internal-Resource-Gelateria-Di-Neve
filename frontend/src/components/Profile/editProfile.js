import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, changeUserEdit, changeFullName, changeLogin } from '../../store/profile/reducer'
import './style.css'

function EditProfile() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const { user, userEdit } = useSelector((state) => state.profile)

  function handlerFullNameChange(e) {
    dispatch(changeFullName(e.target.value))
  }

  function handlerLoginChange(e) {
    dispatch(changeLogin(e.target.value))
  }

  function edit(e) {
    e.preventDefault() // если раскоментировать то в userEdit будет приходить ответ
    dispatch(editUser(e))
  }

  function final() {
    dispatch(changeUserEdit())
    navigate('/profile')
  }

  return (
    <>
      <div className='glavn'>
        <Box component={Paper} className='container'>
          <Box className='boxProfile'>
            <form onSubmit={edit} className='profile'>
              <div className='div'>Должность: {user['UserType.title']}</div>
              <br />
              <TextField
                id="outlined-basic"
                label="ФИО" 
                variant="outlined" 
                className='div' 
                onChange={(e) => handlerFullNameChange(e)} 
                value={user.fullname} 
                name='fullName'></TextField>
              <br />
              <TextField 
                id="outlined-basic" 
                label="Логин" 
                variant="outlined" 
                className='div' 
                onChange={(e) => handlerLoginChange(e)} 
                value={user.login} 
                name='login' ></TextField>
              <br />
              <Button type='submit' variant="outlined">сохранить</Button>
              <br />
              {
                userEdit.status === true ?
                (<>
                <Button onClick={final} type='submit' variant="outlined">назад</Button>
                <br />
                <div>
                  <div style={{visibility: 'visible'}} id='alertTrue'><Alert severity="success">Данные обновленны</Alert></div>
                </div>
                </>)
                : userEdit.status === false ?
                (<>
                <Button onClick={final} type='submit' variant="outlined">назад</Button>
                <br />
                <div>
                  <div style={{visibility: 'visible'}} id='alertFalse'><Alert severity="error">Пользователь с таким логином уже существует</Alert></div>
                </div>
                </>)
                :
                (<Button onClick={final} type='submit' variant="outlined">назад</Button>)
              }
            </form>
          </Box>
        </Box>
      </div>
      </>
  )
}

export default EditProfile;
