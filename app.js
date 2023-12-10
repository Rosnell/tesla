const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // MySql

const app = express();
const port = 3000;

// conectar a MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'rosnellarturo@gmail.com', 
  password: '1221', 
  database: 'Tesla', 
});

//  Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/model_s', (req, res) => {
  res.render('model_s');
});

app.get('/model_y', (req, res) => {
  res.render('model_y');
});

app.post('/contact', (req, res) => {
  const { nombre, apellido, correo, telefono, mensaje } = req.body;

  // Consulta SQL para insertar datos en 'contactos'
  const sql = 'INSERT INTO contactos (nombre, apellido, correo, telefono, mensaje) VALUES (?, ?, ?, ?, ?)';

  // Ejecutar la consulta con los valores del formulario
  connection.query(sql, [nombre, apellido, correo, telefono, mensaje], (error, results) => {
    if (error) {
      // errores
      console.error(error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      // Éxito al insertar en la base de datos
      res.send('¡Formulario enviado con éxito!');
    }


    connection.end();
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
