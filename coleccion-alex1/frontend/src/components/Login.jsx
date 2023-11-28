// Este componente define la pantalla de inicio de sesión.
// Utiliza Material-UI para los componentes visuales como TextField, Button, etc.
// Realiza una solicitud al servidor al enviar el formulario y actualiza el estado de Redux según la respuesta.

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import loginImage from './descarga.png';
import { Container, Typography, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../redux/storelogin';

function Login() {
  // Obtiene la función de despacho de Redux y define estados locales para el usuario y la contraseña.
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Manejadores de cambio para los campos de usuario y contraseña.
  const handleUserChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejador para enviar el formulario y realizar la autenticación.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Realiza una solicitud al servidor para autenticar al usuario.
    fetch(`http://localhost:3030/login?login=${login}&password=${password}`)
      .then(response => {
        // Verifica si la respuesta del servidor es exitosa.
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json();
      })
      .then(response => {
        // Verifica si la respuesta contiene datos de usuario válidos.
        if (response && response.data && response.data.nombre) {
          console.log(response.data.nombre);
          console.log('entro y ahora navego');
          // Verifica si el nombre de usuario es válido y realiza acciones correspondientes.
          if (response.data.nombre !== undefined) {
            console.log('entro, hago el dispatch y luego navego');
            // Actualiza el estado de autenticación en Redux y navega a la página principal.
            dispatch(loginActions.login({
              name: response.data.nombre,
              rol: response.data.rol
            }));
            navigate('/home');
          }
        }
      })
      .catch(error => {
        // Captura errores y los imprime en la consola en caso de problemas con la solicitud.
        console.error('Hubo un problema con la petición fetch:', error);
      });
  }

  // Estructura visual del componente.
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={20} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vh',
        padding: '2rem',
      }}>

        {/* Imagen del avatar para la presentación visual. */}
        <Avatar alt="imagen" src={loginImage} />

        {/* Título de la pantalla de inicio de sesión. */}
        <Typography component="h1" variant="h4"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '3vh',
          }}
        >
          Acceder
        </Typography>

        {/* Campos de entrada de usuario y contraseña. */}
        <TextField
          id="user"
          label="User"
          sx={{ marginTop: '2vh', width: '70%' }}
          onChange={handleUserChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          sx={{ marginTop: '2vh', width: '70%' }}
          autoComplete="current-password"
          onChange={handlePasswordChange}
        />

        {/* Botón para enviar el formulario y realizar la autenticación. */}
        <Button color="primary" variant="contained" sx={{ marginTop: '5vh', marginBottom: '5vh' }} onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
