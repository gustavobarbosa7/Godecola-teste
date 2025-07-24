import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from ".authSlice";

const loadState = () => {

  try {
    const serializedState = localStorage.getItem("app_state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Erro ao salvar estado:", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("app_state", serializedState);
  } catch (error) {
    console.error("Erro ao salvar o state da aplicação: ", error);
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});
