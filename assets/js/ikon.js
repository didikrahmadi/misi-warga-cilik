/* =====================================================================
   IKON – ikon garis bawaan (pengganti emoji)
   Setiap ikon bisa diganti gambar sendiri: taruh file di folder
   assets/img/ikon/ dengan nama <nama-ikon>.png (lihat ASET.ikon di config.js).
   ===================================================================== */
window.IKON = (function () {
  const P = {
    menu: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    kembali: '<path d="M15 5 8 12l7 7"/>',
    lanjut: '<path d="M9 5l7 7-7 7"/>',
    musik: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    musikMati: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><path d="M3 3l18 18"/>',
    layarPenuh: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
    buku: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V4.5M8 7h8M8 11h6"/>',
    guru: '<circle cx="8" cy="7" r="3"/><path d="M2.5 21c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6"/><rect x="13" y="3" width="9" height="7" rx="1"/><path d="M15 6h5"/>',
    atur: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    kunci: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><path d="M12 15v2"/>',
    centang: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    bintang: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/>',
    bengkel: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 0 0 5.3-5.3L15 12l-3-3z"/>',
    arena: '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
    latihan: '<rect x="4" y="3" width="12" height="18" rx="1.5"/><path d="M7.5 8h5M7.5 12h5M7.5 16h3"/><path d="M18 9l3 3-6 6h-3v-3z"/>',
    refleksi: '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8 2.9C20 15.3 12 20 12 20z"/>',
    mik: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    peta: '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
    lup: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
    tambah: '<path d="M12 5v14M5 12h14"/>',
    kurang: '<path d="M5 12h14"/>',
    ulang: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
    tutup: '<path d="M6 6l12 12M18 6 6 18"/>',
    simpan: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    cetak: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="8" rx="2"/><rect x="7" y="13" width="10" height="8"/>',
    suara: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',
    piala: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 21h7M9.5 17h5v4h-5z"/>',
    daftar: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    pin: '<path d="M12 21s-7-6.6-7-11.5a7 7 0 0 1 14 0C19 14.4 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    perisai: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/>',
    lampu: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5.8 1.1.8 1.8V16h6v-.6c0-.7.3-1.3.8-1.8A6 6 0 0 0 12 3z"/>',
    paspor: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><circle cx="12" cy="10" r="3.2"/><path d="M8.5 17h7"/>',
    orang: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 21c0-4 3.1-7 7-7s7 3 7 7"/>',
    kantor: '<path d="M3 21h18M4 21V10l8-6 8 6v11"/><path d="M8 21v-6M12 21v-6M16 21v-6M7.5 11.5h9"/>',
    rumah: '<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
    tangga: '<path d="M3 20h5v-5h5v-5h5V5h3"/><path d="M3 20h18"/>',
    kotakSuara: '<rect x="4" y="10" width="16" height="11" rx="1.5"/><path d="M8 10V4h8v6"/><path d="M10 7h4"/>',
    kota: '<path d="M3 21h18"/><rect x="4" y="9" width="6" height="12"/><rect x="10" y="4" width="7" height="17"/><path d="M17 12h3v9"/><path d="M12.5 8h2M12.5 12h2M12.5 16h2M6 13h2M6 17h2"/>',
    sawah: '<path d="M3 20h18M5 20c0-4 1-7 3-9M9 20c0-5 1.5-9 4-11M14 20c0-4 1.5-7 4-8"/><circle cx="18" cy="5" r="2"/>',
    kotak: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    sapu: '<path d="M14 3l-3.5 8"/><path d="M8 11h7l2 10H6z"/><path d="M10 15v4M13 15v4"/>',
    surat: '<path d="M6 2.5h8l4 4V21.5H6z"/><path d="M14 2.5v4h4M9 11h6M9 14.5h6M9 18h4"/>',
    diskusi: '<path d="M3 5h11v8H8l-3 3v-3H3z"/><path d="M14 9h7v8h-2v3l-3-3h-5v-4"/>',
    sekolah: '<path d="M3 21h18M5 21V11l7-4 7 4v10"/><path d="M12 7V3h4v2h-4"/><path d="M10 21v-5h4v5"/>',
    ktp: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.3"/><path d="M5 16c.6-1.8 2-2.6 3.5-2.6s2.9.8 3.5 2.6M14.5 10h4M14.5 13.5h4"/>',
    jalan: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 10.5v3M12 17v3"/>',
    toga: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>',
    rs: '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M12 8v7M8.5 11.5h7M3 21h18"/>',
    dprd: '<path d="M3 21h18M4 21v-9h16v9M7 12v9M12 12v9M17 12v9"/><path d="M5 12a7 7 0 0 1 14 0"/><path d="M12 5V2.5"/>',
    kerucut: '<path d="M9 4h6l4 15H5z"/><path d="M7.5 10h9M6.3 15h11.4M3 21h18"/>',
    pohon: '<path d="M12 21v-6"/><path d="M12 3 6 12h3l-3 4h12l-3-4h3z"/>',
    tangan: '<path d="M3 12l4-4 4 2 4-3 6 5"/><path d="M7 8v8l3 3h5l4-4M11 13l2 2M13 11l2 2"/>',
    bendera: '<path d="M5 21V3"/><path d="M5 4h12l-2 4 2 4H5"/>',
    senyum: '<circle cx="12" cy="12" r="9"/><path d="M8 14.5c1 1.6 2.4 2.5 4 2.5s3-.9 4-2.5"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    biasa: '<circle cx="12" cy="12" r="9"/><path d="M8.5 15h7"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    bingung: '<circle cx="12" cy="12" r="9"/><path d="M9 16c1.5-1.2 4.5-1.2 6 .5"/><path d="M9 9.5h.01M15 9.5h.01"/><path d="M17.5 4.5c1-.5 2.2 0 2.5 1"/>',
    tim: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M2.5 20c0-3.4 2.4-6 5.5-6s5.5 2.6 5.5 6M14 14.3c3 0 6 1.8 6 5.7"/>',
    sendiri: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21c0-4 3.1-7 7-7s7 3 7 7"/>'
  };
  const ada = {};   // gambar ikon yang berhasil dimuat
  if (window.ASET && ASET.ikonFolder) Object.keys(P).forEach(n => { const src = ASET.ikonFolder + n + '.png', im = new Image(); im.onload = () => { ada[n] = src; }; im.src = src; });

  // ikon(nama, ukuran, tebal) → SVG garis, atau gambar bila file ikon tersedia
  function ikon(nama, ukuran = 40, tebal = 2.2, kelas = '') {
    if (ada[nama]) return `<img class="ik-img ${kelas}" src="${ada[nama]}" alt="" draggable="false" style="width:${ukuran}px;height:${ukuran}px;object-fit:contain;vertical-align:middle">`;
    return `<svg class="ik ${kelas}" viewBox="0 0 24 24" width="${ukuran}" height="${ukuran}" fill="none" stroke="currentColor" stroke-width="${tebal}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[nama] || P.bintang}</svg>`;
  }
  return { ikon, daftar: Object.keys(P) };
})();
