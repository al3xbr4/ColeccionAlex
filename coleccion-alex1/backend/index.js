// Importa express y cors
const express = require('express');
const cors = require('cors');

// Importa el módulo login.js ubicado en la carpeta services
const login = require('./services/login');
const db = require('./services/db');
const { testDatabaseConnection } = require('./services/db');
// Define el puerto en el que escuchará la API
const port = 3030;

// Crea una instancia de Express
const app = express();

// Configura middleware para manejar datos JSON y URL codificada
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// Habilita el middleware CORS para permitir solicitudes desde otros dominios
app.use(cors());

// Ejemplo para verificar el funcionamiento de un endpoint
// Este endpoint es / y devuelve un mensaje

app.get('/', function (req, res) {
    res.json({ message: 'Hola Mundo!' });
});


//Creación del endpoint /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})




/*
// Creación del endpoint /login
// Utiliza el método POST para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {
    try {
      const user = req.body.user;
      const password = req.body.password;
  
      if (!user || !password) {
        res.status(400).json({ error: 'Error en el usuario o contraseña' });
        return;
      }
  
      const userData = await login.getUserData(user, password);
  
      if (userData.data) {
        res.status(200).json(userData);
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } catch (err) {
      console.error('Error while getting data:', err.message);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  */
// Inicia la API y escucha en el puerto definido
app.listen(port, async () => {

    console.log(`\nAPI escuchando en el puerto  + ${port}`);
});
