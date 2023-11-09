//Nos conectamos a la base de datos
const mysql = require('mysql2/promise')
const config = require('../config')

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);

    return results;
}
async function testDatabaseConnection() {
    try {
        const connection = await mysql.createConnection(config.db);
        console.log('\nConexión a la base de datos exitosa, \n|puerto: ' + config.db.port, '|usuario: ' + config.db.user, '|base de datos: ' + config.db.database);
        connection.end(); // Cierra la conexión de prueba.

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

module.exports = {
    query,
    testDatabaseConnection,
};