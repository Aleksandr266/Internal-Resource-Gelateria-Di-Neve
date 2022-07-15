/* eslint-disable import/no-unresolved */
require('dotenv').config();
const express = require('express');
const path = require('path');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

// Отдает себестоимость рецептов
const statisticRouter = require('./routes/api/statistic.routes');
const authRouter = require('./routes/api/auth.routes');
const recipesRouter = require('./routes/api/recipes.routes');

const addIngridientsRouter = require('./routes/api/addIngridients.routes');

const ingridientsRouter = require('./routes/api/ingridients.routes');

const basesRouter = require('./routes/api/bases.routes');

const storesRouter = require('./routes/api/stores.routes');

const technologRouter = require('./routes/api/technolog.routes');

const profileRouter = require('./routes/api/profile.routes');
const employeesRouter = require('./routes/api/employees.routes');

const app = express();

const PORT = process.env.PORT ?? 4000;

expressConfig(app);
// Отдает себестоимость рецептов
app.use('/static', statisticRouter);

app.use('/auth', authRouter);

app.use('/profile', profileRouter);

app.use('/recipes', recipesRouter);

app.use('/addIngridients', addIngridientsRouter);

app.use('/ingridients', ingridientsRouter);

app.use('/bases', basesRouter);

app.use('/stores', storesRouter);

app.use('/technolog', technologRouter); // метод GET возвращает id, title, market_price

app.use('/employees', employeesRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.listen(PORT, async () => {
  /* eslint-disable no-console */
  console.log('Веб-сервер слушает порт', PORT);

  try {
    await sequelize.authenticate();
    console.log('БД-сервер подключен успешно');
  } catch (error) {
    console.log('БД-сервер не подключен');
    console.log(error.message);
  }
  /* eslint-enable */
});
