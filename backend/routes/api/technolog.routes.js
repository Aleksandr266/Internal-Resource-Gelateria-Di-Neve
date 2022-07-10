const technologRouter = require('express').Router();

const { Recipe, RecipePrice } = require('../../db/models');

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
  })
  .put(async (req, res) => {
    const {
      id, value,
    } = req.body;
    console.log(req.body);
    try {
      const sameRecipe = await RecipePrice.findOne({
        where: {
          recipe_id: id,
        },
      });

      if (!sameRecipe) {
        res.status(406);
        return res.end();
      }
      if (value) sameRecipe.market_price = value;
      await sameRecipe.save();
      res.status(200);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

module.exports = technologRouter;
