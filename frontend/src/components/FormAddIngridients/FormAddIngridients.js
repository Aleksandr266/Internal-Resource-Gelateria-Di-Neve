import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css'

function FormAddIngridients() {

  return (
    <div className='boxForm'>
        <h3>Форма добавления ингридиента</h3>
      <form className='formAddIngridients'>
      <TextField id="standard-basic" label="Название ингридиента" />
      <TextField id="standard-basic" label="Содержание жира" />
      <TextField id="standard-basic" label="Сухая смесь" />
      <TextField id="standard-basic" label="Сухое молоко" />
      <TextField id="standard-basic" label="Антифриз" />
      <TextField id="standard-basic" label="Сахар" />
      <TextField id="standard-basic" label="Гликемический индекс" />
      <Button id='btn' variant="outlined">Добавить Ингридиент</Button>
      </form>
    </div>
  )
}

export default FormAddIngridients;
