const ingridientsRouter = require('express').Router();

const { Ingridient } = require('../../db/models');

ingridientsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const ingridients = await Ingridient.findAll();
      res.status(200);
      res.json(ingridients);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })
  .post(async (req, res) => {
    const { title, price, fat, dry_matter, dry_milk_remainder, antifris, sugar, glycemic_index } =
      req.body;
    try {
      const sameIngridient = await Ingridient.findOne({
        where: {
          title,
        },
      });
      if (sameIngridient) {
        res.status(406);
        return res.end();
      }
      const ingridient = await Ingridient.create({
        title,
        price,
        fat,
        dry_matter,
        dry_milk_remainder,
        antifris,
        sugar,
        glycemic_index,
      });
      res.status(200);
      res.json(ingridient);
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

ingridientsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const ingridient = await Ingridient.findByPk(Number(req.params.id));
      res.status(200);
      res.json(ingridient);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })
  .put(async (req, res) => {
    const { title, price, fat, dry_matter, dry_milk_remainder, antifris, sugar, glycemic_index } =
      req.body;
    try {
      const sameIngridient = await Ingridient.findOne({
        where: {
          title,
        },
      });
      if (sameIngridient) {
        res.status(406);
        return res.end();
      }
      const ingridient = await Ingridient.findByPk(Number(req.params.id));
      if (title) ingridient.title = title;
      if (price) ingridient.price = price;
      if (fat) ingridient.fat = fat;
      if (dry_matter) ingridient.dry_matter = dry_matter;
      if (dry_milk_remainder) ingridient.dry_milk_remainder = dry_milk_remainder;
      if (antifris) ingridient.antifris = antifris;
      if (sugar) ingridient.sugar = sugar;
      if (glycemic_index) ingridient.glycemic_index = glycemic_index;
      await ingridient.save();
      res.status(200);
      res.json(ingridient);
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

module.exports = ingridientsRouter;
