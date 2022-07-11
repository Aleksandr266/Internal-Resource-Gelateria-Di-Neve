import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCategories = (recipes) => {
  const categories = {};
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
      console.log("привет");
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


/// изменение стандарта наличия
export const changeStandartStore = createAsyncThunk(
  'technolog/changeStandartStore',
  async ({ value, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/technolog/store', {
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
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      dispatch(changeStandartStoreComplete({ id, value }));
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
      console.log(state,9999999999999999999)
      const findedRecipe = state.marketPrice.find((store) => store.id === action.payload.id);
      findedRecipe.market_price = action.payload.value;
      state.marketPriceByBases = getCategories(state.marketPrice);
    },
    changeStandartStoreComplete(state, action) {
      const findedRecipe = state.marketPrice.find((store) => store.id === action.payload.id);
      findedRecipe.standart_store = action.payload.value;
      state.marketPriceByBases = getCategories(state.marketPrice);
    },
  },

  extraReducers: {
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadMarketPrice.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.marketPrice = action.payload.collectResult;
  
      state.marketPriceByBases = getCategories(action.payload.collectResult);
   
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

const { changeMarketPriceComplete, changeStandartStoreComplete } = recipeSlice.actions;
// const { changeStandartStoreComplete } = recipeSlice.actions;
// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;
// export const { marketPriceComplete } = recipeSlice.actions;
// export { removeRecipeIngridients };
export default recipeSlice.reducer;

