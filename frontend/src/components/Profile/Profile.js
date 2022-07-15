import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/profile/reducer'
import './style.css'

function Profile() {

  const navigate = useNavigate()

  const { login } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <>
      <div className='glavn'>
        <Box component={Paper} className='container'>
          <Box className='boxProfile'>
            <Box className='profile'>
              <div className='div'>Должность: {user['UserType.title']}</div>
              <br />
              <div className='div'>ФИО: {user.fullname}</div>
              <br />
              <div className='div'>Login: {user.login} </div>
              {
                login.role === 'Директор' 
                ? (<><br /><Button onClick={() => navigate('/editProfile')} variant="outlined">изменить</Button></>)
                : (<></>)
              }
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Profile;
