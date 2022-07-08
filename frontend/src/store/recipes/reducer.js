/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async (_, { rejectWithValue }) => {
    console.log('data');
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

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
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
    },
    [loadRecipes.rejected]: setError,
  },
});

// const { addTodo, toggleComplete, removeTodo } = recipeSlice.actions;

export default recipeSlice.reducer;
