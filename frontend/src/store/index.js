import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
// import storeReducer from './stores/reducer'
import recipeReducer from './recipes/reducer';
import technologReducer from './technolog/reducer'

export default configureStore({
  reducer: {
    auth: authReducer,
    // store: storeReducer,
    recipes: recipeReducer,
    technolog: technologReducer,
  },
});
