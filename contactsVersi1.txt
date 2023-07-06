const fs = require('node:fs');
const readline = require('node:readline');

const {stdin : input, stdout : output} = require('node:process');
const rl = readline.createInterface({input, output});

// check directory dan membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
};

// check dan membuat file contact.json
const filePath = './data/contact.json';
if(!fs.existsSync(filePath)){
  fs.writeFileSync(filePath, '[]', 'utf-8');
};

// Pertanyaan
const pertanyaan = (tanya) => {
  return new Promise((resolve, reject) => {
    rl.question(`${tanya} anda? `, jawab => {
      resolve(jawab);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  // karena key dan valuenya sama, nulisnya gini
  const contact = {nama , email, noHp};
  const bacaFile = fs.readFileSync('./data/contact.json', 'utf-8');

  const contacts = JSON.parse(bacaFile);
  contacts.push(contact);

  fs.writeFileSync('./data/contact.json', JSON.stringify(contacts));

  rl.close();
};

module.exports = {
  pertanyaan    : pertanyaan,
  simpanContact
}