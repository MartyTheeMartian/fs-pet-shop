#!/usr/bin/env node

const fs = require('fs');
const file = fs.readFileSync('pets.json');
const jData = JSON.parse(file);

function createPet(num, str1, str2) {
  let obj = {
    age: parseInt(num),
    kind: str1,
    name: str2
  };
  return obj;
}

if (process.argv[2] === undefined) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
else if (process.argv[2] === 'read') {
  if (process.argv[3] !== undefined) {
    for (let i = 0; i < jData.length; i++) {
      if(process.argv[3] === i.toString()) {
        console.log(jData[i]);
        condition = false;
      }
    }
    if (condition) {
      console.log('Usage: node pets.js read INDEX');
    }
  }
  else {
    console.log(jData);
  }
}
else if (process.argv[2] === 'create') {
  if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
  else {
    let obj = createPet(process.argv[3], process.argv[4], process.argv[5]);
    jData.push(obj);
    fs.writeFileSync('pets.json', JSON.stringify(jData));
    console.log(obj);
  }
}
else if (process.argv[2] === 'update') {
  if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined || process.argv[6] === undefined) {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME');
    process.exit(1);
  }
  else {
    let index = process.argv[3];
    let obj = createPet(process.argv[4], process.argv[5], process.argv[6]);
    jData[index] = obj;
    fs.writeFileSync('pets.json', JSON.stringify(jData));
    console.log(obj);
  }
}
else if (process.argv[2] === 'destroy') {
  if (process.argv[3] === undefined) {
    console.error('Usage: node pets.js destroy INDEX');
    process.exit(1);
  }
  else {
    let index = parseInt(process.argv[3]);
    console.log(jData[index]);
    jData.splice(index, 1);
    fs.writeFileSync('pets.json', JSON.stringify(jData));
  }
}
