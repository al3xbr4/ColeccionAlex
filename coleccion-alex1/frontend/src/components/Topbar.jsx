import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Grid, Typography, Button, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AdminIcon from '@mui/icons-material/VerifiedUser'; // Icono para el rol 'admin'
import UserIcon from '@mui/icons-material/Person'; // Icono para el rol 'user'
import { loginActions } from '../redux/storelogin';

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtiene el nombre y el rol del usuario desde el store. Eso se hace con el hook useSelector()
  const userData = useSelector((state) => state.login);

  // Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
  const isLoggedin = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);

  const handleLogout = () => {
    // Cambiamos el estado del store a logout si se pulsa el botón
    dispatch(loginActions.logout());
    navigate('/');
  };

  return (
    <AppBar position='static' style={{ marginBottom: '20px' }}>
      <Container>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item>
              {userData.userRol === 'admin' ? (
                <AdminIcon style={{ fontSize: 28, marginRight: '8px' }} />
              ) : (
                <UserIcon style={{ fontSize: 28, marginRight: '8px' }} />
              )}
            </Grid>
            <Grid item>
              <Typography variant='h6' style={{ fontWeight: 'bold' }}>{`Usuario: ${userData.userName}`}</Typography>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2} justifyContent='flex-end' alignItems='center'>
                <Grid item>
                  <Tooltip title='Ir a Inicio' arrow>
                    <Button color='inherit' component={Link} to='/home'>
                      <HomeIcon />
                    </Button>
                  </Tooltip>
                </Grid>
                {/* Condición para mostrar el enlace a Informe solo si el rol es 'admin' */}
                {userData.userRol === 'admin' && (
                  <Grid item>
                    <Tooltip title='Ir a Informes' arrow>
                      <Button color='inherit' component={Link} to='/informes'>
                        Informes
                      </Button>
                    </Tooltip>
                  </Grid>
                )}
                <Grid item>
                  <Tooltip title='Ir a Ayuda' arrow>
                    <Button color='inherit' component={Link} to='/ayuda'>
                      Ayuda
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title='Cerrar Sesión' arrow>
                    <Button color='inherit' onClick={handleLogout}>
                      Salir
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Topbar;
