const yargs = require('yargs');
const simpanContact = require('./contacts');

// syntax yargs
// .command(cmd, desc, [builder], [handler])


// Versi 2 - pake yargs
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
    simpanContact(argv.nama, argv.email, argv.noHp);
  },
});

// buat jalanin
yargs.parse();