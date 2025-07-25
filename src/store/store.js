import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
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
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
