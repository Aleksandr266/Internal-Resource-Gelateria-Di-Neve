import React from 'react';
import './style.css';
import { withStyles, makeStyles } from '@mui/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import {
  closeRecipe,
  changeInputProduction,
  changeOutputProduction,
  createProduct,
} from '../../store/recipes/reducer';

const useStyles = makeStyles({
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    boxShadow: '5px 2px 5px grey',
  },
});

const StyledTableCell = withStyles((theme) => ({
  // head: {
  //   backgroundColor: theme.palette.common.white,
  //   color: theme.palette.common.black,
  // },
  // body: {
  //   fontSize: 15,
  // },
}))(TableCell);

function Recipe({ recipeId, baseId }) {
  const { recipeIngridients, recipesByBases } = useSelector((state) => state.recipes);
  const { production } = useSelector((state) => state.recipes);
  const { login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log('recipesByBases', recipesByBases);
  console.log('recipeIngridients', recipeIngridients);
  console.log('login', login);

  const recipeIngridient = React.useMemo(() => {
    return recipeIngridients.find((el) => el[0].recipe_id === recipeId);
  }, [recipeIngridients]);

  const { currentInput, currentOutput } = React.useMemo(() => {
    let currentInput, currentOutput;
    if (recipeIngridient) {
      currentInput = production.find((el) => el.recipe_id === recipeIngridient[0].recipe_id)?.input;
      currentOutput = production.find(
        (el) => el.recipe_id === recipeIngridient[0].recipe_id,
      )?.output;
    }
    return { currentInput, currentOutput };
  }, [production, recipeIngridient]);

  function close() {
    dispatch(closeRecipe(recipeId));
  }

  function handleSubmitProduction(e) {
    e.preventDefault();
    const production = {
      user_id: login.id,
      recipe_id: recipeId,
      input_amount: currentInput,
      out_amount: currentOutput,
    };
    console.log('recipesByBases_recipe', recipesByBases);
    console.log('baseId_recipe', baseId);
    const currentBase = recipesByBases.find((base) => base.id === baseId);
    const baseWeight =
      (Number(currentBase.recipes.find((recipe) => recipe.id === recipeId).base_weight) *
        currentInput) /
      10;
    console.log('currentBase.stock', currentBase.stock);
    console.log('baseWeight', baseWeight);
    if (currentBase.stock >= baseWeight) {
      dispatch(createProduct({ production }));
    }
    // console.log(e.target.output.value);
  }

  const handleChangeInput = React.useCallback(
    (e) => {
      dispatch(changeInputProduction({ recipeId, value: e.target.value }));
    },
    [dispatch, recipeId],
  );
  const handleChangeOutput = React.useCallback(
    (e) => {
      dispatch(changeOutputProduction({ recipeId, value: e.target.value }));
    },
    [dispatch, recipeId],
  );

  return (
    <div className="boxRecipe">
      {recipeIngridient && (
        <div>
          <div>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableHeader" align="left">
                      {recipeIngridient[0]['Recipe.title']}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={close}>
                        <CloseIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">Ингридиенты</StyledTableCell>
                    <StyledTableCell align="left">Масса на 4 кг, кг</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeIngridient.map((ingridient) => (
                    <TableRow key={ingridient.ingridient_id}>
                      <StyledTableCell align="left">
                        {ingridient['Ingridient.title']}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {((ingridient.weight / 10) * 4).toFixed(3)}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <form onSubmit={handleSubmitProduction} className="formInputs">
                <TextField
                  required
                  size="small"
                  type="number"
                  sx={{
                    marginBottom: '10px',
                  }}
                  inputProps={{
                    'aria-label': 'weight',
                    step: '0.01',
                    min: '0',
                  }}
                  name="input"
                  id="standard-basic"
                  label="Масса на входе"
                  value={currentInput || 0}
                  onChange={handleChangeInput}
                />
                <TextField
                  required
                  size="small"
                  type="number"
                  sx={{
                    marginBottom: '10px',
                  }}
                  inputProps={{
                    'aria-label': 'weight',
                    step: '0.01',
                    min: '0',
                  }}
                  name="output"
                  id="standard-basic"
                  label="Масса на выходе"
                  value={currentOutput || 0}
                  onChange={handleChangeOutput}
                />
                <Button type="submit" variant="contained">
                  Произвести
                </Button>
              </form>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Recipe);
