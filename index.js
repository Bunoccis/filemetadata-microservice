var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Configuración CORS total para que FCC no bloquee la lectura del JSON
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

// Multer configurado con memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Si por alguna razón no llega el archivo, logueamos para debuggear
  if (!req.file) {
    console.log("No file uploaded in req.file");
    return res.status(400).json({ error: 'Please upload a file' });
  }

  console.log("File received successfully:", req.file.originalname);

  // Respuesta con nombres y tipos estrictos
  res.json({
    name: String(req.file.originalname),
    type: String(req.file.mimetype),
    size: Number(req.file.size)
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});