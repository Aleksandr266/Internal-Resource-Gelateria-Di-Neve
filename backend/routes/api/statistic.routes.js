/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
const statisticRouter = require('express').Router();
const {
  Recipe, RecipePrice, RecipeIngridient, Ingridient, IngridientPrice, Production, UserType, User,
} = require('../../db/models');

function volumeCalculator(el, data) {
  console.log(data);
  var { title } = el;
  var volume = 0;
  var volueMont = 0;
  el.Productions.forEach((element) => {
     volume += Number(element.out_amount);
    if (element.createdAt > data) {
      volueMont += Number(element.out_amount);
    }
    });
  return { recipes: { title: el.title, allTime: (volume).toFixed(2), month: (volueMont).toFixed(2) } };
}

function collectData(productionVolumes) {
  var titles = [];
  var allTimes = [];
  var months = [];
  for (let i = 0; i < productionVolumes.length; i++) {
    titles.push(productionVolumes[i].recipes.title);
    allTimes.push(productionVolumes[i].recipes.allTime);
    months.push(productionVolumes[i].recipes.month);
  }
  return { title: titles, allTime: allTimes, month: months };
}

statisticRouter
  .route('/')
  .get(async (req, res) => {
    const production = await Recipe.findAll(
      { include: [Recipe.Productions] },
    );
    const data = new Date();
    var d = data.setMonth(data.getMonth() - 1);
    const productionVolumes = production.map((el) => volumeCalculator(el, data));
    const productionData = collectData(productionVolumes);
    res.json({ productionData });
  });

module.exports = statisticRouter;
