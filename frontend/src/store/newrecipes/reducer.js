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

const calculateRecipeCharacteristics = (recipe, base, ingridients) => {
  const fat =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.fat) * Number(ingridient.weight),
      Number(base.fat) * Number(base.weight),
    ) / 10;
  const dry_matter =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.dry_matter) * Number(ingridient.weight),
      Number(base.dry_matter) * Number(base.weight),
    ) / 10;
  const antifris =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.antifris) * Number(ingridient.weight),
      Number(base.antifris) * Number(base.weight),
    ) / 10;
  const dry_milk_remainder =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.dry_milk_remainder) * Number(ingridient.weight),
      Number(base.dry_milk_remainder) * Number(base.weight),
    ) / 10;
  const sugar =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.sugar) * Number(ingridient.weight),
      Number(base.sugar) * Number(base.weight),
    ) / 10;
  const glycemic_index =
    ingridients.reduce(
      (acc, ingridient) => acc + Number(ingridient.glycemic_index) * Number(ingridient.weight),
      Number(base.glycemic_index) * Number(base.weight),
    ) / 10;
  return { fat, dry_matter, antifris, dry_milk_remainder, sugar, glycemic_index };
};

const normalizer = (recipe, base, ingridients) => {
  const newBase = { ...base, weight: Math.round((base.weight / recipe.weight) * 1000) / 100 };
  const newIngridients = ingridients.map((ingridient) => ({
    ...ingridient,
    weight: Math.round((ingridient.weight / recipe.weight) * 1000) / 100,
  }));
  return { base: newBase, ingridients: newIngridients };
};

