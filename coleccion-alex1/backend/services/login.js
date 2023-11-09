const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Esta función obtiene los datos del usuario por su nombre de usuario y contraseña
async function getUserData(login, password) {
    try {
        const rows = await db.query(
            'SELECT nombre, rol FROM usuarios WHERE login = ? AND password = ?',
            [login || '', password || '']
        );
            return {
                rows
            }

    } catch (error) {
        // Maneja cualquier error que ocurra durante la consulta a la base de datos
        throw error;
    }
}

module.exports = {
    getUserData
};
