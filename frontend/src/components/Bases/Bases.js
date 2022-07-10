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
import { loadRecipes } from '../../store/recipes/reducer';
import BaseTable from '../BaseTable/BaseTable';
import ProductionCard from '../ProductionCard/ProductionCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  height: 400,
  flexGrow: 3,
}));

function Bases() {
  const { recipesByBases } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('0');

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
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Item>
                  <BaseTable recipes={base.recipes} />
                </Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <ProductionCard base={base} />
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default Bases;
