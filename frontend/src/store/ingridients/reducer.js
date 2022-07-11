import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const editIngridient = createAsyncThunk(
  'ingridients/editIngridient',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/ingridients', {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState: {
    ingridients: []
  },
  extraReducers: {
    [editIngridient.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [editIngridient.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.ingridients = action.payload.map((el) => { 
        return { 
          id: el.id,
          title: el.title,
          price: el['IngridientPrices'][0].price,
          fat: el.fat,
          dry_matter: el.dry_matter,
          dry_milk_remainder: el.dry_milk_remainder,
          antifris: el.antifris,
          sugar: el.sugar,
          glycemic_index: el.glycemic_index
        }
      });
    },
  },
})

export default ingridientsSlice.reducer;
