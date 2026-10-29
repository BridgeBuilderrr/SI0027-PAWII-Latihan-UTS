// TODO A: Rancang Schema & Model Menu sesuai tabel skema pada README.md
//
// Ketentuan:
//   nama       String, wajib diisi, spasi di awal/akhir dibuang
//   kode       String, wajib, UNIK, berformat "MN-" diikuti tepat 6 digit angka
//   bahan      Array of String (EMBEDDED), minimal 1 bahan
//   gizi       Subdocument (EMBEDDED, tanpa _id sendiri):
//                kalori  Number, wajib, 0 s.d. 5000
//                protein Number, tidak boleh negatif, default 0
//   harga      Number, wajib, tidak boleh negatif
//   kantinId   ObjectId (REFERENCING ke model "Kantin"), wajib
//   tersedia   Boolean, default true
//   createdAt  Date, default waktu saat ini
//
// Petunjuk: lihat models/kantinModel.js sebagai contoh sintaks dasar,
// dan materi Pertemuan 9-10 (embedding vs referencing).

const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },
    kode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^MN-\d{6}$/.test(value);
        },
        message: "Kode harus berformat MN- diikuti 6 digit angka",
      },
    },
    bahan: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length > 0 &&
            value.every(
              (item) => typeof item === "string" && item.trim().length > 0
            )
          );
        },
        message: "Bahan harus berupa array string yang tidak kosong",
      },
    },
    gizi: {
      type: {
        kalori: {
          type: Number,
          required: true,
          min: 0,
          max: 5000,
        },
        protein: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
      required: true,
      _id: false,
    },
    harga: {
      type: Number,
      required: true,
      min: 0,
    },
    kantinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kantin",
      required: true,
    },
    tersedia: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Menu", menuSchema);

// TODO A1: buat schema subdocument gizi
// TODO A2: buat menuSchema
// TODO A3: export model dengan nama "Menu"
