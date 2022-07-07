import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import recipeReducer from './recipes/reducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
});
