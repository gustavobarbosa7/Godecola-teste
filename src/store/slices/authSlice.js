import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;