const express = require('express');
const cors = require('cors');
const { insertData, getData, deleteData } = require('./services/item');
const { testDatabaseConnection } = require('./services/db');
const { getUserData } = require('./services/login');

const port = 3030;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get('/', function (req, res) {
  res.json({ message: 'Hola Mundo!' });
});

app.get('/login', async function (req, res, next) {
  const { login, password } = req.query;
  const result = await getUserData(login, password);
  if (result.error) {
    res.status(500).json({ error: result.error });
  } else {
    res.json(result);
  }
});

app.get('/addItem', async function(req, res, next) {
  try {
    const result = await insertData(req, res);
    res.json(result);
  } catch (err) {
    console.error('Error while inserting item: ', err.message);
    next(err);
  }
});

app.get('/getItems', async function(req, res, next) {
  try {
    const result = await getData();
    res.json(result);
  } catch (err) {
    console.error('Error while getting items: ', err.message);
    next(err);
  }
});

app.get('/deleteItem', async function(req, res, next) {
  try {
    const result = await deleteData(req, res);
    res.json(result);
  } catch (err) {
    console.error('Error while deleting item: ', err.message);
    next(err);
  }
});

app.listen(port, async () => {
  console.log(`\nAPI escuchando en el puerto ${port}`);
  await testDatabaseConnection();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
