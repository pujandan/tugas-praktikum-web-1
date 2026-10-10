// =====================================================================
// dashboard.js — auth guard, greeting sesuai waktu, kartu profil user
// =====================================================================
cekSesi();
tampilkanGreeting();

// Isi kartu profil dari data user yang tersimpan di sessionStorage
var user = getUser();
document.getElementById("profNama").textContent = user.nama;
document.getElementById("profRole").textContent = user.role;
document.getElementById("profLokasi").textContent = user.lokasi;
