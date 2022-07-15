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
      if (req.body.login && req.body.fullName) {
        const user = await User.findOne({
          where: { login: req.body.login },
        });
        if (user && user.fullname !== req.body.fullName && user.id === req.session.userId) {
          User.update({
            login: req.body.login,
            fullname: req.body.fullName,
          }, {
            where: {
              id: req.session.userId,
            },
          });
          res.json({ status: true });
        }
        if (user && user.fullname !== req.body.fullName && user.id !== req.session.userId) {
          res.json({ status: false });
        }
        if (!user) {
          await User.update({
            login: req.body.login,
            fullname: req.body.fullName,
          }, {
            where: {
              id: req.session.userId,
            },
          });
          res.json({ status: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = profileRouter;
