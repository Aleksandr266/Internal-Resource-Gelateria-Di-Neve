const recipesRouter = require('express').Router();

const { Recipe, RecipeIngridient } = require('../db/models');

recipesRouter.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      raw: true,
      include: [Recipe.Category],
    });
    res.status(200);
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});

recipesRouter.get('/:id', async (req, res) => {
  try {
    const recipe = await RecipeIngridient.findAll({
      raw: true,
      where: { recipe_id: Number(req.params.id) },
      include: [RecipeIngridient.Recipe, RecipeIngridient.Ingridient],
    });
    res.status(200);
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});
