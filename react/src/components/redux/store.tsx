// Importe configureStore do Redux Toolkit
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducer';


const rootReducer = combineReducers({
  theme: themeReducer,
});

// Crie o store usando configureStore
const store = configureStore({
  reducer: rootReducer,
  // Outras opções (middleware, devTools, etc.) podem ser especificadas aqui
});

// Exporte o store
export default store;
