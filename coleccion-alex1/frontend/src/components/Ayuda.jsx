import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import { loginActions } from '../redux/storelogin';
import { Button, Tooltip, Grid } from '@mui/material';

function Ayuda() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login);

  // Obtiene el nombre y el rol del usuario desde el store.
  const { userName, rol } = userData;

  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate('/');
    }
  }, [userData.isAutenticated, navigate]);

  const handleLogout = () => {
    dispatch(loginActions.logout());
    navigate('/');
  };

  const handleDownloadPDF = (fileName) => {
    const url = `${process.env.PUBLIC_URL}/${fileName}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* COMPONENTE TOPBAR REUTILIZADO */}
      <Topbar userName={userName} rol={rol} />

      {/* Contenido del componente Ayuda */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Tooltip title="Acceder al manual de usuario" arrow>
            <Button
              variant="contained"
              style={{ width: '200px', height: '50px' }}
              onClick={() => handleDownloadPDF('../ManualUsuario.pdf')}
            >
              Descargar manual de usuario
            </Button>
          </Tooltip>
        </Grid>

        <Grid item>
          <Tooltip title="Acceder a la guía rápida" arrow>
            <Button
              variant="contained"
              style={{ width: '200px', height: '50px' }}
              onClick={() => handleDownloadPDF('../GuiaRapida.pdf')}
            >
              Descargar guía rápida
            </Button>
          </Tooltip>
        </Grid>

        {/* Botón para cerrar sesión */}
        <Grid item>
          <Tooltip title="Cerrar sesión" arrow>
            <Button
              variant="contained"
              style={{ width: '150px', height: '50px' }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

export default Ayuda;
