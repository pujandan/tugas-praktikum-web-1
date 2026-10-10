// JS INI MERUPAKAN LOGIKA HALAMAN LAPORAN (LAPORAN.JS)

cekSesi();
tampilkanGreeting();

// laporan pertama yaitu monitoring progress DO, setiap transaksi saya buatkan kartu berisi progress bar
var monitoring = document.getElementById("monitoringDO");
var htmlMonitoring = "";

for (var nomor in dataTracking) {
  var data = dataTracking[nomor];
  var logTerakhir = data.perjalanan[data.perjalanan.length - 1].keterangan;
  var persen = 30;
  if (data.status === "Dalam Perjalanan") persen = 60;
  if (data.status === "Dikirim" || logTerakhir.indexOf("Selesai Antar") !== -1) {
    persen = 100;
  }

  htmlMonitoring +=
    "<article class='card'>" +
    "<h4>" + nomor + " — " + data.nama + "</h4>" +
    "<p>Ekspedisi: " + data.ekspedisi + " | Status: <span class='" +
    kelasBadge(data.status) + "'>" + data.status + "</span></p>" +
    "<div class='progress'>" +
    "<div class='progress-bar' style='width:" + persen + "%'>" + persen + "%</div>" +
    "</div>" +
    "</article>";
}
monitoring.innerHTML = htmlMonitoring;

// laporan kedua yaitu rekap bahan ajar, total judul dan total stoknya saya hitung dari array dataBahanAjar
var totalJudul = dataBahanAjar.length;
var totalStok = 0;
for (var i = 0; i < dataBahanAjar.length; i++) {
  totalStok += dataBahanAjar[i].stok;
}

document.getElementById("rekapTotalJudul").textContent = totalJudul + " judul";
document.getElementById("rekapTotalStok").textContent = totalStok + " eksemplar";

// isi tabel rekap saya loop dari dataBahanAjar
var tabelRekap = document.getElementById("tbodyRekap");
var baris = "";
for (var j = 0; j < dataBahanAjar.length; j++) {
  baris +=
    "<tr>" +
    "<td>" + dataBahanAjar[j].kodeBarang + "</td>" +
    "<td>" + dataBahanAjar[j].namaBarang + "</td>" +
    "<td>" + dataBahanAjar[j].edisi + "</td>" +
    "<td>" + dataBahanAjar[j].stok + "</td>" +
    "</tr>";
}
tabelRekap.innerHTML = baris;
