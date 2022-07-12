const authRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

authRouter.route('/log').post(async (req, res) => {
  try {
    const { login, password } = req.body;
    const checkedUser = await User.findOne(
      {
        where: { login },
        include: [User.UserType],
      },
    );
    const isSame = await bcrypt.compare(password, checkedUser.password);

    if (checkedUser.login === login && isSame) {
      req.session.userId = checkedUser.id;
    }
    res.status(200);
    res.json({
      id: checkedUser.id,
      fullname: checkedUser.fullname,
      role: checkedUser.UserType.title,
    });
  } catch (error) {
    res.status(500);
    res.end();
  }
});

authRouter.route('/reg').post(
  [
    check('login', 'Логин должен быть введен и состоять из латинских символов')
      .matches(/[a-zA-Z]+/i)
      .isLength({
        min: 3,
      }),
    check('password', 'Пароль должен быть минимум 8 символов').isLength({
      min: 8,
    }),
  ],

  async (req, res) => {
    const { errors } = validationResult(req);
    console.log(errors);
    if (errors.length) {
      const message = errors.map((error) => error.msg).join('\n');
      res.json({ success: false, message });
      return;
    }
    let { role } = req.body;
    const { fullname, login, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        res.json({ success: false, message: 'Пользователь с такой почтой уже есть' });
        return;
      }
      if (role === 'Повар') role = '2';
      if (role === 'Технолог') role = '3';

      const user = await User.create({
        fullname,
        userType_id: role,
        login,
        password: await bcrypt.hash(password, 10),
      });
      res.status(200);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  },
);

// const isSame = await bcrypt.compare(password, checkedUser.password);
// переделать с использованием bcrypt

module.exports = authRouter;
