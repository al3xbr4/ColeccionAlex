// Este archivo define el slice de autenticación utilizando createSlice de '@reduxjs/toolkit'.
// Define el estado inicial, las acciones de login y logout, y exporta el slice y las acciones.

import { createSlice } from '@reduxjs/toolkit';

// Define el estado inicial para la autenticación.
const initialAuthState = {
  isAutenticated: false,
  userName: '',
  userRol: '',
};

// Crea el slice de autenticación con el nombre 'authentication'.
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      // Actualiza el estado con la información del usuario al hacer login.
      const userData = action.payload;
      state.isAutenticated = true;
      state.userName = userData.name;
      state.userRol = userData.rol;
    },
    logout: (state) => {
      // Restablece el estado al hacer logout.
      state.isAutenticated = false;
      state.userName = '';
      state.userRol = '';
    },
  },
});

// Exporta las acciones de login y logout.
export const loginActions = authSlice.actions;
// Exporta el reducer del slice para su uso en la store.
export default authSlice.reducer;
