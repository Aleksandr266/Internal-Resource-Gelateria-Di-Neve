'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('BaseIngridients', [{
        base_id: 1,
        ingridient_id: 1,
        weight: 6.35,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 2,
        weight: 0.9,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 3,
        weight: 1.1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 4,
        weight: 0.55,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 5,
        weight: 0.525,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 6,
        weight: 0.065,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 7,
        weight: 0.01,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 1,
        ingridient_id: 8,
        weight: 0.5,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 10,
        weight: 7.1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 3,
        weight: 1.794,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 4,
        weight: 0.5,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 5,
        weight: 0.5,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 6,
        weight: 0.08,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 11,
        weight: 0.016,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        base_id: 2,
        ingridient_id: 7,
        weight: 0.01,
        createdAt: new Date(),
        updatedAt: new Date(), 
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('BaseIngridients', null, {});
     
  }
};
