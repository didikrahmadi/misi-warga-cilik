/* =====================================================================
   TAMPILAN – memuat gambar tombol, panel, dan Buku Atlas (lihat ASET.ui
   dan ASET.jelajah di config.js). Bila sebuah gambar berhasil dimuat,
   kelas "ada-<nama>" dipasang pada <html> sehingga gaya bergambar aktif.
   Bila gambar belum ada, tampilan bawaan tetap dipakai.
   ===================================================================== */
window.TAMPILAN = (function () {
  const ada = {}, akar = document.documentElement;
  // alamat lengkap: url() di variabel CSS dibaca relatif terhadap file CSS, jadi harus mutlak
  const penuh = src => new URL(src, document.baseURI).href;
  function muat(nama, src, cb) {
    if (!src) return;
    const im = new Image();
    im.onload = () => { ada[nama] = src; akar.classList.add('ada-' + nama); cb && cb(im); };
    im.src = src;
  }
  // tombol & panel 9-bagian
  Object.entries(ASET.ui || {}).forEach(([nama, o]) => muat(nama, o.src, () => {
    akar.style.setProperty('--img-' + nama, `url("${penuh(o.src)}")`);
    if (o.potong) akar.style.setProperty('--potong-' + nama, o.potong);
    if (o.sudut) akar.style.setProperty('--sudut-' + nama, o.sudut + 'px');
  }));
  // buku atlas
  const J = ASET.jelajah || {};
  ['mejaAtlas', 'laut', 'kartuKoleksi', 'pinIbukota', 'kompas'].forEach(n => muat(n, J[n], () => {
    akar.style.setProperty('--img-' + n, `url("${penuh(J[n])}")`);
    // bila layar provinsi sudah terbuka sebelum gambar selesai dimuat, tata ulang
    if ((n === 'mejaAtlas' || n === 'pinIbukota') && window.App && App.kini.nama === 'provinsi') App.ke('provinsi', App.kini.arg);
  }));
  if (J.kartuProvinsi) muat('kartuProvinsi', J.kartuProvinsi.src, () => {
    akar.style.setProperty('--img-kartuProvinsi', `url("${penuh(J.kartuProvinsi.src)}")`);
    akar.style.setProperty('--potong-kartuProvinsi', J.kartuProvinsi.potong || 90);
    akar.style.setProperty('--sudut-kartuProvinsi', (J.kartuProvinsi.sudut || 44) + 'px');
  });
  return { ada };
})();
