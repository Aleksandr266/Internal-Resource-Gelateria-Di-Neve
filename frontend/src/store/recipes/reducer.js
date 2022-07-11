/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function createTodos(num) {
  if (num === 0) return 0;
  //считаем колличество раз загрузки фризера. К примеру 1,5 раза
  const coefficient = num / 60;
  /// считаем целые загрузки. К примеру 1
  var integer = Math.trunc(coefficient);
  /// считаем не целые загрузки. К примеру 0,5
  var fraction = coefficient - integer;
  /// результирующий массив
  var result = [];
  /// проверка на целое число
  if (integer > 0) {
    /// если дробное чило меньше 0.58
    if (fraction !== 0) {
      if (fraction < 0.58) {
        integer = integer - 1;

        for (let index = 0; index < integer; index++) {
          result.push(60);
        }
        var intermediateValue = (fraction + 1) / 2;
        for (let index = 0; index <= 1; index++) {
          var rounding = Math.round(intermediateValue * 60);
          result.push(rounding);
        }
        return result;
      }
    }
    /// если дробное чило больше 0.58
    for (let index = 0; index < integer; index++) {
      result.push(60);
    }

    for (let index = 0; index < 1; index++) {
      var rounding = Math.round(fraction * 60);
      result.push(rounding);
    }
    return result;
  }
  /// если загрузка меньше 1.00 но больше 0.58

  if (coefficient > 0.58) {
    var rounding = Math.round(coefficient * 60);
    result.push(rounding);
    return result;
  }
  result.push(35);
  return result;
}

const getCategories = (recipes) => {
  const categories = {};
  console.log(recipes);
  recipes.forEach((recipe) => {
    if (categories.hasOwnProperty(recipe.Base.title)) {
      categories[recipe.Base.title].push({
        ...recipe,
        total_base:
          Math.round(
            (Math.round(Number(recipe.base_weight) * 10) / 100) * recipe.Store.plan * 100,
          ) / 100,
      });
    } else {
      categories[recipe.Base.title] = [
        {
          ...recipe,
          total_base:
            Math.round(
              (Math.round(Number(recipe.base_weight) * 10) / 100) * recipe.Store.plan * 100,
            ) / 100,
        },
      ];
    }
  });
  const bases = [];
  for (const category in categories) {
    bases.push({
      id: categories[category][0].base_id,
      category,
      recipes: categories[category],
      plan: categories[category].reduce((acc, el) => acc + el.total_base, 0),
    });
  }
  return bases;
};

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/recipes', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadRecipeById = createAsyncThunk(
  'recipes/loadRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/recipes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateStore = createAsyncThunk(
  'recipes/updateStore',
  async ({ id, field, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/stores', {
        method: 'PUT',
        body: JSON.stringify({ id, field, value }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('это перед респонсом');
      console.log(response);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      dispatch(changeStoreComplete({ id, field, value }));
      console.log('Сразу после dispatch');
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const putBasesPlan = createAsyncThunk(
  'recipes/putBasesPlan',
  async ({ id, plan }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/bases', {
        method: 'PUT',
        body: JSON.stringify({ id, plan }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      dispatch(putBasesPlanComplete({ id, plan }));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    recipesByBases: [],
    recipeIngridients: [],
    basesTodos: [],
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
    putBasesPlanComplete(state, action) {
      const { id, plan } = action.payload;
      const findedBasesTodos = state.basesTodos.find((todos) => todos.id === id);
      if (findedBasesTodos) {
        findedBasesTodos.todos = createTodos(plan);
      } else {
        state.basesTodos.push({ id, todos: createTodos(plan) });
      }
    },
    removeRecipeIngridients(state, action) {
      state.recipeIngridients = [];
    },
    changeStoreComplete(state, action) {
      const { id, field, value } = action.payload;
      const findedRecipe = state.recipes.find((store) => store.id === id);
      findedRecipe.Store[field] = value;
      console.log(state.recipes, 'Это стейт after');
      state.recipesByBases = getCategories(state.recipes);
    },
  },

  extraReducers: {
    [loadRecipes.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadRecipes.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.recipes = action.payload;
      state.recipesByBases = getCategories(action.payload);
    },
    [loadRecipes.rejected]: setError,
    [loadRecipeById.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadRecipeById.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.recipeIngridients = action.payload;
    },
    [loadRecipeById.rejected]: setError,
    [updateStore.rejected]: setError,
  },
});
const { changeStoreComplete } = recipeSlice.actions;
// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;
export const { putBasesPlanComplete, removeRecipeIngridients } = recipeSlice.actions;
// export { removeRecipeIngridients };
export default recipeSlice.reducer;
