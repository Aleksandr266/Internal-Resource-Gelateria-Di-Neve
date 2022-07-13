import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const calculateRecipeWeight = (base, ingridients) => {
  return ingridients.reduce(
    (acc, ingridient) => acc + Number(ingridient.weight),
    Number(base.weight),
  );
};

const calculateRecipePrice = (base, ingridients) => {
  return ingridients.reduce(
    (acc, ingridient) => acc + Number(ingridient.total_price),
    Number(base.total_price),
  );
};

const normalizer = (recipe, base, ingridients) => {
  const newBase = { ...base, weight: Math.round((base.weight / recipe.weight) * 1000) / 100 };
  const newIngridients = ingridients.map((ingridient) => ({
    ...ingridient,
    weight: Math.round((ingridient.weight / recipe.weight) * 1000) / 100,
  }));
  return { base: newBase, ingridients: newIngridients };
};

export const getBases = createAsyncThunk(
  'newrecipes/getIngridients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/bases', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const newRecipes = createSlice({
  name: 'newrecipes',
  initialState: {
    bases: [],
    base: null,
    ingridients: [],
    recipe: {},
  },
  reducers: {
    setBase(state, action) {
      console.log(action.payload);
      state.base = state.bases.find((base) => base.id === action.payload);
      state.base.weight = 0;
      state.base.total_price = state.base.weight * state.base.price;
      state.recipe.weight = 0;
      state.recipe.total_price = 0;
    },
    addIngridient(state, action) {
      state.ingridients.push({ ...action.payload, weight: 0, total_price: 0 });
    },
    changeBaseWeight(state, action) {
      console.log(action.payload);
      state.base.weight = action.payload;
      state.base.total_price = state.base.weight * state.base.price;
      state.recipe.weight = calculateRecipeWeight(state.base, state.ingridients);
      state.recipe.total_price = calculateRecipePrice(state.base, state.ingridients);
    },
    changeIngridientWeight(state, action) {
      const { id, value } = action.payload;
      const currentIngridient = state.ingridients.find((ingridient) => ingridient.id === id);
      currentIngridient.weight = value;
      currentIngridient.total_price = currentIngridient.weight * currentIngridient.price;
      state.recipe.weight = calculateRecipeWeight(state.base, state.ingridients);
      state.recipe.total_price = calculateRecipePrice(state.base, state.ingridients);
    },
    changeBasePrice(state, action) {
      console.log(action.payload);
      state.base.price = action.payload;
      state.base.total_price = state.base.weight * state.base.price;
    },
    normalizeRecipe(state, action) {
      const { base, ingridients } = normalizer(state.recipe, state.base, state.ingridients);
      console.log('newBase', base);
      console.log('newingridients', ingridients);
      state.base = base;
      state.ingridients = ingridients;
      state.recipe.weight = calculateRecipeWeight(state.base, state.ingridients);
      state.recipe.total_price = calculateRecipePrice(state.base, state.ingridients);
    },
  },

  extraReducers: {
    [getBases.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getBases.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.bases = action.payload.map((base) => ({
        ...base,
        price: base['BasePrices'].sort((a, b) => b.createdAt - a.createdAt)[0].price,
      }));
    },
    [getBases.rejected]: setError,
  },
});
export const {
  normalizeRecipe,
  changeIngridientWeight,
  changeBaseWeight,
  setBase,
  addIngridient,
  changeBasePrice,
} = newRecipes.actions;

export default newRecipes.reducer;
