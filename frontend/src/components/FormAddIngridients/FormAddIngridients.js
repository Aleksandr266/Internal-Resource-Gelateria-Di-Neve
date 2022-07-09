import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css'

function FormAddIngridients() {

  function addIngridient(e) {
    e.preventDefault()
    // console.log(e.target.title.value)
    fetch('/addIngridients', {
      method: 'POST',
      body: JSON.stringify({
        title: e.target.title.value,
        price: e.target.price.value,
        fat: e.target.fat.value,
        dryMatter: e.target.dryMatter.value,
        dryMilkMatter: e.target.dryMilkMatter.value,
        antifris: e.target.antifris.value,
        sugar: e.target.sugar.value,
        glycemicIndex: e.target.glycemicIndex.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
  }

  return (
    <div className='boxForm'>
        <h3>Форма добавления ингридиента</h3>
      <form onSubmit={addIngridient} className='formAddIngridients'>
        <TextField name='title' id="standard-basic" label="Название ингридиента" />
        <TextField inputProps={{ step: "0.01" }} type="number" name='price' id="standard-basic" label="Цена" />
        <TextField inputProps={{ step: "0.01" }} name='fat' id="standard-basic" label="Содержание жира" />
        <TextField inputProps={{ step: "0.01" }} name='dryMatter' id="standard-basic" label="Сухая смесь" />
        <TextField inputProps={{ step: "0.01" }} name='dryMilkMatter' id="standard-basic" label="Сухое молоко" />
        <TextField inputProps={{ step: "0.01" }} name='antifris' id="standard-basic" label="Антифриз" />
        <TextField inputProps={{ step: "0.01" }} name='sugar' id="standard-basic" label="Сахар" />
        <TextField inputProps={{ step: "0.01" }} name='glycemicIndex' id="standard-basic" label="Гликемический индекс" />
        <Button type='submit' id='btn' variant="outlined">Добавить Ингридиент</Button>
      </form>
    </div>
  )
}

export default FormAddIngridients;
