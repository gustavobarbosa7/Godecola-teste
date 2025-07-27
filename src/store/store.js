import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const loadToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Erro ao carregar token:', error);
    return null;
  }
};

const preloadedState = {
  auth: {
    token: loadToken(),
    userId: null,
    user: null,
    loading: false,
    error: null,
  },
  user: {
    user: null,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: import.meta.env.MODE !== 'production',
});

export default store;