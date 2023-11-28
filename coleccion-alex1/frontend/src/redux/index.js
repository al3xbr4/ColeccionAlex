// Este archivo configura y exporta la store de Redux.
// Importa el reducer de autenticación (loginReducer) 
// y utiliza configureStore de '@reduxjs/toolkit' para crear la store.

import loginReducer from './storelogin';  // Importa el reducer de autenticación.

import { configureStore } from '@reduxjs/toolkit';

// Configura la store de Redux con el reducer de autenticación.
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// Exporta la store configurada para su uso en la aplicación.
export default store;
