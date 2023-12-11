// Conexión a la base de datos
const mysql = require('mysql2/promise');
const config = require('../config');

// Función para realizar consultas a la base de datos
async function query(sql, params) {
    // Crear una conexión a la base de datos
    const connection = await mysql.createConnection(config.db);
    
    // Ejecutar la consulta y obtener los resultados
    const [results] = await connection.execute(sql, params);

    // Cerrar la conexión y devolver los resultados
    return results;
}

// Función para probar la conexión a la base de datos
async function testDatabaseConnection() {
    try {
        // Crear una conexión de prueba
        const connection = await mysql.createConnection(config.db);

        // Mostrar mensaje de conexión exitosa con detalles
        console.log('\nConexión a la base de datos exitosa, \n|puerto: ' + config.db.port,
         '|usuario: ' + config.db.user, '|base de datos: ' + config.db.database);

        // Cierra la conexión de prueba
        connection.end();

    } catch (error) {
        // Manejar errores al conectar a la base de datos
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Exportar funciones para su uso en otros archivos
module.exports = {
    query,
    testDatabaseConnection,
};
