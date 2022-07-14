const technologRouter = require('express').Router();

const {
  Recipe, RecipePrice, Ingridient, Store,
} = require('../../db/models');

function IngridientPrise(el) {
  let result = { updatedAt: '0' };
  for (let i = 0; i < el.IngridientPrices.length; i++) {
    if (el.IngridientPrices[i].updatedAt > result.updatedAt) result = el.IngridientPrices[i];
  }
  return { id: el.id, price: result.price };
}

function flavorList(els) {
  return { ingridient_id: els.ingridient_id, weight: els.weight };
}

function RecipesINgridient(el) {
  const result = el.RecipeIngridients.map((els) => flavorList(els));

  return { id: el.id, compound: result };
}

function ResultSEBES(priceIngridient, el) {
  let result = 0;
  for (let i = 0; i < el.compound.length; i++) {
    for (let a = 0; a < priceIngridient.length; a++) {
      if (priceIngridient[a].id === el.compound[i].ingridient_id) {
        result += (Number(priceIngridient[a].price) * Number(el.compound[i].weight));
      }
    }
  }
  const rest = result / 10;
  return { recipes_id: el.id, cost_price: rest.toFixed(2) };
}

function receivedCostPrice(resultCostPrise, el) {
  for (let i = 0; i < resultCostPrise.length; i++) {
    if (resultCostPrise[i].recipes_id === el.id) {
      el.cost_price = resultCostPrise[i].cost_price;
      return el;
    }
  }
}

function lossCount(el) {
  let input_amount = 0;
  let out_amount = 0;
  for (let i = 0; i < el.Productions.length; i++) {
    input_amount += Number(el.Productions[i].input_amount);
    out_amount += Number(el.Productions[i].out_amount);
  }
  const result = ((out_amount / input_amount) - 1).toFixed(2);
  return { recipe_id: el.id, production_losses: result };
}

function collector(el, lossesProd) {
  let loss = 0;
  for (let i = 0; i < lossesProd.length; i++) {
    if (lossesProd[i].recipe_id === el.id) {
      if (lossesProd[i].production_losses < 0) {
        loss = lossesProd[i].production_losses;
      }
    }
  }
  el.production_losses = loss;
  return el;
}

function storeStandart(el, stores) {
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].recipe_id === el.id) {
      el.standart_store = stores[i].standart;
    }
  }
  return el;
}

technologRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const recipesWithPrice = await Recipe.findAll({
        include: [Recipe.RecipePrices, Recipe.Base],
      });
      const titleAndPrice = recipesWithPrice.map((obj) => (
        {
          id: obj.id,
          title: obj.title,
          base: obj.Base.title,
          market_price: obj.RecipePrices[0].market_price,
        }));
      const losses = await Recipe.findAll(
        { include: [Recipe.Productions] },
      );

      const recipes = await Recipe.findAll(
        { include: [Recipe.RecipeIngridients] },
      );

      const stores = await Store.findAll({ raw: true });

      const ingidients = await Ingridient.findAll(
        {
          include: [Ingridient.IngridientPrices],
          order: [
            ['updatedAt', 'DESC'],
          ],
        },
      );
      const priceIngridient = ingidients.map((el) => IngridientPrise(el));
      const recepesIng = recipes.map((el) => RecipesINgridient(el));
      const resultCostPrise = recepesIng.map((el) => ResultSEBES(priceIngridient, el));
      const lossesProd = losses.map((el) => lossCount(el));
      const merdgCostPrice = titleAndPrice.map((el) => receivedCostPrice(resultCostPrise, el));
      const merdgStoreStandart = merdgCostPrice.map((el) => storeStandart(el, stores));
      const collectResult = merdgStoreStandart.map((el) => collector(el, lossesProd));

      res.json({ collectResult });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  });

technologRouter
  .route('/')
  .put(async (req, res) => {
    const {
      id, value,
    } = req.body;
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
      console.log(error);
      res.status(500);
      res.end();
    }
  });

technologRouter.route('/store')
  .put(async (req, res) => {
    const {
      id, value,
    } = req.body;
    console.log(req.body);
    try {
      const sameStore = await Store.findOne({
        where: {
          recipe_id: id,
        },
      });

      if (!sameStore) {
        res.status(406);
        return res.end();
      }
      if (value) sameStore.standart = value;
      await sameStore.save();
      console.log(sameStore);
      res.status(200);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  });

module.exports = technologRouter;
