-- Crear la base de datos si no existe

CREATE DATABASE IF NOT EXISTS bdgestion;

-- Seleccionar la base de datos recién creada o existente
USE bdgestion;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insertar un usuario en la tabla
INSERT INTO usuarios (nombre, login, rol, password) VALUES ('alex', 'alex', 'administrador', '1234');