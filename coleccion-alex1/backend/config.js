// Credenciales de la base de datos
const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bdgestion',
        port: "3300",
        connectTimeout: 60000
    },
};

// Exportar configuración para su uso en otros archivos
module.exports = config;
