const yargs = require('yargs');
const contacts = require('./contacts');

// syntax yargs
// .command(cmd, desc, [builder], [handler])

// cara 1
// yargs.command('add', 'Menambahkan contact baru', () => {}, (argv) => {
//   console.log(argv.nama);
// });


// Versi 2
yargs.command({
  command   : 'add',
  describe  : 'Menambahkan contact',
  builder   : {
    nama  : {
      describe      : 'Nama pengguna',
      demandOption  : true,
      type          : 'string'
    },
    email  : {
      describe      : 'Alamat email pengguna',
      demandOption  : false,
      type          : 'string'
    },
    noHp  : {
      describe      : 'Nomor handphone pengguna',
      demandOption  : true,
      type          : 'string'
    }
  },
  handler : function (argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHp);
  },
});

// buat jalanin
yargs.parse();


// Versi 1
const main = async () => {
  const nama = await contacts.pertanyaan('Nama');
  const email = await contacts.pertanyaan('Email');
  const noHp = await contacts.pertanyaan('Nomor Handphone');

  contacts.simpanContact(nama, email, noHp);
};

main();