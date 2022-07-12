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
import { useSelector } from 'react-redux';

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
    // padding: '0px 12px 0px 0px',
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.red,
    // padding: '0px 12px 0px 0px',
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

function Recipe({ recipeId }) {
  const { recipeIngridients } = useSelector((state) => state.recipes);

  const recipeIngridient = React.useMemo(() => {
    console.log('MEMO', recipeIngridients);
    return recipeIngridients.find((el) => el[0].recipe_id === recipeId);
  }, [recipeIngridients]);

  return (
    <div className="boxRecipe">
      {recipeIngridient && (
        <div>
          {/* <h1 className="titleRecipes">{recipeIngridient[0]['Recipe.title']}</h1> */}
          <div>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableHeader" align="left" colSpan={2}>
                      {recipeIngridient[0]['Recipe.title']}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">Ингридиенты</StyledTableCell>
                    <StyledTableCell align="left">Масса, кг</StyledTableCell>
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
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Recipe);
