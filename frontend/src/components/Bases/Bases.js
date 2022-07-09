/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import './style.css';
// import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { loadRecipes } from '../../store/recipes/reducer';
import BaseTable from '../BaseTable/BaseTable';

function Bases() {
  const { recipesByBases, recipes } = useSelector((state) => state.recipes);
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
            <BaseTable recipes={base.recipes} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default Bases;
