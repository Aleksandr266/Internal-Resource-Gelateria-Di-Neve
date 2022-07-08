/* eslint-disable import/no-unresolved */
require('dotenv').config();
const express = require('express');
const path = require('path');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

// const authRouter = require('./routes/api/auth.routes');
const recipesRouter = require('./routes/api/recipes.routes');
const ingridientsRouter = require('./routes/api/ingridients.routes');
const storesRouter = require('./routes/api/stores.routes');

const app = express();

const PORT = process.env.PORT ?? 4000;

expressConfig(app);

// app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);
app.use('/ingridients', ingridientsRouter);
app.use('/stores', storesRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

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
