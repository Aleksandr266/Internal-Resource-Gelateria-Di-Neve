import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadREmployees } from '../../store/boss/reducer';
import { changeStatusEmployee } from '../../store/boss/reducer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

function Employees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.boss);

  useEffect(() => {
    dispatch(loadREmployees());
  }, [dispatch]);

  const handleChange = (id) => {
    dispatch(changeStatusEmployee(id));
  };

  const style = {
    width: '100%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    marginLeft: 10,
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <>
      <Button
        sx={{ margin: '30px 80px' }}
        variant="outlined"
        size="medium"
        onClick={() => navigate('/boss/addEmpoyees')}>
        Добавить сотрудника
      </Button>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {employees.map((empl) => (
          <div key={empl.id}>
            <ListItem button>
              <ListItemText primary={empl.fullname} sx={{ flexDirection: 'row' }} />
              <ListItemText sx={{ justifyContent: 'center' }} primary={empl.role} />
              <Switch
                checked={empl.isWorks}
                onChange={() => handleChange(empl.id)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}

export default Employees;
