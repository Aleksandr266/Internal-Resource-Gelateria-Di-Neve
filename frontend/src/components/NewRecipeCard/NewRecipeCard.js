import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

export default function NewRecipeCard(base) {
  const { recipe, norms } = useSelector((state) => state.newrecipes);

  const norm = React.useMemo(() => norms.find((norm) => norm.base_id === base.base), [norms, base]);

  console.log('norms', norms);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TableContainer>
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Показатель</TableCell>
                <TableCell align="center">Норматив</TableCell>
                <TableCell align="center">Значение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {norm.params.map((param) => (
                <TableRow key={param.key}>
                  <TableCell align="left">
                    <Typography gutterBottom variant="h6" component="div">
                      {param.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography gutterBottom variant="h5" component="div">
                      {`${param.min || ''}-${param.max || ''}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{ color: param.isNorm ? 'black' : 'red' }}
                      gutterBottom
                      variant="h5"
                      component="div">
                      {Math.round(recipe[param.key] * 100) / 100 || 0}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell align="left">
                  <Typography gutterBottom variant="h6" component="div">
                    Сухие вещества
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.dry_matter * 100) / 100 || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.dry_matter * 100) / 100 || 0}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography gutterBottom variant="h6" component="div">
                    Антифриз
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.antifris * 100) / 100 || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.antifris * 100) / 100 || 0}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography gutterBottom variant="h6" component="div">
                    Сухой молочный остаток
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.dry_milk_remainder * 100) / 100 || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.dry_milk_remainder * 100) / 100 || 0}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography gutterBottom variant="h6" component="div">
                    Сахар
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.sugar * 100) / 100 || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.sugar * 100) / 100 || 0}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography gutterBottom variant="h6" component="div">
                    Гликимический индекс
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.glycemic_index * 100) / 100 || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {Math.round(recipe.glycemic_index * 100) / 100 || 0}
                  </Typography>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
