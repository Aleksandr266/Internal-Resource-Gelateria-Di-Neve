require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

const authRouter = require('./routes/api/auth.routes');

const app = express();

const PORT = process.env.PORT ?? 4000;

expressConfig(app);

// подключаем роутеры
app.use('/auth', authRouter);
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
