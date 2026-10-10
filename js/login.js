// JS INI MERUPAKAN LOGIKA HALAMAN LOGIN BESERTA MODALNYA (LOGIN.JS)

// bagian login, saat form dikirim email dan password saya cek ke dataPengguna, kalau cocok sesinya saya simpan lalu pindah ke dashboard
document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault(); // cegah reload halaman

  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  // validasi dulu biar tidak ada kolom yang kosong
  if (email === "" || password === "") {
    alert("Email dan password wajib diisi.");
    return;
  }

  // cari user yang email dan passwordnya cocok pada dataPengguna
  var user = dataPengguna.find(function (u) {
    return u.email === email && u.password === password;
  });

  // kalau tidak ketemu tampilkan alert persis sesuai yang diminta soal
  if (!user) {
    alert("email/password yang anda masukkan salah");
    return;
  }

  // kalau cocok saya simpan datanya ke sessionStorage lalu pindah ke dashboard
  sessionStorage.setItem("userSITTA", JSON.stringify(user));
  window.location.href = "dashboard.html";
});

// fungsi bukaModal untuk memunculkan popup dan tutupModal untuk menyembunyikannya
function bukaModal(id) {
  document.getElementById(id).style.display = "flex";
}
function tutupModal(id) {
  document.getElementById(id).style.display = "none";
}
// kalau area gelap di luar modal diklik saya tutup lagi modalnya
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// bagian lupa password, karena belum ada backend saya hanya tampilkan alert konfirmasi
document.getElementById("formLupa").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("emailLupa").value.trim();
  if (email === "") {
    alert("Email wajib diisi.");
    return;
  }
  alert("Instruksi reset password telah dikirim ke " + email + ".");
  tutupModal("modalLupa");
});

// bagian daftar, sebelum data baru saya masukkan ke array dengan push saya cek dulu biar emailnya tidak ganda
document.getElementById("formDaftar").addEventListener("submit", function (e) {
  e.preventDefault();
  var nama = document.getElementById("namaDaftar").value.trim();
  var email = document.getElementById("emailDaftar").value.trim();
  var password = document.getElementById("passwordDaftar").value.trim();

  if (nama === "" || email === "" || password === "") {
    alert("Semua data wajib diisi.");
    return;
  }
  // cek email ganda pada dataPengguna
  var ada = dataPengguna.find(function (u) {
    return u.email === email;
  });
  if (ada) {
    alert("Email sudah terdaftar. Gunakan email lain.");
    return;
  }

  // data user baru saya tambahkan ke array dataPengguna dengan push
  dataPengguna.push({
    id: dataPengguna.length + 1,
    nama: nama,
    email: email,
    password: password,
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta"
  });

  alert("Pendaftaran berhasil! Silakan login.");
  tutupModal("modalDaftar");
});
