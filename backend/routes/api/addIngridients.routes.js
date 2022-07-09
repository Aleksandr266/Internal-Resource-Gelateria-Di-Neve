const addIngridientsRouter = require('express').Router();

const { Ingridient, IngridientPrice } = require('../../db/models');

addIngridientsRouter
  .route('/')
  .post(async (req, res) => {
    try {
      const newIngridient = await Ingridient.create({
        title: String(req.body.title),
        fat: +req.body.fat,
        dry_matter: +req.body.dryMatter,
        dry_milk_remainder: +req.body.dryMilkMatter,
        antifris: +req.body.antifris,
        sugar: +req.body.sugar,
        glycemic_index: +req.body.glycemicIndex,
      });
      IngridientPrice.create({ price: +req.body.price, ingridient_id: +newIngridient.id });
      res.json('true');
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = addIngridientsRouter;
