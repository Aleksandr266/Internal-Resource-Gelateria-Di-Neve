import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk(
  'profile/',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/profile', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const editUser = createAsyncThunk(
  'profile/edit',
  async (e, { rejectWithValue }) => {
    try {
      const response = await fetch('/profile/edit', {
        method: 'PUT',
        body: JSON.stringify({
          fullName: e.target.fullName.value,
          login: e.target.login.value
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const users = createSlice({
  name: 'user',
  initialState: {
    user: [],
    userEdit: 1
  },
  reducers: {
    changeFullName(state, action) {
      state.user.fullname = action.payload
    },
    changeLogin(state, action) {
      state.user.login = action.payload
    },
    changeUserEdit(state) {
      state.userEdit = 1
    }
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [editUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [editUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userEdit = action.payload;
    },
  }
})
export const {
  changeFullName,
  changeLogin,
  changeUserEdit,
} = users.actions

export default users.reducer;
