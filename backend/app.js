require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

// const authRouter = require('./routes/api/auth.routes');
const recipesRouter = require('./routes/api/recipes.routes');
const ingridientsRouter = require('./routes/api/ingridients.routes');

const app = express();

const PORT = process.env.PORT ?? 4000;

expressConfig(app);

// app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);
app.use('/ingridients', ingridientsRouter);
app.get('*', (req, res) => {
  res.send('Страница не найдена');
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
