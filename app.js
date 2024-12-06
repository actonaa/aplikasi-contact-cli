const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    bulder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      nohp: {
        describe: "No handphone",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.nohp, argv.email);
    },
  })
  .demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no HP contact",
  handler() {
    listContact();
  },
});

// menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact bedasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact bedasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
