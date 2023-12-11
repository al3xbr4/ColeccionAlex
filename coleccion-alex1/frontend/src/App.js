import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Informe from './components/Informe';
import Ayuda from './components/Ayuda'; // Agregamos la importación del componente Ayuda

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'Home',
        element: <Home />,
      },
      {
        path: 'Ayuda', // Agregamos la ruta 'Ayuda'
        element: <Ayuda />,
      },
    ],
  },
  {
    path: 'Informe',
    element: <Informe />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  );
}

export default App;
