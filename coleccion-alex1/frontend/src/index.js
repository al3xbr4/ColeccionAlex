// Este archivo es el punto de entrada principal del frontend.
// Se encarga de renderizar la aplicación React en el elemento con el id 'root'.

import React from 'react';
import { createRoot } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';  // Importa el componente principal de la aplicación.
import store from './redux/index';  // Importa la store de Redux configurada.

// Crea un punto de entrada para la aplicación React en el elemento con id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Envuelve la aplicación en el componente Provider de Redux para que tenga acceso a la store.
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
