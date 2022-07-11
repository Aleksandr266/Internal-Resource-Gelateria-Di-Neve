const authRouter = require('express').Router();

// const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

authRouter
  .post('/', async (req, res) => {
    try {
      const { login, password } = req.body;
      const checkedUser = await User.findOne(
        {
          where: { login },
          include: [User.UserType],
        },
      );
      // const isSame = await bcrypt.compare(password, checkedUser.password);
      // переделать с использованием bcrypt

      if (checkedUser.login === login && checkedUser.password === password) {
        req.session.userId = checkedUser.id;
      }
      res.status(200);
      res.json({ id: checkedUser.id, fullname: checkedUser.fullname, role: checkedUser.UserType.title });
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

module.exports = authRouter;
