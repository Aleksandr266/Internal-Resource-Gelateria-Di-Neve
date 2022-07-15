import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/auth/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Server Error!');
    }
    const data = await response.json();
    // console.log(data, " Это данные с сервера");

    return data; // записывает в action.payload
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk(
  'auth/loginUsers',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/auth/log', {
        method: 'POST',
        body: JSON.stringify({
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
      // console.log(data, " Это данные с сервера");

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    console.log('111111111111111111111111111');
    const response = await fetch('/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Server Error!');
    }
    const data = await response.json();
    console.log(data, 'Получили ответ с бэка');
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: [], //храним текущего юзера, который сейчас на сайте
    // registration: [],
    status: null,
    error: null,
  },

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.login = action.payload;
      console.log(state.login, 'это стейт логин');
    },
    [loginUser.rejected]: setError,
    [loginUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },


    [logoutUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.status = 'resolved';
      state.login = [];
      console.log(state.login, 'это стейт логаут должен быть пустым ');
    },
    [logoutUser.rejected]: setError,


    [getUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.login = action.payload;
      console.log(state.login, 'это стейт логин');
    },
    [getUser.rejected]: setError,
  },
});
export default authSlice.reducer;
