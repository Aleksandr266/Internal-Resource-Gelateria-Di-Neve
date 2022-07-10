const technologRouter = require('express').Router();

const { Recipe } = require('../../db/models');

technologRouter
  .route('/')
  .get(async (req, res) => {
    // const { id } = req.body;
    try {
      const recipesWithPrice = await Recipe.findAll({
        // where: {
        //   id,
        // },
        include: [Recipe.RecipePrices, Recipe.Base],
      });
      const titleAndPrice = recipesWithPrice.map((obj) => (
        {
          id: obj.id,
          title: obj.title,
          base: obj.Base.title,
          market_price: obj.RecipePrices[0].market_price,
        }));

      res.status(200);
      res.json(titleAndPrice);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

module.exports = technologRouter;
