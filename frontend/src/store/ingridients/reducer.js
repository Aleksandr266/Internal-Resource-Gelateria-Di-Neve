import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const addIngridient = createAsyncThunk(
  'ingridients/addIngridient',
  async (e, { rejectWithValue }) => {
    try {
      const response = await fetch('/addIngridients', {
        method: 'POST',
        body: JSON.stringify({
          title: e.target.title.value,
          price: e.target.price.value,
          fat: e.target.fat.value,
          dryMatter: e.target.dryMatter.value,
          dryMilkMatter: e.target.dryMilkMatter.value,
          antifris: e.target.antifris.value,
          sugar: e.target.sugar.value,
          glycemicIndex: e.target.glycemicIndex.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState: {
    ingridients: [],
    addIngridientStatus: [],
  },
  extraReducers: {
    [getIngridients.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getIngridients.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.ingridients = action.payload.map((el) => {
        return {
          id: el.id,
          title: el.title,
          price: el['IngridientPrices'].sort((a, b) => +b.id - +a.id)[0].price,
          fat: el.fat,
          dry_matter: el.dry_matter,
          dry_milk_remainder: el.dry_milk_remainder,
          antifris: el.antifris,
          sugar: el.sugar,
          glycemic_index: el.glycemic_index,
        };
      });
    },
    [addIngridient.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [addIngridient.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.addIngridientStatus = action.payload;
    },
  },
});

export default ingridientsSlice.reducer;
