// =====================================================================
// stok.js — Tampilkan stok bahan ajar dinamis + tambah baris baru
// =====================================================================
cekSesi();

// Gambar cadangan bila pengguna tidak mengunggah cover
var coverKosong = "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='80'%3E%3Crect width='60' height='80' fill='%23d2d2d7'/%3E%3C/svg%3E";

// Render tabel stok dari array dataBahanAjar (JavaScript DOM)
function renderTabelStok() {
  var tbody = document.getElementById("tbodyStok");
  var baris = "";

  for (var i = 0; i < dataBahanAjar.length; i++) {
    baris +=
      "<tr>" +
      "<td><img class='cover' src='" + dataBahanAjar[i].cover +
      "' alt='" + dataBahanAjar[i].namaBarang + "'></td>" +
      "<td>" + dataBahanAjar[i].kodeLokasi + "</td>" +
      "<td>" + dataBahanAjar[i].kodeBarang + "</td>" +
      "<td>" + dataBahanAjar[i].namaBarang + "</td>" +
      "<td>" + dataBahanAjar[i].jenisBarang + "</td>" +
      "<td>" + dataBahanAjar[i].edisi + "</td>" +
      "<td>" + dataBahanAjar[i].stok + "</td>" +
      "</tr>";
  }
  tbody.innerHTML = baris;
}
renderTabelStok();

// Simpan baris baru: push ke array lalu render ulang tabel (manipulasi DOM)
function simpanBarisStok(cover) {
  dataBahanAjar.push({
    kodeLokasi: document.getElementById("kodeLokasi").value.trim(),
    kodeBarang: document.getElementById("kodeBarang").value.trim(),
    namaBarang: document.getElementById("namaBarang").value.trim(),
    jenisBarang: document.getElementById("jenisBarang").value.trim(),
    edisi: document.getElementById("edisi").value.trim(),
    stok: parseInt(document.getElementById("stok").value, 10),
    cover: cover
  });
  renderTabelStok();
  alert("Stok bahan ajar baru berhasil ditambahkan.");
  document.getElementById("formStok").reset();
}

// Tambah baris stok baru lewat form
document.getElementById("formStok").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validasi: semua kolom teks wajib diisi
  var kolom = ["kodeLokasi", "kodeBarang", "namaBarang", "jenisBarang", "edisi", "stok"];
  for (var i = 0; i < kolom.length; i++) {
    if (document.getElementById(kolom[i]).value.trim() === "") {
      alert("Semua kolom wajib diisi.");
      return;
    }
  }

  // Cover opsional: bila diunggah, ekstensi filenya saya cek dulu, hanya png jpg jpeg yang saya izinkan
  var inputCover = document.getElementById("cover");
  if (inputCover.files && inputCover.files[0]) {
    var file = inputCover.files[0];
    var diizinkan = ["png", "jpg", "jpeg"];
    var ekstensi = file.name.split(".").pop().toLowerCase();
    if (diizinkan.indexOf(ekstensi) === -1) {
      alert("Format cover harus PNG, JPG, atau JPEG.");
      inputCover.value = "";
      return;
    }
    var pembaca = new FileReader();
    pembaca.onload = function (e) {
      simpanBarisStok(e.target.result);
    };
    pembaca.readAsDataURL(file);
  } else {
    simpanBarisStok(coverKosong);
  }
});
