// Este archivo define la estructura principal de la aplicación React.
// Configura las rutas y los componentes principales.

import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './components/Home';  // Importa el componente Home.
import Login from './components/Login';  // Importa el componente Login.

// Crea un enrutador con las rutas definidas para Login y Home.
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,  // Configura el componente Login como la página principal.
        element: <Login />,
      },
      {
        path: 'Home',  // Configura el componente Home para la ruta '/Home'.
        element: <Home />,
      },
    ],
  },
]);

// Define la función principal de la aplicación que utiliza el enrutador.
function App() {
  return (
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  );
}

// Exporta la función principal para su uso en otros archivos.
export default App;
