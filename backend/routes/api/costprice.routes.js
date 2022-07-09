const costpriceRouter = require('express').Router();
const { Recipe, RecipeIngridient } = require('../../db/models');

costpriceRouter
  .route('/')
  .get(async (req, res) => {
    const recipes = await Recipe.findAll(
      { include: [Recipe.RecipeIngridients] },
    );
    res.json({ recipes });
  });

module.exports = costpriceRouter;
