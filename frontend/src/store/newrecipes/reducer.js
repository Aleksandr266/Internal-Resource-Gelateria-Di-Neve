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

export const saveRecipeBase = createAsyncThunk(
  'ingridients/saveRecipeBase',
  async (data, { rejectWithValue }) => {
    console.log('fetch', data);
    try {
      const response = await fetch('/recipes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const answer = await response.json();
      console.log(answer);
      return answer;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const initialState = {
  bases: [],
  base: null,
  allIngridients: [],
  ingridients: [],
  patterns: {
    1: [1, 2, 3, 4, 5, 6, 8],
    2: [3, 4, 5, 6, 10],
  },
  recipe: {
    title: '',
    market_price: 0,
    standart: 10,
  },
  doneRecipe: {},
  doneStatus: false,
  recipeErrors: [],
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
};

const newRecipes = createSlice({
  name: 'newrecipes',
  initialState,
  reducers: {
    reset: () => initialState,
    setBase(state, action) {
      state.base = state.bases.find((base) => base.id === action.payload);
      state.base.weight = 0;
      state.base.total_price = (state.base.weight * state.base.price) / 10;
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
      state.base.total_price = (state.base.weight * state.base.price) / 10;
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
      currentIngridient.total_price = (currentIngridient.weight * currentIngridient.price) / 10;
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
      state.base.price = action.payload;
      state.base.total_price = (state.base.weight * state.base.price) / 10;
    },
    changeRecipeTitle(state, action) {
      state.recipe.title = action.payload;
    },
    changeRecipePrice(state, action) {
      console.log(action.payload);
      state.recipe.market_price = action.payload || 0;
    },
    changeRecipeStandart(state, action) {
      console.log(action.payload);
      state.recipe.standart = action.payload || 0;
    },
    saveRecipe(state, action) {
      state.recipeErrors = [];
      if (!state.recipe.title) {
        if (!state.recipeErrors.includes('Название не введено')) {
          state.recipeErrors.push('Название не введено');
        }
      }
      if (!state.base) {
        if (!state.recipeErrors.includes('База не выбрана')) {
          state.recipeErrors.push('База не выбрана');
        }
      }
      // if (!state.ingridients.length) {
      //   if (!state.recipeErrors.includes('Ингридиенты не выбраны')) {
      //     state.recipeErrors.push('Ингридиенты не выбраны');
      //   }
      // }
      if (!(state.recipe.weight >= 9.98 && state.recipe.weight <= 10.02)) {
        if (!state.recipeErrors.includes('Масса не нормирована')) {
          state.recipeErrors.push('Масса не нормирована');
        }
      }
      if (
        state.base &&
        !state.norms
          .find((norm) => norm.base_id === state.base.id)
          .params.every((norm) => norm.isNorm)
      ) {
        if (!state.recipeErrors.includes('Стандарты качества нарушены')) {
          state.recipeErrors.push('Стандарты качества нарушены');
        }
      }
      if (!state.recipeErrors.length) {
        state.doneRecipe.recipe = {
          title: state.recipe.title,
          base_id: state.base.id,
          base_weight: state.base.weight,
        };
        state.doneRecipe.recipePrice = {
          market_price: state.recipe.market_price,
        };
        state.doneRecipe.store = {
          standart: state.recipe.standart,
        };
        const baseIngridientId = state.allIngridients.find(
          (ingridient) => ingridient.title === state.base.title,
        ).id;
        state.doneRecipe.recipeIngridients = [
          ...state.ingridients
            .map((ingridient) => ({
              ingridient_id: ingridient.id,
              weight: ingridient.weight,
            }))
            .filter((ingridient) => ingridient.weight > 0),
          { ingridient_id: baseIngridientId, weight: state.base.weight },
        ];
        state.doneStatus = true;
        console.log('Всё супер!!!');
      }
      // console.log(state.recipeErrors);
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
  reset,
  changeRecipePrice,
  saveRecipe,
  changeRecipeTitle,
  addIngridientsFromPattern,
  deleteIngridient,
  deleteBase,
  normalizeRecipe,
  changeIngridientWeight,
  changeBaseWeight,
  setBase,
  addIngridient,
  changeBasePrice,
  changeRecipeStandart,
} = newRecipes.actions;

export default newRecipes.reducer;
