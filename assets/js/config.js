/* =====================================================================
   DAFTAR ASET – MISI WARGA CILIK
   ---------------------------------------------------------------------
   Semua nama file gambar & suara ada di sini. Cukup taruh file Anda di
   folder yang disebutkan dengan nama yang sama, ATAU ubah nama di bawah
   agar sesuai dengan file Anda.

   Bila sebuah file belum ada, media tetap berjalan:
   - gambar diganti ilustrasi bawaan (emoji/bentuk berwarna),
   - efek suara diganti bunyi buatan browser,
   - musik latar diganti melodi lembut bawaan,
   - tombol narasi 🔊 hanya muncul bila file narasinya ada.
   ===================================================================== */
window.ASET = {

  /* ---------- MUSIK LATAR ---------- */
  musik: 'assets/audio/musik/latar.mp3',      // instrumental lembut, mis. "Dari Sabang sampai Merauke"
  volumeMusik: 0.25,                           // 0 – 1
  volumeEfek: 0.7,

  /* ---------- EFEK SUARA (mp3 singkat) ---------- */
  efek: {
    klik:    'assets/audio/sfx/klik.mp3',      // menyentuh tombol
    pop:     'assets/audio/sfx/pop.mp3',       // balon dialog muncul
    benar:   'assets/audio/sfx/benar.mp3',     // jawaban benar
    salah:   'assets/audio/sfx/salah.mp3',     // jawaban belum tepat (lembut)
    stempel: 'assets/audio/sfx/stempel.mp3',   // stempel paspor "dug!"
    konfeti: 'assets/audio/sfx/konfeti.mp3',   // perayaan
    buka:    'assets/audio/sfx/buka.mp3',      // bagian baru terbuka
    halaman: 'assets/audio/sfx/halaman.mp3',   // pindah layar / balik halaman
    seret:   'assets/audio/sfx/seret.mp3',     // kartu mulai diseret
    zoom:    'assets/audio/sfx/zoom.mp3'       // peta diperbesar
  },

  /* ---------- NARASI (opsional, kosong dulu) ----------
     Pola nama: assets/audio/narasi/<kode>.mp3
     Kode setiap kalimat dialog tertulis di assets/js/data-materi.js
     (contoh: rt-1, rt-2, rt-t1 …). Lihat juga DAFTAR-ASET.md */
  narasi: 'assets/audio/narasi/{kode}.mp3',

  /* ---------- GAMBAR ---------- (PNG/SVG/WEBP latar transparan dianjurkan) */
  gambar: {
    logo:          'assets/img/logo.png',               // judul media di layar pembuka (± 1000×300)
    latarPembuka:  'assets/img/latar/pembuka.png',      // 1920×1080
    latarMenu:     'assets/img/latar/menu.png',         // 1920×1080
    latarPetaMisi: 'assets/img/latar/peta-misi.png',    // 1920×1080, jalan berliku RT → Provinsi
    pintuMisi:     'assets/img/menu-misi.png',          // ilustrasi tombol Misi Warga Cilik (± 680×330)
    pintuJelajah:  'assets/img/menu-jelajah.png',       // ilustrasi tombol Jelajah Nusantara (± 680×330)

    // Avatar murid (6 pilihan). Ukuran ± 400×600, latar transparan
    avatar: [
      'assets/img/tokoh/avatar-1.png',
      'assets/img/tokoh/avatar-2.png',
      'assets/img/tokoh/avatar-3.png',
      'assets/img/tokoh/avatar-4.png',
      'assets/img/tokoh/avatar-5.png',
      'assets/img/tokoh/avatar-6.png'
    ],

    // Gambar tokoh per JABATAN (seluruh badan, latar transparan, ± 1024×1536).
    // Dipakai di dialog, pilihan jawaban, Peta Misi, dan Arena "Aku Siapa?".
    // Wajah untuk ikon diambil otomatis dari bagian atas gambar.
    tokohJabatan: {
      'Ketua RT':    'assets/img/tokoh/ketua-rt.png',
      'Ketua RW':    'assets/img/tokoh/ketua-rw.png',
      'Kepala Desa': 'assets/img/tokoh/kepala-desa.png',
      'Lurah':       'assets/img/tokoh/lurah.png',        // belum ada
      'Camat':       'assets/img/tokoh/camat.png',
      'Bupati':      'assets/img/tokoh/bupati.png',
      'Wali Kota':   'assets/img/tokoh/wali-kota.png',    // belum ada
      'Gubernur':    'assets/img/tokoh/gubernur.png',
      'Presiden':    'assets/img/tokoh/presiden.png'      // belum ada (tokoh umum, bukan presiden sungguhan)
    },

    // Gambar gedung/tempat (foto latar dipakai ulang sebagai gambar tombol)
    gedung: {
      'rt':                 'assets/img/latar/rt.png',
      'rw':                 'assets/img/latar/rw.png',
      'desa':               'assets/img/latar/desa.png',
      'kecamatan':          'assets/img/latar/kecamatan.png',
      'kabupaten':          'assets/img/latar/kabupaten.png',
      'provinsi':           'assets/img/latar/provinsi.png',
      'dprd':               'assets/img/gedung/dprd.png',               // belum ada
      'dinas-pendidikan':   'assets/img/gedung/dinas-pendidikan.png',   // belum ada
      'dinas-kesehatan':    'assets/img/gedung/dinas-kesehatan.png',    // belum ada
      'dinas-kependudukan': 'assets/img/gedung/dinas-kependudukan.png', // belum ada
      'dinas-pu':           'assets/img/gedung/dinas-pu.png'            // belum ada
    },

    // Tokoh pemimpin & latar tiap stasiun ditulis di data-materi.js
    // (kunci "gambarTokoh" dan "gambarLatar"), contoh:
    //   assets/img/tokoh/ketua-rt.png   assets/img/latar/rt.png

    // Lambang provinsi: assets/img/logo-provinsi/<kode>.png  (kode 2 digit, mis. 32.png)
    logoProvinsi: 'assets/img/logo-provinsi/{kode}.png',
    // Lambang kabupaten/kota: assets/img/logo-kabkota/<kode>.png (mis. 32.73.png = Kota Bandung)
    // Sumber setiap lambang tercatat di SUMBER-LAMBANG.csv
    logoKabKota:  'assets/img/logo-kabkota/{kode}.png'
  },

  /* ---------- IKON TOMBOL (opsional) ----------
     Media memakai ikon garis bawaan. Untuk menggantinya dengan gambar sendiri,
     taruh PNG transparan (± 128×128) di assets/img/ikon/ dengan nama ikon,
     mis. assets/img/ikon/musik.png. Daftar nama ikon: lihat DAFTAR-ASET.md */
  ikonFolder: 'assets/img/ikon/'
};
