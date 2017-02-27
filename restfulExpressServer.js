const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const path = require('path');
const petPaths = path.join(__dirname , 'pets.json');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('common'));

app.get('/pets', (req, res) => {
  let file = fs.readFileSync(petPaths);
  let jData = JSON.parse(file);
  res.send(jData);
});

app.get('/pets/:index', (req, res) => {
  let file = fs.readFileSync(petPaths);
  let jData = JSON.parse(file);
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

app.post('/pets', (req, res) => {
  let file = fs.readFileSync(petPaths);
  let jData = JSON.parse(file);
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

app.patch('/pets/:index', (req, res) => {
  let file = fs.readFileSync(petPaths);
  let jData = JSON.parse(file);
  let index = req.params.index;
  let jIndex = jData[index];
  for (let key in req.body) {
    jIndex[key] = req.body[key];
  }
  fs.writeFileSync('pets.json', JSON.stringify(jData));
  res.send(jIndex);
});

app.delete('/pets/:index', (req, res) => {
  let file = fs.readFileSync(petPaths);
  let jData = JSON.parse(file);
  let del = jData.splice(req.params.index, 1);
  fs.writeFileSync('pets.json', JSON.stringify(jData));
  res.send(del[0]);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

module.exports = app;
