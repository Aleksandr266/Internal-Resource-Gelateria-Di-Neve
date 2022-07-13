import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  },
  reducers: {
    setBase(state, action) {
      console.log(action.payload);
      state.base = state.bases.find((base) => base.id === action.payload);
    },
    addIngridient(state, action) {
      console.log('action.payload)', action.payload);
      state.ingridients.push(action.payload);
    },
  },

  extraReducers: {
    [getBases.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getBases.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.bases = action.payload;
    },
    [getBases.rejected]: setError,
  },
});
export const { setBase, addIngridient } = newRecipes.actions;

export default newRecipes.reducer;
