import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadREmployees } from '../../store/boss/reducer'

function Employees() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadREmployees());
  }, [dispatch]);

  return (
    <>
      Это страница босс эмполис
    </>
  );
}

export default Employees;
