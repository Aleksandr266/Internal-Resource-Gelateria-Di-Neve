/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const costpriceRouter = require('express').Router();
const {
  Recipe, RecipeIngridient, Ingridient, IngridientPrices,
} = require('../../db/models');

function IngridientPrise(el) {
  return { id: el.id, price: el.IngridientPrices[0].price };
}

function flavorList(els) {
  return { ingridient_id: els.ingridient_id, weight: els.weight };
}

function RecipesINgridient(el) {
  const result = el.RecipeIngridients.map((els) => flavorList(els));

  return { id: el.id, compound: result };
}

function ResultSEBES(priceIngridient, el) {
  var result = 0;
  for (let i = 0; i < el.compound.length; i++) {
    for (let a = 0; a < priceIngridient.length; a++) {
      if (priceIngridient[a].id === el.compound[i].ingridient_id) {
        result += (Number(priceIngridient[a].price) * Number(el.compound[i].weight));
      }
    }
  }
  var rest = result / 10;
  return { id: el.id, price: rest.toFixed(2) };
}

costpriceRouter
  .route('/')
  .get(async (req, res) => {
    const recipes = await Recipe.findAll(
      { include: [Recipe.RecipeIngridients] },
    );
    const ingidients = await Ingridient.findAll(
      { include: [Ingridient.IngridientPrices] },
    );
    const priceIngridient = ingidients.map((el) => IngridientPrise(el));
    const recepesIng = recipes.map((el) => RecipesINgridient(el));
    const result = recepesIng.map((el) => ResultSEBES(priceIngridient, el));
    res.json({ result });
  });

module.exports = costpriceRouter;
