import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar BrowserRouter
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter> {/* Envuelve tu componente App con BrowserRouter */}
      <Login />
      {/* Otros componentes */}
    </BrowserRouter>
  );
}

export default App;
