import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { loadRecipeById, removeRecipeIngridients } from '../../store/recipes/reducer';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

function Recipe({id}) {
  // const { id } = useParams();

  const { recipeIngridients } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();



  React.useEffect(() => {
    dispatch(loadRecipeById(id));
    return () => dispatch(removeRecipeIngridients());
  }, [dispatch]);

  return (
    <div className="boxRecipe">
      {recipeIngridients.length && (
        <div className="boxTableRecipe">
          <h1 className="titleRecipes">{recipeIngridients[0]['Recipe.title']}</h1>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Ингридиенты</StyledTableCell>
                    <StyledTableCell align="center">Для производства</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeIngridients.map((ingridient) => (
                    <TableRow key={ingridient.ingridient_id}>
                      <StyledTableCell align="center">
                        {ingridient['Ingridient.title']}
                      </StyledTableCell>
                      <StyledTableCell align="center">{(ingridient.weight/10*4).toFixed(3)} кг</StyledTableCell>
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

export default React.memo(Recipe);
