import React from 'react';
import './style.css';
import { withStyles, makeStyles } from '@mui/styles';
import { Button, Table, TextField } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { closeBaseRecipe, changeNeed } from '../../store/recipes/reducer';

// const useStyles = makeStyles({
//   sticky: {
//     position: 'sticky',
//     left: 0,
//     background: 'white',
//     boxShadow: '5px 2px 5px grey',
//   },
// });

const StyledTableCell = withStyles((theme) => ({
  // head: {
  //   backgroundColor: theme.palette.common.white,
  //   color: theme.palette.common.black,
  //   // padding: '0px 12px 0px 0px',
  // },
  // body: {
  //   fontSize: 15,
  // },
}))(TableCell);

function BaseRecipe({ recipeList }) {
  const dispatch = useDispatch();
  const { basesTodos, need } = useSelector((state) => state.recipes);

  const handleCloseRecipe = React.useCallback(() => {
    dispatch(closeBaseRecipe(recipeList[0]['Base.id']));
  }, [dispatch]);

  const handleChangeNeed = React.useCallback(
    (e) => {
      dispatch(changeNeed(e.target.value));
    },
    [dispatch],
  );

  const currentNeed = React.useMemo(() => {
    console.log('basesTodos', basesTodos);
    const currentTodos = basesTodos.find((todo) => todo.id === recipeList[0]['Base.id']);
    const currentList = currentTodos ? currentTodos.todos : null;
    console.log('currentList', currentList);
    return currentList ? currentList[0].value : need;
  }, [basesTodos, need]);

  return (
    <div className="boxRecipe">
      {recipeList && (
        <div>
          {/* <h1 className="titleRecipes">{recipeIngridient[0]['Recipe.title']}</h1> */}
          <div>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableBaseHeader" align="left">
                      {recipeList[0]['Base.title']}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={handleCloseRecipe}>
                        <CloseIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left" colSpan={2}>
                      <TextField
                        id="outlined-basic"
                        label="Потребность, кг"
                        size="small"
                        type="number"
                        value={currentNeed}
                        onChange={handleChangeNeed}
                        variant="outlined"
                        sx={{
                          maxWidth: '200px',
                        }}
                        inputProps={{
                          'aria-label': 'weight',
                          step: '0.01',
                          min: '0',
                        }}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">Ингридиенты</StyledTableCell>
                    <StyledTableCell align="left">Масса, кг</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeList.map((ingridient) => (
                    <TableRow key={ingridient.ingridient_id}>
                      <StyledTableCell align="left">
                        {ingridient['Ingridient.title']}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {((ingridient.weight * currentNeed) / 10).toFixed(3)}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(BaseRecipe);
