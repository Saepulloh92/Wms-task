// Data awal (36 bin contoh) + petugas dummy
// asal: Code-fix.gs baris 106-153
var SEED_MASTER = [
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-01-A", "status": "Active", "kode": "10172005089004", "aging": 76, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 630, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 630},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-01-B", "status": "Active", "kode": "10012010032004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 1\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-02-A", "status": "Active", "kode": "10172005089004", "aging": 86, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 2773, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 2773},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-02-B", "status": "Active", "kode": "10012010032004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 1\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-03-A", "status": "Active", "kode": "10172005076004", "aging": 79, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 2 1/2\" SC 4M", "onhand": 6731, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 6731},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-03-B", "status": "Active", "kode": "10012010042004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 1 1/4\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-04-A", "status": "Active", "kode": "10172005076004", "aging": 86, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 2 1/2\" SC 4M", "onhand": 5011, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 5011},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-04-B", "status": "Active", "kode": "10012010060004", "aging": 22, "sinyal": "Hijau 2", "item": "PIPA RUCIKA JIS AW 2\" SC 4M", "onhand": 3, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 3},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-05-A", "status": "Active", "kode": "10172005089004", "aging": 76, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 5988, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 5988},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-05-B", "status": "Active", "kode": "10012010060004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 2\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-06-A", "status": "Active", "kode": "10172005089004", "aging": 75, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 7536, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 7536},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-06-B", "status": "Active", "kode": "10012010048004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 1 1/2\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-07-A", "status": "Active", "kode": "10172005089004", "aging": 67, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 6724, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 6724},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-07-B", "status": "Active", "kode": "10012010076004", "aging": 43, "sinyal": "Kuning 1", "item": "PIPA RUCIKA JIS AW 2 1/2\" SC 4M", "onhand": 1, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 1},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-08-A", "status": "Active", "kode": "10172005089004", "aging": 62, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 5829, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 5829},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-08-B", "status": "Active", "kode": "10012010089004", "aging": 2, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 3\" SC 4M", "onhand": 50, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 50},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-09-A", "status": "Active", "kode": "10172005089004", "aging": 82, "sinyal": "Kuning 2", "item": "PIPA RUCIKA STANDARD D 3\" SC 4M", "onhand": 5784, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 5784},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-09-B", "status": "Active", "kode": "10012010089004", "aging": 23, "sinyal": "Hijau 2", "item": "PIPA RUCIKA JIS AW 3\" SC 4M", "onhand": 262, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 262},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-10-A", "status": "Active", "kode": "10172005114004", "aging": 56, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 44, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 44},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-10-B", "status": "Active", "kode": "10012010114004", "aging": 7, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 4\" SC 4M", "onhand": 136, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 136},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-11-A", "status": "Active", "kode": "10172005114004", "aging": 56, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 4389, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 4389},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-11-B", "status": "Active", "kode": "10012010114004", "aging": 2, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 4\" SC 4M", "onhand": 50, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 50},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-12-A", "status": "Active", "kode": "10172005114004", "aging": 59, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 7425, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 7425},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-12-B", "status": "Active", "kode": "10012010022004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 1/2\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-13-A", "status": "Active", "kode": "10172005114004", "aging": 59, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 7565, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 7565},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-13-B", "status": "Active", "kode": "10012010140004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 5\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-14-A", "status": "Active", "kode": "10172005114004", "aging": 53, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 7223, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 7223},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-14-B", "status": "Active", "kode": "10012010165004", "aging": 2, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 6\" SC 4M", "onhand": 305, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 305},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-15-A", "status": "Active", "kode": "10172005114004", "aging": 56, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 4\" SC 4M", "onhand": 6075, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 6075},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-15-B", "status": "Active", "kode": "10012010114004", "aging": 2, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 4\" SC 4M", "onhand": 50, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 50},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-16-A", "status": "Active", "kode": "10172005140004", "aging": 49, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 5\" SC 4M", "onhand": 4994, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 4994},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-16-B", "status": "Active", "kode": "10172005267004", "aging": 7, "sinyal": "Hijau 1", "item": "PIPA RUCIKA STANDARD D 10\" SC 4M", "onhand": 2, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 2},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-17-A", "status": "Active", "kode": "10172005165004", "aging": 51, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 6\" SC 4M", "onhand": 4778, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 4778},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-17-B", "status": "Active", "kode": "10012010022004", "aging": 17, "sinyal": "Hijau 2", "item": "PIPA RUCIKA JIS AW 1/2\" SC 4M", "onhand": 1500, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 1500},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-18-A", "status": "Active", "kode": "10172005165004", "aging": 51, "sinyal": "Kuning 1", "item": "PIPA RUCIKA STANDARD D 6\" SC 4M", "onhand": 5488, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 5488},
  {"lokasi": "L-PIPA", "area": "B1", "bin": "B1-18-B", "status": "Active", "kode": "10012010216004", "aging": 0, "sinyal": "Hijau 1", "item": "PIPA RUCIKA JIS AW 8\" SC 4M", "onhand": 0, "bookingSusun": 0, "bookingMuat": 0, "freeStock": 0}
];

/* Petugas dummy (id sama dengan DEFAULT_USERS di aplikasi). PIN TIDAK disimpan di server:
   PIN bawaan ada di aplikasi (Admin 1234, Budi 1111, Sari 2222, Andi 3333). Ganti di menu User & Area. */
function SEED_USERS() {
  var o = [['ua0admin', 'Admin', 'admin'], ['ua1budi', 'Budi', 'petugas'], ['ua2sari', 'Sari', 'petugas'], ['ua3andi', 'Andi', 'petugas']];
  return o.map(function (x) {
    return { id: x[0], name: x[1], role: x[2], active: true, areas: x[2] === 'admin' ? [] : ['B1'] };
  });
}

