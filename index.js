var express = require('express');
var cors = require('cors');
require('dotenv').config();

// 1. Requerir multer y configurar almacenamiento en memoria
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 2. Endpoint POST /api/fileanalyse
// Note: 'upfile' es el nombre exacto del input en el HTML de FreeCodeCamp
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'Please upload a file' });
  }

  // Responder con los metadatos requeridos por FCC
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