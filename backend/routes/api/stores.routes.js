const storesRouter = require('express').Router();
const { Store } = require('../../db/models');

storesRouter.route('/').put(async (req, res) => {
  const { id, field, value } = req.body;
  console.log(req.body);
  try {
    const sameStore = await Store.findOne({
      where: {
        id,
      },
    });

    if (!sameStore) {
      res.status(406);
      return res.end();
    }
    if (value) sameStore[field] = value;
    await sameStore.save();
    res.status(200);
    res.end();
  } catch (error) {
    res.status(500);
    res.end();
  }
});

module.exports = storesRouter;
