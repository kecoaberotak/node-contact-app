const fs = require("node:fs");
const chalk = require("chalk");
const validator = require("validator");

// check directory dan membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// check dan membuat file contact.json
const filePath = "./data/contact.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// load file JSON
const loadContacts = () => {
  const fileBuffer = fs.readFileSync("./data/contact.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// simpan contact ke json
const simpanContact = (nama, email, noHp) => {
  // karena key dan valuenya sama, nulisnya gini
  if (email === undefined) {
  }
  const contact = { nama, email, noHp };
  const contacts = loadContacts();

  // Cek duplikasi
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.bold.inverse("Nama sudah terdaftar, gunakan nama lain!!!"));
    return false;
  }

  // cek email
  if (email != undefined) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold.inverse("Gunakan email yang valid!!!"));
      return false;
    }
  }

  // cek nomor hp indo
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.bold.inverse("Gunakan nomor telepon Indonesia!!!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("./data/contact.json", JSON.stringify(contacts));
  console.log(chalk.green.bold.inverse("Terima kasih sudah memasukkan data anda"));
};

// Tampil list nama dan nomor hp
const listContacts = () => {
  const contacts = loadContacts();

  console.log(chalk.bold.green("Daftar Kontak: \n"));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. Nama : ${contact.nama} \n   Nomor Handphone : ${contact.noHp} `);
  });
};

// tampil detail
const detailContact = (nama) => {
  const contacts = loadContacts();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.bold.inverse(`TIDAK ADA PENGGUNA DENGAN NAMA ${nama}`));
  } else if (contact) {
    console.log(chalk.bold.green("Detail Kontak: \n"));
    contact.email === undefined
      ? console.log(`Nama : ${contact.nama} \nEmail : pengguna ini tidak memasukkan email\nNomor Handphone : ${contact.noHp} `)
      : console.log(`Nama : ${contact.nama} \nEmail : ${contact.email}\nNomor Handphone : ${contact.noHp} `);
  }
};

// hapus kontak
const hapusContact = (nama) => {
  const contacts = loadContacts();
  const contactsFilter = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  contacts.length === contactsFilter.length 
  ? console.log(chalk.red.bold.inverse(`TIDAK ADA PENGGUNA DENGAN NAMA ${nama}`)) 
  : console.log(chalk.green.bold.inverse(`Kontak pengguna dengan nama ${nama}, berhasil dihapus`));

  fs.writeFileSync("./data/contact.json", JSON.stringify(contactsFilter));
};

module.exports = { simpanContact, listContacts, detailContact, hapusContact };
