import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngridient } from '../../store/ingridients/reducer'
import Alert from '@mui/material/Alert';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
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
      document.querySelector('#alertTrue').style.visibility = 'visible'
    }
    if (addIngridientStatus.status === false) {
      document.querySelector('#alertFalse').style.visibility = 'visible'
    }
  }, [addIngridientStatus])

  return (
    <div className='boxForm'>
        <h3>Форма добавления ингридиента</h3>
      <form onSubmit={add} className='formAddIngridients'>
        <TextField required name='title' id="standard-basic" label="Название ингридиента" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='price' id="standard-basic" label="Цена" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='fat' id="standard-basic" label="Содержание жира" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='dryMatter' id="standard-basic" label="Сухая смесь" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='dryMilkMatter' id="standard-basic" label="Сухое молоко" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='antifris' id="standard-basic" label="Антифриз" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='sugar' id="standard-basic" label="Сахар" />
        <TextField required inputProps={{ step: "0.01" }} type="number" name='glycemicIndex' id="standard-basic" label="Гликемический индекс" />
        <Button type='submit' id='btn' variant="outlined">Добавить Ингридиент</Button>
      </form>
      <div>
        <div style={{visibility: 'hidden'}} id='alertTrue'><Alert   severity="success">Ингридиент добавлен</Alert></div>
        <div style={{visibility: 'hidden'}} id='alertFalse'><Alert  severity="error">Не удалось добавить ингридиент</Alert></div>
      </div>
    </div>
  )
}

export default FormAddIngridients;
