const fs = require("node:fs");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  return contacts;
};

const simpanContact = (nama, nohp, email) => {
  const contact = { nama, nohp, email };

  const contacts = loadContact();

  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log("Contact sudah terdaftar, gunakan nama lain");
    return false;
  }

  if (!validator.isMobilePhone(nohp.toString(), "id-ID")) {
    console.log("Nomor handphone tidak valid!");
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid!");
      return false;
    }
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terimakasih sudah memasukkan data");
};

const listContact = () => {
  const contacts = loadContact();

  console.log("Daftar Kontak : ");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.nohp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(`${nama} tidak ditemukan!`);
    return false;
  }

  console.log(contact.nama);
  console.log(contact.nohp);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(`${nama} tidak ditemukan`);
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));

  console.log(`data contact ${nama} berhasil dihapus!`);
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
