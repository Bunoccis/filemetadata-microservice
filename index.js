const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware CORS obligatorio para permitir que FCC inspeccione las respuestas
app.use(cors());

// Middleware de procesado de datos en Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Configuración de Multer usando memoria RAM temporal
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Servir la página HTML principal
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint exigido por el desafío: POST /api/fileanalyse
// El parámetro 'upfile' debe coincidir EXACTAMENTE con el atributo name del input en el HTML
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  // Respuesta exacta que exige la prueba 4: { name: "...", type: "...", size: 1234 }
  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: Number(req.file.size)
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App escuchando en puerto ' + port);
});