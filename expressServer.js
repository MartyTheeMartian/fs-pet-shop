const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const fs = require('fs');

function openFile() {
  let file = fs.readFileSync('pets.json');
  let jData = JSON.parse(file);
  return jData;
}

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  let jData = openFile();
  res.send(jData);
});

app.get('/pets/:index',(req, res) => {
  let jData = openFile();
  let condition = true;
  for (let i = 0; i < jData.length; i++) {
    if (i.toString() === req.params.index) {
      res.send(jData[req.params.index]);
      condition = false;
    }
  }
  if (condition) {
    res.sendStatus(404);
  }
});

app.post('/pets',(req, res) => {
  let jData = openFile();
  let condition = true;
  for (let key in req.body) {
    if (req.body[key] === '') {
      condition = false;
      res.sendStatus(400);
      break;
    }
  }
  if(condition) {
    jData.push(req.body);
    fs.writeFileSync('pets.json', JSON.stringify(jData));
    res.send(req.body);
  }
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

module.exports = app;
