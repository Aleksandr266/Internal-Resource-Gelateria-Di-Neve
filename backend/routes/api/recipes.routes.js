/* eslint-disable camelcase */
const recipesRouter = require('express').Router();

const { Recipe, RecipeIngridient, RecipePrice, Store } = require('../../db/models');

recipesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const recipes = await Recipe.findAll({
        // raw: true,
        include: [Recipe.Base, Recipe.Store],
      });
      res.status(200);
      res.json(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })
  .post(async (req, res) => {
    // если такого рецепта в БД нет, создаем новый
    const { recipe, recipeIngridients, recipePrice, store } = req.body;
    try {
      const sameRecipe = await Recipe.findOne({
        where: {
          title: recipe.title,
        },
      });
      if (sameRecipe) {
        recipe.title = `${recipe.title}#2`;
      }
      const newRecipe = await Recipe.create(recipe);
      const newRecipeIngridients = recipeIngridients.map((recipeIngridient) => ({
        ...recipeIngridient,
        recipe_id: newRecipe.id,
      }));
      await RecipeIngridient.bulkCreate(newRecipeIngridients);
      const newRecipePrice = { ...recipePrice, recipe_id: newRecipe.id };
      await RecipePrice.create(newRecipePrice);
      const newStore = { ...store, recipe_id: newRecipe.id, amount: 0, plan: 0 };
      await Store.create(newStore);
      res.status(200);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  });

recipesRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const recipe = await RecipeIngridient.findAll({
        // получаем все рецепты, включая ингридиенты
        raw: true,
        where: { recipe_id: Number(req.params.id) },
        include: [RecipeIngridient.Recipe, RecipeIngridient.Ingridient],
      });
      res.status(200);
      res.json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })
  .put(async (req, res) => {
    // перезаписываем данные рецепта
    const { title, base_id, market_price, base_weight, ingridients } = req.body;
    try {
      const recipe_id = Number(req.params.id);
      const sameRecipe = await Recipe.findOne({
        where: {
          title,
        },
      });
      if (sameRecipe) {
        res.status(406);
        return res.end();
      }
      const recipe = await Recipe.findByPk(recipe_id);
      if (title) recipe.title = title;
      if (base_id) recipe.base_id = base_id;
      if (market_price) recipe.market_price = market_price;
      if (base_weight) recipe.base_weight = base_weight;
      if (ingridients.length) {
        await RecipeIngridient.destroy({ where: { recipe_id } });
        await RecipeIngridient.bulkCreate(ingridients);
      }
      await recipe.save();
      res.status(200);
      res.json(recipe);
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

module.exports = recipesRouter;
