/* eslint-disable import/no-unresolved */
const basesRouter = require('express').Router();

const { Base, BaseIngridient, Ingridient } = require('../../db/models');

basesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const bases = await Base.findAll();
      res.status(200);
      res.json(bases);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })
  .put(async (req, res) => {
    const { id, plan } = req.body;
    try {
      const base = await Base.findByPk(id);
      if (plan) base.plan = Number(plan);
      await base.save();
      res.status(200);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

basesRouter.route('/product').put(async (req, res) => {
  const { baseId, value } = req.body;
  try {
    const base = await Base.findByPk(baseId);
    if (value) {
      base.stock = Math.round((Number(base.stock) + Number(value)) * 100) / 100;
      // base.plan = base.plan - Number(value) < 0 ? 0 : base.plan - Number(value);
    }
    await base.save();
    res.status(200);
    res.json(base);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

basesRouter.route('/reset').put(async (req, res) => {
  const { id } = req.body;
  try {
    const base = await Base.findByPk(id);
    base.stock = 0;
    await base.save();
    res.status(200);
    res.json(base);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

basesRouter.route('/:id').get(async (req, res) => {
  try {
    const recipe = await BaseIngridient.findAll({
      // получаем все рецепты, включая ингридиенты
      raw: true,
      where: { base_id: Number(req.params.id) },
      include: [BaseIngridient.Base, BaseIngridient.Ingridient],
    });
    res.status(200);
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

// .post(async (req, res) => {
//   const { title, price, fat, dry_matter, dry_milk_remainder, antifris, sugar, glycemic_index } =
//     req.body;
//   try {
//     const sameIngridient = await Ingridient.findOne({
//       where: {
//         title,
//       },
//     });
//     if (sameIngridient) {
//       res.status(406);
//       return res.end();
//     }
//     const ingridient = await Ingridient.create({
//       title,
//       price,
//       fat,
//       dry_matter,
//       dry_milk_remainder,
//       antifris,
//       sugar,
//       glycemic_index,
//     });
//     res.status(200);
//     res.json(ingridient);
//   } catch (error) {
//     res.status(500);
//     res.end();
//   }
// });

basesRouter.route('/:id').get(async (req, res) => {
  try {
    const ingridient = await Ingridient.findByPk(Number(req.params.id));
    res.status(200);
    res.json(ingridient);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
// .put(async (req, res) => {
//   const { title, price, fat, dry_matter, dry_milk_remainder, antifris, sugar, glycemic_index } =
//     req.body;
//   try {
//     const sameIngridient = await Ingridient.findOne({
//       where: {
//         title,
//       },
//     });
//     if (sameIngridient) {
//       res.status(406);
//       return res.end();
//     }
//     const ingridient = await Ingridient.findByPk(Number(req.params.id));
//     if (title) ingridient.title = title;
//     if (price) ingridient.price = price;
//     if (fat) ingridient.fat = fat;
//     if (dry_matter) ingridient.dry_matter = dry_matter;
//     if (dry_milk_remainder) ingridient.dry_milk_remainder = dry_milk_remainder;
//     if (antifris) ingridient.antifris = antifris;
//     if (sugar) ingridient.sugar = sugar;
//     if (glycemic_index) ingridient.glycemic_index = glycemic_index;
//     await ingridient.save();
//     res.status(200);
//     res.json(ingridient);
//   } catch (error) {
//     res.status(500);
//     res.end();
//   }
// });

module.exports = basesRouter;
