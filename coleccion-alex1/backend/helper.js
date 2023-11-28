// Maneja el caso en el que la base de datos no devuelve nada:
function emptyOrRows(rows) {
    if (!rows) {
        // Si no hay filas devueltas, retorna un array vacío []
        return [];
    }
    // Si hay filas devueltas, retorna las filas.
    return rows;
}

// Exportar función para su uso en otros archivos
module.exports = {
    emptyOrRows
};
