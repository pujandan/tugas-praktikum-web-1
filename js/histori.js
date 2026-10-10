// JS INI MERUPAKAN LOGIKA HALAMAN HISTORI (HISTORI.JS)

cekSesi();
tampilkanGreeting();

// isi tabel histori saya loop dari dataTracking, jadi kalau ada transaksi baru tabelnya otomatis ikut
var tbody = document.getElementById("tbodyHistori");
var baris = "";

for (var nomor in dataTracking) {
  var d = dataTracking[nomor];
  baris +=
    "<tr>" +
    "<td>" + nomor + "</td>" +
    "<td>" + d.nama + "</td>" +
    "<td>" + d.paket + "</td>" +
    "<td>" + d.tanggalKirim + "</td>" +
    "<td>" + d.total + "</td>" +
    "<td><span class='" + kelasBadge(d.status) + "'>" + d.status + "</span></td>" +
    "</tr>";
}
tbody.innerHTML = baris;
