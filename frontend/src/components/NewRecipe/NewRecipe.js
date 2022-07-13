/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngridients } from '../../store/ingridients/reducer';
import { getBases, setBase, addIngridient } from '../../store/newrecipes/reducer';

function NewRecipe() {
  const dispatch = useDispatch();
  const { ingridients } = useSelector((state) => state.ingridients);
  const { base, bases, ingridients: currIngridients } = useSelector((state) => state.newrecipes);
  const [selectValue, setSelectValue] = React.useState('');

  React.useEffect(() => {
    dispatch(getIngridients());
    dispatch(getBases());
  }, [dispatch]);

  const handleChooseBase = React.useCallback((event) => {
    setSelectValue(event.target.value);
  }, []);

  console.log('currIngridients', currIngridients);

  const handleClickBase = React.useCallback(() => {
    dispatch(setBase(selectValue));
    setSelectValue('');
    console.log(selectValue);
  }, [selectValue]);

  const handleClickIngridient = React.useCallback(() => {
    const choiseIngridient = ingridients.find((ingridient) => ingridient.id === selectValue);
    console.log(choiseIngridient);
    dispatch(addIngridient(choiseIngridient));
    setSelectValue('');
    console.log(selectValue);
    console.log('first');
  }, [selectValue, ingridients]);

  return (
    <Box sx={{ width: '100%', typography: 'body1', padding: '24px' }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Ингридиент</TableCell>
                  <TableCell align="center">Масса на 10 кг продукта, кг</TableCell>
                  <TableCell align="center">Цена, руб</TableCell>
                  <TableCell align="center">Стоимость, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {base && (
                  <TableRow>
                    <TableCell align="left">{base.title}</TableCell>
                    <TableCell align="center">
                      <OutlinedInput
                        size="small"
                        type="number"
                        sx={{ maxWidth: 120 }}
                        defaultValue="0"
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                          step: '0.01',
                          min: '0',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <OutlinedInput
                        size="small"
                        type="number"
                        sx={{ maxWidth: 120 }}
                        defaultValue="0"
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                          step: '0.01',
                          min: '0',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">500</TableCell>
                  </TableRow>
                )}
                {!!currIngridients.length && (
                  <>
                    {currIngridients.map((currIngridient) => (
                      <TableRow key={currIngridient.id}>
                        <TableCell align="left">{currIngridient.title}</TableCell>
                        <TableCell align="center">
                          <OutlinedInput
                            size="small"
                            type="number"
                            sx={{ maxWidth: 120 }}
                            defaultValue="0"
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                              step: '0.01',
                              min: '0',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <OutlinedInput
                            size="small"
                            type="number"
                            sx={{ maxWidth: 120 }}
                            defaultValue="0"
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                              step: '0.01',
                              min: '0',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">500</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                <TableRow>
                  <TableCell align="left">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">Выбрать</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={selectValue}
                        label="Выбрать"
                        onChange={handleChooseBase}>
                        <MenuItem value="0">
                          <em>Не выбрано</em>
                        </MenuItem>
                        {base
                          ? ingridients.map((ingridient) => (
                              <MenuItem key={ingridient.id} value={ingridient.id}>
                                {ingridient.title}
                              </MenuItem>
                            ))
                          : bases.map((baseItem) => (
                              <MenuItem key={baseItem.id} value={baseItem.id}>
                                {baseItem.title}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1.2, maxWidth: 10 }}>
                      <Button
                        onClick={!base ? handleClickBase : handleClickIngridient}
                        variant="contained">
                        +
                      </Button>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={12} md={4}>
          <Grid item>Карточка</Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewRecipe;
