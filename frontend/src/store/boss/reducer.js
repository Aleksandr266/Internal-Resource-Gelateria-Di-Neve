import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const getCategories = (recipes) => {
//   const categories = { title:[], market_price:[], cost_price:[]};
//   recipes.forEach((recipe) => {
//       categories.title.push(recipe.title);
//       categories.market_price.push(recipe.market_price);
//       categories.cost_price.push(recipe.cost_price);
//   });

function collectData(productionVolumes) {
  var titles = [];
  var allTimes = [];
  var months = [];
  for (let i = 0; i < productionVolumes.length; i++) {
    titles.push(productionVolumes[i].recipes.title);
    allTimes.push(productionVolumes[i].recipes.allTime);
    months.push(productionVolumes[i].recipes.month);
  }
  return { title: titles, allTime: allTimes, month: months };
}


const getCategories = (recipes) => {
  const categories = { title:[], market_price:[], cost_price:[], profitPercentage: [] };
  recipes.forEach((recipe) => {
      categories.title.push(recipe.title);
      categories.market_price.push(recipe.market_price);
      categories.cost_price.push(recipe.cost_price);
      categories.profitPercentage.push((recipe.market_price/recipe.cost_price).toFixed(2))
  });

  return categories;  // записывает в action.payload
};

const getProfit = (data) => {
  const categories = [];
  for (let i = 0; i <  data.length; i++) {
  categories.push( { id :  data[i].id, title: data[i].title, market_price: data[i].market_price, cost_price: data[i].cost_price, profit:(data[i].market_price/data[i].cost_price).toFixed(2)})
  }
  return categories;  // записывает в action.payload
}

function collectTable(productionVolumes) {
  var result = [];
  for (let i = 0; i < productionVolumes.length; i++) {
     result.push(productionVolumes[i].recipes);
  }
  return { result };
}

export const loadMarketPrice = createAsyncThunk(
  'boss/loadMarketPrice',
  async (_, { rejectWithValue, dispatch }) => {
    try {
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

export const loadProductionVolume = createAsyncThunk(
  'boss/loadProductionVolume',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log("привет");
      const response = await fetch('/static', {
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
  'boss/loadREmployees',
  async(_, {rejectWithValue}) => {
    try {
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

export const changeStatusEmployee = createAsyncThunk(
  'boss/changeStatusEmployees',
  async(id, {rejectWithValue}) => {
    try {
      const response = await fetch('/employees', {
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
      const data = await response.json();
      console.log(data, "Получили ответ с сервера 1111111111111111");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const registerUser = createAsyncThunk(
  'boss/registerUser',
  async ({ role, fullname, login, password }, { rejectWithValue }) => {
    try {
      console.log(role, 111111111111111111111111111);
      console.log(fullname);
      console.log(login);
      console.log(password);
      const response = await fetch('/auth/reg', {
        method: 'POST',
        body: JSON.stringify({
          role,
          fullname,
          login,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      console.log(data, " Это данные с сервера с зарегистрированным юзером");

      return data; // записывает в action.payload
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
    employees: [], // стейт всех сотрудников
    marketPrice: [],
    marketPriceTable: [], // Отчет по рыночной цене и себестоимости
    productionVolume: [], // Отчет по Продажам
    productionVolumeMass: [],
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
      state.marketPriceTable = getProfit(action.payload.collectResult);
      state.marketPrice = getCategories(action.payload.collectResult);
    },
    [loadMarketPrice.rejected]: setError,
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadProductionVolume.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadProductionVolume.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.productionVolume = collectData(action.payload.productionVolumes) ;
      state.productionVolumeMass = collectTable(action.payload.productionVolumes).result ;
      // state.marketPriceByBases = getCategories(action.payload.collectResult);
    },
    [loadProductionVolume.rejected]: setError,


     //   reducer для загрузки employees
     [loadREmployees.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadREmployees.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.employees = action.payload;
      console.log(state.employees, 'Это наполненный стейт с сотрудниками');
    },
    [loadREmployees.rejected]: setError,

  // добавление созданного сотрудника в стейт
  [registerUser.pending]: (state) => {
    state.status = 'loading';
    state.error = null;
  },
  [registerUser.fulfilled]: (state, action) => {
    state.status = 'resolved';
    state.employees.push(action.payload);
    console.log(state.login, 'это стейт логин');
  },
  [registerUser.rejected]: setError,

     //   reducer для обновления state employees после изменения isWorks
     [changeStatusEmployee.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [changeStatusEmployee.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.employees.map((obj) => obj.id === action.payload.id ? obj.isWorks = !obj.isWorks : obj)
    },
    [changeStatusEmployee.rejected]: setError,
    
  },
});

const { changeMarketPriceComplete, changeStandartStoreComplete } = bossSlice.actions;

export default bossSlice.reducer;
