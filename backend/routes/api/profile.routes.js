const profileRouter = require('express').Router();

const { User } = require('../../db/models');

profileRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const id = req.session.userId;
      const user = await User.findOne({
        where: { id },
        include: [User.UserType],
        raw: true,
      });
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  });

profileRouter
  .route('/edit')
  .put(async (req, res) => {
    try {
      if (req.body.fullName === '' && req.body.login) {
        const user = await User.findOne({
          where: { login: req.body.login },
        });
        if (!user) {
          await User.update({ login: req.body.login }, {
            where: {
              id: req.session.userId,
            },
          });
          res.json({ status: 'Ваши данные успешно изменены' });
        }
        res.json({ status: 'Пользователь с таким логином уже существует' });
      }
      if (req.body.login === '' && req.body.fullName) {
        await User.update({ fullname: req.body.fullName }, {
          where: {
            id: req.session.userId,
          },
        });
        res.json({ status: 'Ваши данные успешно изменены' });
      }
      if (req.body.login && req.body.fullName) {
        const user = await User.findOne({
          where: { login: req.body.login },
        });
        if (!user) {
          await User.update({ login: req.body.login, fullname: req.body.fullName }, {
            where: {
              id: req.session.userId,
            },
          });
          res.json({ status: 'Ваши данные успешно изменены' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = profileRouter;
