/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { loadRecipes, setTodoToggle, productBase } from '../../store/recipes/reducer';
import BaseTable from '../BaseTable/BaseTable';
import ProductionCard from '../ProductionCard/ProductionCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  height: 400,
  flexGrow: 3,
}));

function Bases() {
  const { recipesByBases, basesTodos } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('0');

  const handleToggle = (baseId, id, value) => () => {
    dispatch(productBase({ baseId, value }));
    dispatch(setTodoToggle({ baseId, id }));
  };

  console.log('recipesByBases', recipesByBases);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Вкладки по основам">
            {recipesByBases.map((base, id) => (
              <Tab label={base.category} value={`${id}`} key={base.id} />
            ))}
          </TabList>
        </Box>
        {recipesByBases.map((base, id) => (
          <TabPanel key={base.id} value={`${id}`}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} md={8}>
                <Item>
                  <BaseTable recipes={base.recipes} />
                </Item>
              </Grid>
              <Grid item container direction="column" spacing={2} xs={12} md={4}>
                <Grid item>
                  <ProductionCard base={base} />
                </Grid>
                <Grid item>
                  {basesTodos.filter((baseTodo) => baseTodo.id === base.id) &&
                    basesTodos
                      .filter((baseTodo) => baseTodo.id === base.id)
                      .map((baseTodo, id) => (
                        <List
                          key={id}
                          sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            border: '1px solid #e5c1c1',
                          }}>
                          {baseTodo.todos.map((todo, id) => (
                            <ListItem
                              key={id}
                              onClick={handleToggle(base.id, id, todo.value)}
                              disablePadding>
                              <ListItemButton role={undefined} dense>
                                <Checkbox
                                  edge="start"
                                  checked={todo.isDone}
                                  tabIndex={-1}
                                  disableRipple
                                />
                                <ListItemText primary={`Произвести ${todo.value} кг базы`} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      ))}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default Bases;
