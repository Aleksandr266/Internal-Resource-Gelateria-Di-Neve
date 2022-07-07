const { User } = require('../db/models');

async function addUser(req, res, next) {
  res.locals.user = await User.findByPk(req.session.userId);
  next();
}

module.exports = addUser;
