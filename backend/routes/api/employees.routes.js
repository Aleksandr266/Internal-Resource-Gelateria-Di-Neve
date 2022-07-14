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
      const allEmployeesWithoutBoss = allEmployees.filter((obj) => obj['UserType.title'] !== 'Директор');

      const data = allEmployeesWithoutBoss.map((obj) => (
        {
          id: obj.id,
          fullname: obj.fullname,
          isWorks: obj.isWorks,
          role: obj['UserType.title'],

        }
      ));
      res.status(200);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  })
  .put(async (req, res) => {
    const { id } = req.body;
    try {
      const findedEmployee = await User.findOne({
        // raw: true,
        where: {
          id,
        },
      });
      if (!findedEmployee) {
        res.status(406);
        return res.end();
      }
      findedEmployee.isWorks = !findedEmployee.isWorks;
      await findedEmployee.save();

      res.status(200);
      res.json({ id: findedEmployee.id });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  });

module.exports = employeesRouter;
