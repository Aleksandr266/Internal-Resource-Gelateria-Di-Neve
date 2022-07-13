import React from 'react';
import './style.css';
import { withStyles, makeStyles } from '@mui/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableContainer';
import { TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
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

function BaseRecipe({ recipeList }) {
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
                    <TableCell className="tableBaseHeader" align="left" colSpan={2}>
                      {recipeList[0]['Base.title']}
                    </TableCell>
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

export default React.memo(BaseRecipe);
