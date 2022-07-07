'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('RecipeIngridients', [{
        recipe_id: 1,
        ingridient_id: 2,
        weight: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 1,
        ingridient_id: 3,
        weight: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 1,
        ingridient_id: 4,
        weight: 0.05,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 1,
        ingridient_id: 8,
        weight: 0.15,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 2,
        ingridient_id: 3,
        weight: 0.2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 2,
        ingridient_id: 4,
        weight: 0.2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 2,
        ingridient_id: 9,
        weight: 0.65,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 3,
        ingridient_id: 12,
        weight: 4.22,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 3,
        ingridient_id: 13,
        weight: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 3,
        ingridient_id: 3,
        weight: 0.4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 3,
        ingridient_id: 4,
        weight: 0.35,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 3,
        ingridient_id: 5,
        weight: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 4,
        ingridient_id: 14,
        weight: 2.65,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 4,
        ingridient_id: 3,
        weight: 0.4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 4,
        ingridient_id: 4,
        weight: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 4,
        ingridient_id: 5,
        weight: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        recipe_id: 4,
        ingridient_id: 15,
        weight: 0.05,
        createdAt: new Date(),
        updatedAt: new Date(), 
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('RecipeIngridients', null, {});
     
  }
};
