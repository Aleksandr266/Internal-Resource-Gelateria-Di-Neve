/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCategories = (recipes) => {
  const categories = {};
  console.log(recipes);
  recipes.forEach((recipe) => {
    if (categories.hasOwnProperty(recipe.Base.title)) {
      categories[recipe.Base.title].push(recipe);
    } else {
      categories[recipe.Base.title] = [recipe];
    }
  });
  const bases = [];
  for (const category in categories) {
    bases.push({ id: categories[category][0].base_id, category, recipes: categories[category] });
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

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    recipesByBases: [],
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
  },
});

// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;

export default recipeSlice.reducer;
