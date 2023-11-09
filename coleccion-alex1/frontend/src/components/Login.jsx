import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import loginImage from './descarga.png';

import { Container, Typography, Avatar, Paper } from '@mui/material';

function Login() {
    // Declaramos las variables login y password
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleUserChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Se crea una función para manejar el envío del formulario:
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

      //Comunica con el backend para verificar las credenciales con el metodo POST
  
      fetch(`http://localhost:3030/login?user=${login}&password=${password}`)
      .then(response => response.json())
      .then(response => {
      if (response) {
      console.log(response)
      }
      })
       /* 
        const data = await response.json();

        if (data.data && login === data.data.login && password === data.data.password) {
        console.log('Datos correctos:', data.data);
        
        } else {
        window.alert('Inicio de sesión incorrecto, vuelve a introducir los datos');
        console.log('Credenciales incorrectas.');
        }
*/
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Centra verticalmente
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

                <Avatar alt="imagen" src={loginImage} />
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
                <TextField
                    id="user"
                    label="User"
                    sx={{ marginTop: '2vh', width: '70%' }}
                    onChange={handleUserChange} // Agrega el evento onChange para actualizar el estado del usuario
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    sx={{ marginTop: '2vh', width: '70%' }}
                    autoComplete="current-password"
                    onChange={handlePasswordChange} // Agrega el evento onChange para actualizar el estado de la contraseña
                />

                <Button color="primary" variant="contained" sx={{ marginTop: '5vh', marginBottom: '5vh' }} onClick={handleSubmit}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;
