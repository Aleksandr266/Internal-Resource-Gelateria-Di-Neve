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
      base_plan: categories[category][0].Base.plan,
      plan: categories[category].reduce((acc, el) => acc + el.total_base, 0),
      stock: categories[category][0].Base.stock,
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
  async (id, { rejectWithValue, dispatch }) => {
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
      dispatch(openRecipe(id));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadBaseRecipeById = createAsyncThunk(
  'recipes/loadBaseRecipeById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/bases/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();
      console.log(data);
      dispatch(openBaseRecipe(data));

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

export const productBase = createAsyncThunk(
  'recipes/productBase',
  async ({ baseId, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/bases/product', {
        method: 'PUT',
        body: JSON.stringify({ baseId, value }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const base = await response.json();
      console.log('base ProductBase', base);
      dispatch(upDateBasesPlanStock(base));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const resetStock = createAsyncThunk(
  'recipes/reset',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/bases/reset', {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const base = await response.json();
      console.log('base ProductBase', base);
      dispatch(upDateBasesPlanStock(base));
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
    openedBaseRecipes: [],
    basesTodos: [],
    stockVisibles: {},
    status: null,
    error: null,
  },
  reducers: {
    putBasesPlanComplete(state, action) {
      const { id, plan } = action.payload;
      const findedBasesTodos = state.basesTodos.find((todos) => todos.id === id);
      if (findedBasesTodos) {
        findedBasesTodos.todos = createTodos(plan).map((todo) => ({ value: todo, isDone: false }));
      } else {
        state.basesTodos.push({
          id,
          todos: createTodos(plan).map((todo) => ({ value: todo, isDone: false })),
        });
      }
    },
    resetTodos(state, action) {
      const { id } = action.payload;
      state.basesTodos.splice(
        state.basesTodos.findIndex((todos) => todos.id === id),
        1,
      );
    },
    upDateBasesPlanStock(state, action) {
      const { id, stock } = action.payload;
      const findedBase = state.recipesByBases.find((store) => store.id === id);
      findedBase.stock = stock;
    },
    setStockVisibles(state, action) {
      const { id } = action.payload;
      state.stockVisibles[id] = !state.stockVisibles[id];
    },
    openBaseRecipe(state, action) {
      if (!state.openedBaseRecipes.find((el) => el[0].base_id === action.payload[0].base_id)) {
        state.openedBaseRecipes.push(action.payload);
      }
      // state.openedRecipes.push(action.payload);
    },
    openRecipe(state, action) {
      console.log('sdfsdf', action.payload);
      const id = action.payload;
      const findedRecipe = state.recipes.find((store) => store.id === id);
      findedRecipe.isOpen = true;
      state.recipesByBases = getCategories(state.recipes);
      // state.openedRecipes.push(action.payload);
    },
    setTodoToggle(state, action) {
      const { baseId, id } = action.payload;
      const findedBase = state.basesTodos.find((base) => base.id === baseId);
      findedBase.todos = findedBase.todos.map((todo, todoId) => {
        if (Number(todoId) === Number(id)) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
    },
    removeRecipeIngridients(state, action) {
      state.recipeIngridients = [];
    },
    changeStoreComplete(state, action) {
      const { id, field, value } = action.payload;
      const findedRecipe = state.recipes.find((store) => store.id === id);
      findedRecipe.Store[field] = value;
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
      state.recipes = action.payload.map((el) => ({ ...el, isOpen: false }));
      state.recipesByBases = getCategories(action.payload.map((el) => ({ ...el, isOpen: false })));
      state.stockVisibles = state.recipesByBases.reduce((acc, el) => {
        acc[el.id] = false;
        return acc;
      }, {});
    },
    [loadRecipes.rejected]: setError,
    [loadRecipeById.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadRecipeById.fulfilled]: (state, action) => {
      state.status = 'resolved';
      console.log('action.payload', action.payload);
      state.recipeIngridients.push(action.payload);
    },
    [loadRecipeById.rejected]: setError,
    [updateStore.rejected]: setError,
  },
});
const { changeStoreComplete } = recipeSlice.actions;
// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;
export const {
  openBaseRecipe,
  openRecipe,
  resetTodos,
  resetStockComplete,
  upDateBasesPlanStock,
  setTodoToggle,
  setStockVisibles,
  putBasesPlanComplete,
  removeRecipeIngridients,
} = recipeSlice.actions;
// export { removeRecipeIngridients };
export default recipeSlice.reducer;
