import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngridient } from '../../store/ingridients/reducer'
import Alert from '@mui/material/Alert';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './style.css'

function FormAddIngridients() {

  const dispatch = useDispatch();
  const { addIngridientStatus } = useSelector((state) => state.ingridients)

  function add(e) {
    e.preventDefault()
    dispatch(addIngridient(e))
    document.querySelector('.formAddIngridients').reset()
  }

  useEffect(() => {
    if (addIngridientStatus.status === true) {
      document.querySelector('#alertTrue').style.display = 'block'
    }
    if (addIngridientStatus.status === false) {
      document.querySelector('#alertFalse').style.display = 'block'
    }
  }, [addIngridientStatus])

  return (
    <div className='box'>
      <Box component={Paper} className='boxForm'>
        <h3>Форма добавления ингридиента</h3>
        <form onSubmit={add} className='formAddIngridients'>
          <TextField sx={{marginBottom: '10px'}} required name='title' id="standard-basic" label="Название ингридиента" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='price' id="standard-basic" label="Цена" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='fat' id="standard-basic" label="Содержание жира" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='dryMatter' id="standard-basic" label="Сухая смесь" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='dryMilkMatter' id="standard-basic" label="Сухое молоко" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='antifris' id="standard-basic" label="Антифриз" />
          <TextField sx={{marginBottom: '10px'}} required inputProps={{ step: "0.01" }} type="number" name='sugar' id="standard-basic" label="Сахар" />
          <TextField sx={{marginBottom: '10px'}}  required inputProps={{ step: "0.01" }} type="number" name='glycemicIndex' id="standard-basic" label="Гликемический индекс" />
          <Button type='submit' id='btn' variant="outlined">Добавить Ингридиент</Button>
        </form>
        <div>
          <div style={{marginTop: 10, display: 'none', width: 450}} id='alertTrue'><Alert   severity="success">Ингридиент добавлен</Alert></div>
          <div style={{marginTop: 10, display: 'none', width: 450}} id='alertFalse'><Alert  severity="error">Не удалось добавить ингридиент</Alert></div>
        </div>
      </Box>
    </div>
  )
}

export default FormAddIngridients;
