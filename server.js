// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

const multerOptions = {
  storage : multer.memoryStorage()
};

const upload = multer(multerOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.post('/', upload.single('myfile'), (req, res) => {
  const uploadedFile = req.file.buffer;
  console.log(uploadedFile);
  res.json({size: uploadedFile.byteLength});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
