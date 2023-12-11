import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginActions } from '../redux/storelogin';
import {
  AppBar,
  Container,
  Toolbar,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

// Importa el componente Informe
import Informe from './Informe';

// Importa el nuevo Topbar
import Topbar from './Topbar';

function Home() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    login: '',
    rol: '',
    password: '',
  });

  useEffect(() => {
    if (!user || !user.isAutenticated) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(loginActions.logout());
    navigate('/');
  };

  const handleInsertData = async () => {
    try {
      const queryParams = `nombre=${formData.nombre}&login=${formData.login}&rol=${formData.rol}&password=${formData.password}`;
      const response = await fetch(`http://localhost:3030/addItem?${queryParams}`, {
        method: 'GET',
      });

      setFormData({
        nombre: '',
        login: '',
        rol: '',
        password: '',
      });

      const result = await response.json();
      if (result && result > 0) {
        fetchData();
        alert('Datos guardados con éxito');
      } else {
        alert('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleDelete = async (login) => {
    try {
      const queryParams = `login=${login}`;
      const response = await fetch(`http://localhost:3030/deleteItem?${queryParams}`, {
        method: 'GET',
      });

      const result = await response.json();
      if (result && result > 0) {
        alert('Registro eliminado con éxito');
        fetchData();
      } else {
        alert('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleShowRecords = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error('La respuesta del servidor no es un array:', result);
      }
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  };

  useEffect(() => {
    console.log('Datos del usuario:', user);
  }, [user]);

  return (
    <div>
      {user && user.isAutenticated ? (
        <>
          {/* Usa el nuevo Topbar en lugar del antiguo */}
          <Topbar user={user} />

          <Paper style={{ padding: '20px' }}>
            <Box
              component='form'
              autoComplete='off'
              onSubmit={(event) => {
                event.preventDefault();
                handleInsertData();
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    label='Nombre'
                    required
                    value={formData.nombre}
                    onChange={(event) =>
                      setFormData({ ...formData, nombre: event.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label='Login'
                    required
                    value={formData.login}
                    onChange={(event) =>
                      setFormData({ ...formData, login: event.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label='Rol'
                    required
                    value={formData.rol}
                    onChange={(event) =>
                      setFormData({ ...formData, rol: event.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label='Contraseña'
                    required
                    value={formData.password}
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type='submit'
                    variant='contained'
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                    startIcon={<AddBoxIcon />}
                  >
                    Insertar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Contraseña</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.login}</TableCell>
                    <TableCell>{row.rol}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(row.login)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box marginTop="20px" textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleShowRecords}
            >
              Mostrar Registros
            </Button>
          </Box>
        </>
      ) : null}
    </div>
  );
}

export default Home;