const testNorm = (recipe, norms) => {
  return norms.map((norm) => {
    if (norm.base_id === recipe.base_id) {
      norm.params = norm.params.map((param) => {
        param.isNorm = param.min
          ? Number(recipe[param.key]) >= param.min && Number(recipe[param.key]) <= param.max
          : true;
        return param;
      });
    }
    return norm;
  });
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

export const getIngridients = createAsyncThunk(
  'ingridients/getIngridients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/ingridients', {
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
    allIngridients: [],
    ingridients: [],
    patterns: {
      1: [1, 2, 3, 4, 5, 6, 8],
      2: [3, 4, 5, 6, 10],
    },
    recipe: {},
    norms: [
      {
        base_id: 1,
        params: [
          {
            title: 'Жирность',
            key: 'fat',
            min: 3,
            max: 9,
            isNorm: false,
          },
          {
            title: 'Сухие вещества',
            key: 'dry_matter',
            min: 35,
            max: 42,
            isNorm: false,
          },
          {
            title: 'Сахар',
            key: 'sugar',
            min: 18,
            max: 25,
            isNorm: false,
          },
          {
            title: 'Антифриз',
            key: 'antifris',
            min: 26,
            max: 34,
            isNorm: false,
          },
          {
            title: 'Сухой молочный остаток',
            key: 'dry_milk_remainder',
            min: 5,
            max: 12,
            isNorm: false,
          },
          {
            title: 'Гликимический индекс',
            key: 'glycemic_index',
            isNorm: true,
          },
        ],
      },
      {
        base_id: 2,
        params: [
          {
            title: 'Жирность',
            key: 'fat',
            isNorm: true,
          },
          {
            title: 'Сухие вещества',
            key: 'dry_matter',
            min: 32,
            max: 45,
            isNorm: false,
          },
          {
            title: 'Сахар',
            key: 'sugar',
            min: 25,
            max: 30,
            isNorm: false,
          },
          {
            title: 'Антифриз',
            key: 'antifris',
            min: 26,
            max: 34,
            isNorm: false,
          },
          {
            title: 'Гликимический индекс',
            key: 'glycemic_index',
            isNorm: true,
          },
        ],
      },
    ],
  },
  reducers: {
    setBase(state, action) {
      state.base = state.bases.find((base) => base.id === action.payload);
      state.base.weight = 0;
      state.base.total_price = state.base.weight * state.base.price;
      state.recipe.base_id = action.payload;
      state.recipe.weight = 0;
      state.recipe.total_price = 0;
    },
    deleteBase(state, action) {
      state.base = null;
      state.allIngridients = [...state.allIngridients, ...state.ingridients];
      state.ingridients = [];
    },
    addIngridient(state, action) {
      state.allIngridients.splice(
        state.allIngridients.findIndex((ingridient) => ingridient.id === action.payload.id),
        1,
      );
      state.ingridients.push({ ...action.payload, weight: 0, total_price: 0 });
    },
    addIngridientsFromPattern(state, action) {
      for (let item of state.patterns[state.base.id]) {
        console.log(item);
        const [currentIngridient] = state.allIngridients.splice(
          state.allIngridients.findIndex((ingridient) => ingridient.id === item),
          1,
        );
        state.ingridients.push({ ...currentIngridient, weight: 0, total_price: 0 });
      }
    },
    deleteIngridient(state, action) {
      const id = action.payload;
      console.log('reducer id', id);
      state.allIngridients.push(state.ingridients.find((ingridient) => ingridient.id === id));
      state.ingridients.splice(
        state.ingridients.findIndex((ingridient) => ingridient.id === id),
        1,
      );
    },
    changeBaseWeight(state, action) {
      console.log(action.payload);
      state.base.weight = action.payload;
      state.base.total_price = state.base.weight * state.base.price;
      state.recipe.weight = calculateRecipeWeight(state.base, state.ingridients);
      state.recipe.total_price = calculateRecipePrice(state.base, state.ingridients);
      const { fat, dry_matter, antifris, dry_milk_remainder, sugar, glycemic_index } =
        calculateRecipeCharacteristics(state.recipe, state.base, state.ingridients);
      state.recipe.fat = fat;
      state.recipe.dry_matter = dry_matter;
      state.recipe.antifris = antifris;
      state.recipe.dry_milk_remainder = dry_milk_remainder;
      state.recipe.sugar = sugar;
      state.recipe.glycemic_index = glycemic_index;
      state.norms = testNorm(state.recipe, state.norms);
    },
    changeIngridientWeight(state, action) {
      const { id, value } = action.payload;
      const currentIngridient = state.ingridients.find((ingridient) => ingridient.id === id);
      currentIngridient.weight = value;
      currentIngridient.total_price = currentIngridient.weight * currentIngridient.price;
      state.recipe.weight = calculateRecipeWeight(state.base, state.ingridients);
      state.recipe.total_price = calculateRecipePrice(state.base, state.ingridients);
      const { fat, dry_matter, antifris, dry_milk_remainder, sugar, glycemic_index } =
        calculateRecipeCharacteristics(state.recipe, state.base, state.ingridients);
      state.recipe.fat = fat;
      state.recipe.dry_matter = dry_matter;
      state.recipe.antifris = antifris;
      state.recipe.dry_milk_remainder = dry_milk_remainder;
      state.recipe.sugar = sugar;
      state.recipe.glycemic_index = glycemic_index;
      state.norms = testNorm(state.recipe, state.norms);
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
      const { fat, dry_matter, antifris, dry_milk_remainder, sugar, glycemic_index } =
        calculateRecipeCharacteristics(state.recipe, state.base, state.ingridients);
      state.recipe.fat = fat;
      state.recipe.dry_matter = dry_matter;
      state.recipe.antifris = antifris;
      state.recipe.dry_milk_remainder = dry_milk_remainder;
      state.recipe.sugar = sugar;
      state.recipe.glycemic_index = glycemic_index;
      state.norms = testNorm(state.recipe, state.norms);
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
    [getIngridients.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getIngridients.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.allIngridients = action.payload.map((el) => {
        return {
          id: el.id,
          title: el.title,
          price: el['IngridientPrices'].sort((a, b) => b.createdAt - a.createdAt)[0].price,
          fat: el.fat,
          dry_matter: el.dry_matter,
          dry_milk_remainder: el.dry_milk_remainder,
          antifris: el.antifris,
          sugar: el.sugar,
          glycemic_index: el.glycemic_index,
        };
      });
    },
  },
});
export const {
  addIngridientsFromPattern,
  deleteIngridient,
  deleteBase,
  normalizeRecipe,
  changeIngridientWeight,
  changeBaseWeight,
  setBase,
  addIngridient,
  changeBasePrice,
} = newRecipes.actions;

export default newRecipes.reducer;
