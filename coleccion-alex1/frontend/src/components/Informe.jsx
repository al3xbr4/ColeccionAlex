import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import Topbar from './Topbar';
import InformeColeccion from './InformeColeccion';
import axios from 'axios';

function Informes() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.login);

  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate('/');
    }
  }, [userData.isAutenticated, navigate]);

  
const handleGetItems = async (setTableData) => {
  try {
    const response = await axios.get('http://localhost:3030/getItems');
    const result = response.data;

    console.log('Server response:', result); // Agregado para depuración

    if (result) {
      setTableData(result);
    } else {
      alert('Error: No se obtuvieron datos válidos desde el servidor');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    alert('Error al conectar con el servidor');
  }
};

  return (
    <div>
      <Topbar />
      <Paper elevation={20} style={{ padding: '2rem', width: '90%', height: '90%', marginTop: '3%', marginLeft: '6%' }}>
        <InformeColeccion getItems={handleGetItems} />
      </Paper>
    </div>
  );
}

export default Informes;
