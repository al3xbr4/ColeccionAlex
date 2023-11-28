// item.js
const db = require('./db');


async function getData() {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    return result;
  } catch (error) {
    console.error('Error while getting data ', error.message);
    throw error;
  }
}

const insertData = async (req, res) => {
  const { nombre, login, rol, password } = req.query;

  // Verifica que todos los campos tengan valores definidos
  if (nombre && login && rol && password) {
    try {
      // Ejecuta tu consulta SQL utilizando el objeto 'pool' de db.js
      const result = await db.query('INSERT INTO usuarios (nombre, login, rol, password) VALUES (?, ?, ?, ?)', [nombre, login, rol, password]);

      // Devuelve el resultado o algún indicador de éxito
      return result;
    } catch (error) {
      // Maneja los errores de la consulta SQL
      console.error('Error while inserting data ', error);
      return { error: 'Error al insertar datos en la base de datos' };
    }
  } else {
    // Si algún campo es undefined, devuelve un mensaje de error
    return { error: 'Todos los campos son requeridos' };
  }
};

async function deleteData(req, res) {
  try {
    const { login } = req.query; 
    const result = await db.query('DELETE FROM usuarios WHERE login = ?', [login]);

    return result.affectedRows;
  } catch (error) {
    console.error('Error while deleting data ', error.message);
    throw error;
  }
}

module.exports = {
  getData,
  insertData,
  deleteData,
};
