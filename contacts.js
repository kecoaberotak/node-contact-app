const fs = require('node:fs');

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
  const contact = {nama , email, noHp};
  const bacaFile = fs.readFileSync('./data/contact.json', 'utf-8');

  const contacts = JSON.parse(bacaFile);

  // Cek duplikasi
  const duplikat = contacts.find(contact => contact.nama === nama);
  if(duplikat){
    console.log('Nama sudah terdaftar, gunakan nama lain!!!');
    return false;
  };

  contacts.push(contact);

  fs.writeFileSync('./data/contact.json', JSON.stringify(contacts));
};

module.exports = simpanContact;