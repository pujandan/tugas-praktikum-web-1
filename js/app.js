// JS INI MERUPAKAN FUNGSI BERSAMA UNTUK SEMUA HALAMAN SELAIN LOGIN (APP.JS)

// fungsi cekSesi untuk memaksa user login dulu, kalau tidak ada sesi saya lempar balik ke halaman login
function cekSesi() {
  if (!sessionStorage.getItem("userSITTA")) {
    window.location.href = "login.html";
  }
}

// fungsi getUser untuk mengambil data user yang sedang login dari sessionStorage
function getUser() {
  return JSON.parse(sessionStorage.getItem("userSITTA"));
}

// fungsi sapaWaktu untuk menentukan sapaan sesuai jam, saya bagi jadi pagi siang sore dan malam
function sapaWaktu() {
  var jam = new Date().getHours();
  if (jam >= 5 && jam < 11) return "Selamat pagi";
  if (jam >= 11 && jam < 15) return "Selamat siang";
  if (jam >= 15 && jam < 18) return "Selamat sore";
  return "Selamat malam";
}

// fungsi tampilkanGreeting untuk menampilkan sapaan dan nama user ke elemen #greeting
function tampilkanGreeting() {
  var user = getUser();
  document.getElementById("greeting").textContent =
    sapaWaktu() + ", " + user.nama + "!";
}

// fungsi logout untuk menghapus sesi lalu kembali ke halaman login
function logout() {
  sessionStorage.removeItem("userSITTA");
  window.location.href = "login.html";
}

// fungsi kelasBadge untuk menentukan warna badge sesuai status, saya letakkan di sini biar bisa dipakai beberapa halaman
function kelasBadge(status) {
  return status === "Dikirim" ? "badge badge-kirim" : "badge badge-jalan";
}
