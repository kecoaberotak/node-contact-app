const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator');

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


const simpanContact = (nama, email, noHp) => {
  // karena key dan valuenya sama, nulisnya gini
  if(email === undefined){}
  const contact = {nama , email, noHp};
  const bacaFile = fs.readFileSync('./data/contact.json', 'utf-8');

  const contacts = JSON.parse(bacaFile);

  // Cek duplikasi
  const duplikat = contacts.find(contact => contact.nama === nama);
  if(duplikat){
    console.log(chalk.red.bold.inverse('Nama sudah terdaftar, gunakan nama lain!!!'));
    return false;
  };

  // cek email
  if(email != undefined){
    if(!validator.isEmail(email)){
      console.log(chalk.red.bold.inverse('Gunakan email yang valid!!!'));
      return false;
    }
  }

  // cek nomor hp indo
  if(!validator.isMobilePhone(noHp, 'id-ID')){
    console.log(chalk.red.bold.inverse('Gunakan nomor telepon Indonesia!!!'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('./data/contact.json', JSON.stringify(contacts));
  console.log(chalk.green.bold.inverse('Terima kasih sudah memasukkan data anda'));
};

module.exports = simpanContact;