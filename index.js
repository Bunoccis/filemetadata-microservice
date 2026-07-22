var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Middleware para Forzar 'No-Cache' en cada petición
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint principal
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  // Enviamos la respuesta exactamente como la pide FCC
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});