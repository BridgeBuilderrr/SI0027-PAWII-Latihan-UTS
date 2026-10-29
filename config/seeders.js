require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const Kantin = require("../models/kantinModel");
const Menu = require("../models/menuModel");

const kantinSeed = [
  {
    nama: "Kantin Pusat",
    lokasi: "Gedung A Lantai 1",
  },
  {
    nama: "Kantin Timur",
    lokasi: "Gedung B Lantai 1",
  },
  {
    nama: "Kantin Selatan",
    lokasi: "Gedung C Lantai 2",
  },
];

const menuSeed = [
  {
    nama: "Nasi Goreng Spesial",
    kode: "MN-004217",
    bahan: ["Beras", "Telur", "Bawang"],
    gizi: { kalori: 450, protein: 15 },
    harga: 12000,
    kantinId: null,
    tersedia: true,
    createdAt: new Date("2026-10-29T08:00:00.000Z"),
  },
  {
    nama: "Mie Ayam Jumbo",
    kode: "MN-004218",
    bahan: ["Mie", "Ayam", "Sayur"],
    gizi: { kalori: 520, protein: 18 },
    harga: 15000,
    kantinId: null,
    tersedia: true,
    createdAt: new Date("2026-10-29T08:05:00.000Z"),
  },
  {
    nama: "Es Teh Manis",
    kode: "MN-004219",
    bahan: ["Teh", "Gula", "Es"],
    gizi: { kalori: 120, protein: 0 },
    harga: 5000,
    kantinId: null,
    tersedia: true,
    createdAt: new Date("2026-10-29T08:10:00.000Z"),
  },
];

const seedDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI belum diatur di file .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Terhubung ke MongoDB Atlas");

    await Kantin.deleteMany({});
    await Menu.deleteMany({});

    const insertedKantin = await Kantin.insertMany(kantinSeed);

    const seededMenus = menuSeed.map((menu, index) => ({
      ...menu,
      kantinId: insertedKantin[index % insertedKantin.length]._id,
    }));

    const insertedMenu = await Menu.insertMany(seededMenus);

    console.log(`Seeder Kantin berhasil: ${insertedKantin.length} data masuk`);
    console.log(`Seeder Menu berhasil: ${insertedMenu.length} data masuk`);
  } catch (error) {
    console.error("Gagal melakukan seeding database:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Koneksi MongoDB ditutup");
  }
};

seedDatabase();

module.exports = { menuSeed, kantinSeed };
