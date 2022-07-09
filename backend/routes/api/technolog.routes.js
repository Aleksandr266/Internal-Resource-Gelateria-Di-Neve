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
        include: [Recipe.RecipePrices],
      });
      // const titleAndPrice = recipesWithPrice.map((obj) => [obj.id, obj.title, obj.RecipePrices.market_price]);
      console.log(recipesWithPrice[0].RecipePrices[market_price]);

      res.status(200);
      res.json(recipesWithPrice);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

module.exports = technologRouter;
