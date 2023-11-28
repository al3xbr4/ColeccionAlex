// Importar módulos necesarios
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Función para obtener datos de usuario por login y contraseña
async function getUserData(login, password) {
    try {
        // Realizar consulta a la base de datos
        const rows = await db.query(
            `SELECT nombre, rol FROM usuarios WHERE login = ? AND password = ?`, [login, password]
        );

        // Procesar los resultados y devolver los datos del usuario
        const data = helper.emptyOrRows(rows[0]);
        return {
            data
        };
    } catch (error) {
        // Manejar errores al obtener datos del usuario
        console.error(`Error while getting data `, error.message);
        return {
            error: 'Error en el servidor'
        };
    }
}

// Exportar función para su uso en otros archivos
module.exports = {
    getUserData
};
