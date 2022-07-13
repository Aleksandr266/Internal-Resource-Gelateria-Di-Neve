import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCategories = (recipes) => {
  const categories = { title:[], market_price:[], cost_price:[]};
  recipes.forEach((recipe) => {
      categories.title.push(recipe.title);
      categories.market_price.push(recipe.market_price);
      categories.cost_price.push(recipe.cost_price);
  });

  return categories;  // записывает в action.payload
};

export const loadMarketPrice = createAsyncThunk(
  'boss/loadMarketPrice',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log("привет");
      const response = await fetch('/technolog', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      // dispatch(marketPriceComplete({data}))

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadREmployees = createAsyncThunk(
  'boss/loadMarketPrice',
  async(_, {rejectWithValue}) => {
    try {
      console.log("Мы попали в в редьюсер функцию loadREmployees");
      
      const response = await fetch('/employees', {
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

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    marketPrice: [], // Отчет по рыночной цене и себестоимости
    employees: [], //все сотрудники
    status:null,
    error:null,
  },
  reducers: {

  },

  extraReducers: {
    // reducer для загрузки market price
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadMarketPrice.fulfilled]: (state, action) => {
      state.status = 'resolved';

      //!!!!!!!!!!!! ВОЗМОЖНО ЭТО НУЖНО !!!!!!"
      // state.marketPrice = getCategories(action.payload.collectResult);
    },
    [loadMarketPrice.rejected]: setError,
    

     //   reducer для загрузки employees
    [loadREmployees.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadREmployees.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.employees = action.payload;
      console.log(state.employees, 'Это наполненный стейт с сотрудниками');
      // state.marketPriceByBases = getCategories(action.payload.collectResult);
    },
    [loadREmployees.rejected]: setError,
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

  },
});

const { changeMarketPriceComplete, changeStandartStoreComplete } = bossSlice.actions;

export default bossSlice.reducer;
