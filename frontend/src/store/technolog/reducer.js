import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCategories = (recipes) => {
  const categories = {};
  console.log(recipes);
  recipes.forEach((recipe) => {
    if (categories.hasOwnProperty(recipe.base)) {
      categories[recipe.base].push(recipe);
    } else {
      categories[recipe.base] = [recipe];
    }
  });
  const bases = [];
  for (const category in categories) {
    bases.push({ category, recipes: categories[category] });
  }
  return bases;  // записывает в action.payload
};

export const loadMarketPrice = createAsyncThunk(
  'recipes/loadMarketPrice',
  async (_, { rejectWithValue, dispatch }) => {
    console.log("Мы попали в редьюсер");
    try {
      const response = await fetch('/technolog', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
        console.log(data, "получили ответ с сервера");
      // dispatch(marketPriceComplete({data}))

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const recipeSlice = createSlice({
  name: 'technolog',
  initialState: {
    marketPrice: [],
    marketPriceByBases: [],
    status: null,
    error: null,
  },
  reducers: {
    // addTodo(state, action) {
    //   state.todos.push(action.payload);
    // },
    // toggleComplete(state, action) {
    //   const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id);
    //   toggledTodo.completed = !toggledTodo.completed;
    // },
    // removeTodo(state, action) {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    // },
    // marketPriceComplete(state, action) {
    //   state.marketPrice = [action.payload];
    // },
    // changeAmountComplete(state, action) {
    //   console.log('Мы попали в функцию в редьюсере');
    //   const findedRecipe = state.recipes.find((store) => store.id === action.payload.id);
    //   findedRecipe.Store.amount = action.payload.value;
    //   console.log(state.recipes, 'Это стейт after');
    //   state.recipesByBases = getCategories(state.recipes);
    // },
  },

  extraReducers: {
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadMarketPrice.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.marketPrice = action.payload;
      state.marketPriceByBases = getCategories(action.payload);
      //не знаю, нужна ли эта строка?
      // state.recipesByBases = getCategories(action.payload);
    },
    [loadMarketPrice.rejected]: setError,
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    // [loadRecipeById.fulfilled]: (state, action) => {
    //   state.status = 'resolved';
    //   state.recipeIngridients = action.payload;
    // },
    // [loadRecipeById.rejected]: setError,
    // [loadMarketPrice.rejected]: setError,
  },
});
// const { changeAmountComplete } = recipeSlice.actions;
// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;
// export const { marketPriceComplete } = recipeSlice.actions;
// export { removeRecipeIngridients };
export default recipeSlice.reducer;

