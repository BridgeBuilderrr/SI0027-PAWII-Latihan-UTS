const menuSeed = [
  {
    nama: "Nasi Goreng Spesial",
    kode: "MN-004217",
    bahan: ["Beras", "Telur", "Bawang"],
    gizi: { kalori: 450, protein: 15 },
    harga: 12000,
    kantinId: "665f1b9a8b1e4a0012ab34aa",
    tersedia: true,
    createdAt: new Date("2026-10-29T08:00:00.000Z"),
  },
  {
    nama: "Mie Ayam Jumbo",
    kode: "MN-004218",
    bahan: ["Mie", "Ayam", "Sayur"],
    gizi: { kalori: 520, protein: 18 },
    harga: 15000,
    kantinId: "665f1b9a8b1e4a0012ab34aa",
    tersedia: true,
    createdAt: new Date("2026-10-29T08:05:00.000Z"),
  },
];

module.exports = { menuSeed };
