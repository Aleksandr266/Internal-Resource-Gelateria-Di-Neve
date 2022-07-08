import React, { useState } from 'react';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

function Recipe() {
  const [recipes, setRecipe] = useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((res) => res.json())
      .then((res) => setRecipe(res));
  }, []);

  const [recipe] = recipes.filter((el, i) => i === 0);

  return (
    <div className="boxRecipe">
    { recipe && 
      <div className="boxTableRecipe">
          <h1 className="titleRecipes">{recipe['Recipe.title']}</h1>
          <div >
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Ингридиенты</StyledTableCell>
                  <StyledTableCell align="center">Для производства</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                recipes.map((el) => (
                  <TableRow key={el.id}>
                    <StyledTableCell align="center">{el['Ingridient.title']}</StyledTableCell>
                    <StyledTableCell align="center">{el.weight}</StyledTableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    }
    </div>
  );
}

export default Recipe;
