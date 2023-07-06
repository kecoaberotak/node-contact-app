const yargs = require("yargs");
const contacts = require("./contacts");

// syntax yargs
// .command(cmd, desc, [builder], [handler])

// Versi 2 - pake yargs
yargs
  .command({
    command: "add",
    describe: "Menambahkan contact",
    builder: {
      nama: {
        describe: "Nama pengguna",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Alamat email pengguna",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Nomor handphone pengguna",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand(); // demandCommand() => mengahruskan kita pas jalanin ngasih setidaknya satu command

// menampilkan daftar nama dan nomor
yargs.command({
  command: "list",
  describe: "menampilkan nama dan nomor Hp",
  handler() {
    contacts.listContacts();
  },
});

// buat jalanin
yargs.parse();
