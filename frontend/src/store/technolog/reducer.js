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
  'technolog/loadMarketPrice',
  async (_, { rejectWithValue, dispatch }) => {
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
      // dispatch(marketPriceComplete({data}))

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const changeMarketPrice = createAsyncThunk(
  'technolog/changeMarketPrice',
  async ({ value, id }, { rejectWithValue, dispatch }) => {
    try {
      console.log("Мы попали в редьюсер технолога функцию changeMarketPrice");
      const response = await fetch('/technolog', {
        method: 'PUT',
        body: JSON.stringify({
          value,
          id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('это перед респонсом');
      console.log(response, 'Это респонс');
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      dispatch(changeMarketPriceComplete({ id, value }));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
)

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const recipeSlice = createSlice({
  name: 'technolog',
  initialState: {
    marketPrice: [], // скорее всего это не нужно 
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
    changeMarketPriceComplete(state, action) {
      const findedRecipe = state.marketPriceByBases.find((store) => store.recipes.id === action.payload.id);
      findedRecipe.market_price = action.payload.value;
    },
  },

  extraReducers: {
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadMarketPrice.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.marketPrice = action.payload;
      console.log(state.marketPrice, "это стейт marketPrice");
      state.marketPriceByBases = getCategories(action.payload);
      console.log(state.marketPriceByBases,  "это стейт marketPriceByBases");
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
const { changeMarketPriceComplete } = recipeSlice.actions;
// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;
// export const { marketPriceComplete } = recipeSlice.actions;
// export { removeRecipeIngridients };
export default recipeSlice.reducer;

