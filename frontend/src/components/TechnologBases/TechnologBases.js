/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import  { Button } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { loadMarketPrice } from '../../store/technolog/reducer';
import BaseTechnologTable from '../BaseTechnologTable/BaseTechnologTable';

function TechnologBases() {
  const navigate = useNavigate();
  const { marketPriceByBases } = useSelector((state) => state.technolog);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    dispatch(loadMarketPrice());
  }, [dispatch]);

  console.log('market', marketPriceByBases);

  return (
    <>
          <Button
        style={{ marginTop: 10 }}
        onClick={() => navigate('/recipes/new')}
        variant="outlined">
        Добавить вкус
      </Button>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Вкладки по основам">
            {marketPriceByBases.map((base, id) => (
              <Tab label={base.category} value={`${id}`} key={id} />
            ))}
          </TabList>
        </Box>
        {marketPriceByBases.map((base, id) => (
          <TabPanel key={id} value={`${id}`}>
            <BaseTechnologTable  marketPrice={base.recipes} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
    </>
  );
}

export default TechnologBases;
