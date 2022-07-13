/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const costpriceRouter = require('express').Router();
const {
  Recipe, RecipePrice, RecipeIngridient, Ingridient, IngridientPrice, Production, UserType, User,
} = require('../../db/models');

function IngridientPrise(el) {
  var result = { updatedAt: '0' };
  for (let i = 0; i < el.IngridientPrices.length; i++) {
    if (el.IngridientPrices[i].updatedAt > result.updatedAt) result = el.IngridientPrices[i];
  }

  return { id: el.id, price: result.price };
}

//

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
  var input_amount = 0;
  var out_amount = 0;
  for (let i = 0; i < el.Productions.length; i++) {
    input_amount += Number(el.Productions[i].input_amount);
    out_amount += Number(el.Productions[i].out_amount);
  }
  const result = ((out_amount / input_amount) - 1).toFixed(2);
  return { recipe_id: el.id, production_losses: result };
}

function collector(el, lossesProd) {
  var loss = 0;
for (let i = 0; i < lossesProd.length; i++) {
 if (lossesProd[i].recipe_id === el.id) {
  loss = lossesProd[i].production_losses;
 }
}
el.production_losses = loss;
return el;
}

costpriceRouter
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
      const collectResult = merdgCostPrice.map((el) => collector(el, lossesProd));

      res.json({ collectResult });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }
  });

  // Создаем Тип у Юзеров
  // .post(async (req, res) => {
  //   const ing = await UserType.create({
  //     title: 'Поваренок',
  //     });
  //   res.json({ ing });
  // });

  // Создаем Юзера
  // .post(async (req, res) => {
  //   const ing = await User.create({
  //     fullname: 'Александр Федотов',
  //     userType_id: 1,
  //     login: 'Alex',
  //     password: '1234',
  //     });
  //   res.json({ ing });
  // });

  // Создаем отчет по продукту, его потери
  // .post(async (req, res) => {
  //   const ing = await Production.create({
  //     user_id: 1,
  //     recipe_id: 3,
  //     input_amount: 2,
  //     out_amount: 1.8,
  //     });
  //   res.json({ ing });
  // });

module.exports = costpriceRouter;
