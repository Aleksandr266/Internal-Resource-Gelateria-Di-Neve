import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { putBasesPlan } from '../../store/recipes/reducer';

export default function BasicCard({ base }) {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(putBasesPlan({ id: base.id, plan: base.plan }));
  }, [dispatch, base]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {base.category}
        </Typography>
        <Typography variant="h5" component="div">
          {base.plan}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          кг, всего в производство на сегодня
        </Typography>
        <Typography variant="body2">Удачной работы!</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Начать производство базы
        </Button>
      </CardActions>
    </Card>
  );
}
