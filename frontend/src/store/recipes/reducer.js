import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('/recipes');

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
    recipes: ['aaaa', 'sss'],
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
