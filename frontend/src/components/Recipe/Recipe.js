import React from 'react';
import './style.css';
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

const useStyles = makeStyles({
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    boxShadow: '5px 2px 5px grey',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '0px 12px 0px 0px',
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

function Recipe({ recipeId }) {
  const { recipeIngridients } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(loadRecipeById(recipeId));
    return () => dispatch(removeRecipeIngridients());
  }, [dispatch]);

  return (
    <div className="boxRecipe">
      {recipeIngridients.length && (
        <div>
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
                      <StyledTableCell align="center">
                        {((ingridient.weight / 10) * 4).toFixed(3)} кг
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

export default React.memo(Recipe);
