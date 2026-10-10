// JS INI MERUPAKAN LOGIKA HALAMAN TRACKING (TRACKING.JS)

cekSesi();
tampilkanGreeting();

// saat form dicari, nomor DO saya ambil lalu saya cari pada dataTracking, kalau tidak ketemu saya tampilkan alert
document.getElementById("formCari").addEventListener("submit", function (e) {
  e.preventDefault();

  var nomor = document.getElementById("nomorDO").value.trim();
  var hasil = document.getElementById("hasilTracking");

  // validasi dulu biar nomornya tidak kosong
  if (nomor === "") {
    alert("Nomor delivery order wajib diisi.");
    return;
  }

  // cari data pengiriman berdasarkan nomor DO
  var data = dataTracking[nomor];
  if (!data) {
    alert("Nomor delivery order tidak ditemukan.");
    hasil.innerHTML = "";
    return;
  }

  // persen progress saya tentukan dari status pengiriman, dikirim berarti 100 persen
  var logTerakhir = data.perjalanan[data.perjalanan.length - 1].keterangan;
  var persen = 30;
  if (data.status === "Dalam Perjalanan") persen = 60;
  if (data.status === "Dikirim" || logTerakhir.indexOf("Selesai Antar") !== -1) {
    persen = 100;
  }

  // riwayat perjalanan saya loop lalu saya susun jadi list timeline
  var logHtml = "";
  for (var i = 0; i < data.perjalanan.length; i++) {
    logHtml +=
      "<li><span class='waktu'>" + data.perjalanan[i].waktu +
      "</span><br>" + data.perjalanan[i].keterangan + "</li>";
  }

  // hasil pencarian saya susun jadi kartu berisi detail dan progress bar lalu saya tampilkan dengan innerHTML
  hasil.innerHTML =
    "<article class='card'>" +
    "<h3>Nomor DO: " + data.nomorDO + "</h3>" +
    "<p><strong>Nama Mahasiswa:</strong> " + data.nama + "</p>" +
    "<p><strong>Status:</strong> <span class='" + kelasBadge(data.status) + "'>" + data.status + "</span></p>" +
    "<p><strong>Ekspedisi:</strong> " + data.ekspedisi + "</p>" +
    "<p><strong>Tanggal Kirim:</strong> " + data.tanggalKirim + "</p>" +
    "<p><strong>Jenis Paket:</strong> " + data.paket + "</p>" +
    "<p><strong>Total Pembayaran:</strong> " + data.total + "</p>" +
    "<div class='progress'>" +
    "<div class='progress-bar' style='width:" + persen + "%'>" + persen + "%</div>" +
    "</div>" +
    "<h4>Riwayat Perjalanan</h4>" +
    "<ul class='timeline'>" + logHtml + "</ul>" +
    "</article>";
});
