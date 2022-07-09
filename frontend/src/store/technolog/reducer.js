// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const getCategories = (recipes) => {
//   const categories = {};
//   console.log(recipes);
//   recipes.forEach((recipe) => {
//     if (categories.hasOwnProperty(recipe.Base.title)) {
//       categories[recipe.Base.title].push(recipe);
//     } else {
//       categories[recipe.Base.title] = [recipe];
//     }
//   });
//   const bases = [];
//   for (const category in categories) {
//     bases.push({ id: categories[category][0].base_id, category, recipes: categories[category] });
//   }
//   return bases;
// };

