const employeesRouter = require('express').Router();

const { User } = require('../../db/models');

employeesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allEmployees = await User.findAll({
        raw: true,
        include: [User.UserType],
      });
      const data = allEmployees.map((obj) => (
        {
          fullname: obj.fullname,
          works: obj.works,
          role: obj['UserType.title'],

        }
      ));
      res.status(200);
      res.json(data);
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

module.exports = employeesRouter;
