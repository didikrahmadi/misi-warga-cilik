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
    logo:          'assets/img/logo.webp',               // judul media di layar pembuka (± 1000×300)
    latarPembuka:  'assets/img/latar/pembuka.webp',      // 1920×1080
    latarMenu:     'assets/img/latar/menu.webp',         // 1920×1080
    latarPetaMisi: 'assets/img/latar/peta-misi.webp',    // 1920×1080, jalan berliku RT → Provinsi
    pintuMisi:     'assets/img/menu-misi.webp',          // ilustrasi tombol Misi Warga Cilik (± 680×330)
    pintuJelajah:  'assets/img/menu-jelajah.webp',       // ilustrasi tombol Jelajah Nusantara (± 680×330)

    // Avatar murid (6 pilihan). Ukuran ± 400×600, latar transparan
    avatar: [
      'assets/img/tokoh/avatar-1.webp',
      'assets/img/tokoh/avatar-2.webp',
      'assets/img/tokoh/avatar-3.webp',
      'assets/img/tokoh/avatar-4.webp',
      'assets/img/tokoh/avatar-5.webp',
      'assets/img/tokoh/avatar-6.webp'
    ],

    // Gambar tokoh per JABATAN (seluruh badan, latar transparan, ± 400×600 (optimal untuk batas 200 KB)).
    // Dipakai di dialog, pilihan jawaban, Peta Misi, dan Arena "Aku Siapa?".
    // Wajah untuk ikon diambil otomatis dari bagian atas gambar.
    tokohJabatan: {
      'Ketua RT':    'assets/img/tokoh/ketua-rt.webp',
      'Ketua RW':    'assets/img/tokoh/ketua-rw.webp',
      'Kepala Desa': 'assets/img/tokoh/kepala-desa.webp',
      'Lurah':       'assets/img/tokoh/lurah.webp',        // opsional
      'Camat':       'assets/img/tokoh/camat.webp',
      'Bupati':      'assets/img/tokoh/bupati.webp',
      'Wali Kota':   'assets/img/tokoh/wali-kota.webp',    // opsional
      'Gubernur':    'assets/img/tokoh/gubernur.webp',
      'Presiden':    'assets/img/tokoh/presiden.webp'      // opsional (tokoh umum, bukan presiden sungguhan)
    },

    // Gambar gedung/tempat (foto latar dipakai ulang sebagai gambar tombol)
    gedung: {
      'rt':                 'assets/img/latar/rt.webp',
      'rw':                 'assets/img/latar/rw.webp',
      'desa':               'assets/img/latar/desa.webp',
      'kecamatan':          'assets/img/latar/kecamatan.webp',
      'kabupaten':          'assets/img/latar/kabupaten.webp',
      'provinsi':           'assets/img/latar/provinsi.webp',
      'dprd':               'assets/img/gedung/dprd.webp',               // opsional
      'dinas-pendidikan':   'assets/img/gedung/dinas-pendidikan.webp',   // opsional
      'dinas-kesehatan':    'assets/img/gedung/dinas-kesehatan.webp',    // opsional
      'dinas-kependudukan': 'assets/img/gedung/dinas-kependudukan.webp', // opsional
      'dinas-pu':           'assets/img/gedung/dinas-pu.webp'            // opsional
    },

    // Tokoh pemimpin & latar tiap stasiun ditulis di data-materi.js
    // (kunci "gambarTokoh" dan "gambarLatar"), contoh:
    //   assets/img/tokoh/ketua-rt.webp   assets/img/latar/rt.webp

    // Lambang provinsi: assets/img/logo-provinsi/<kode>.png  (kode 2 digit, mis. 32.png)
    logoProvinsi: 'assets/img/logo-provinsi/{kode}.png',
    // Lambang kabupaten/kota: assets/img/logo-kabkota/<kode>.png (mis. 32.73.png = Kota Bandung)
    // Sumber setiap lambang tercatat di SUMBER-LAMBANG.csv
    logoKabKota:  'assets/img/logo-kabkota/{kode}.png'
  },

  /* ---------- TAMPILAN TOMBOL & PANEL (opsional) ----------
     Gambar TANPA TULISAN, WebP berlatar transparan. Media memotongnya menjadi
     9 bagian (sudut tetap, bagian tengah melebar) sehingga satu gambar cocok
     untuk tombol/panel berukuran apa pun.
       potong : lebar sudut pada GAMBAR ASLI (piksel) yang tidak boleh melar
       sudut  : lebar sudut saat TAMPIL di layar (piksel)
     Bila file belum ada, tampilan bawaan dipakai. */
  ui: {
    tombolKuning: { src: 'assets/img/ui/tombol-kuning.webp', potong: 60, sudut: 34 }, // tombol utama: MULAI, Lanjut
    tombolHijau:  { src: 'assets/img/ui/tombol-hijau.webp',  potong: 60, sudut: 34 }, // tombol benar / selesai
    tombolBiru:   { src: 'assets/img/ui/tombol-biru.webp',   potong: 60, sudut: 34 }, // tombol biasa
    tombolPutih:  { src: 'assets/img/ui/tombol-putih.webp',  potong: 60, sudut: 34 }, // tombol sekunder: Menu, Kembali
    tombolOranye: { src: 'assets/img/ui/tombol-oranye.webp', potong: 60, sudut: 34 }, // tombol peringatan / Main Tim
    tombolBulat:  { src: 'assets/img/ui/tombol-bulat.webp' },                          // tombol ikon bulat (musik, zoom), utuh tanpa dipotong
    panelKertas:  { src: 'assets/img/ui/panel-kertas.webp',  potong: 80, sudut: 40 }, // panel isi & kartu info
    papanJudul:   { src: 'assets/img/ui/papan-judul.webp',   potong: 70, sudut: 36 }, // papan/pita judul di bilah atas
    kartuPilihan: { src: 'assets/img/ui/kartu-pilihan.webp', potong: 50, sudut: 28 }, // kartu jawaban & kartu seret
    balonDialog:  { src: 'assets/img/ui/balon-dialog.webp',  potong: 80, sudut: 40 }  // balon percakapan
  },

  /* ---------- JELAJAH: BUKU ATLAS & KARTU KOLEKSI (opsional) ---------- */
  jelajah: {
    // Citra satelit realistis (NASA Blue Marble, topografi + batimetri laut).
    // Ubah ke '' bila ingin kembali ke peta warna polos.
    citraNasional: 'assets/img/peta/indonesia.jpg',
    citraNasionalBatas: [92.6, 10, 143.1, -15],   // [bujur barat, lintang utara, bujur timur, lintang selatan] gambar citra nasional
    citraProvinsi: 'assets/img/peta/prov-{kode}.jpg',
    citraWarna: 0.28,   // kepekatan warna provinsi/kabupaten di atas citra (0 = bening, 1 = penuh)
    mejaAtlas:     'assets/img/jelajah/meja-atlas.webp',     // 1920×1080, buku atlas terbuka di atas meja
    // posisi halaman kiri (peta) & kanan (info) pada gambar meja-atlas, dalam piksel layar 1920×1080
    halamanKiri:   [150, 150, 800, 830],
    halamanKanan:  [990, 150, 780, 830],
    laut:          'assets/img/jelajah/laut.png',           // ±512×512, tekstur laut yang bisa diulang
    kartuProvinsi: { src: 'assets/img/jelajah/kartu-provinsi.webp', potong: 90, sudut: 44 }, // halaman info provinsi
    kartuKoleksi:  'assets/img/jelajah/kartu-koleksi.webp',  // ±600×860, bingkai kartu koleksi kabupaten/kota (ditarik penuh)
    pinIbukota:    'assets/img/jelajah/pin-ibukota.webp',    // ±128×160, penanda ibu kota provinsi di peta
    kompas:        'assets/img/jelajah/kompas.webp'          // ±300×300, hiasan sudut peta
  },

  /* ---------- IKON TOMBOL (opsional) ----------
     Media memakai ikon garis bawaan. Untuk menggantinya dengan gambar sendiri,
     taruh PNG transparan (± 128×128) di assets/img/ikon/ dengan nama ikon,
     mis. assets/img/ikon/musik.png. Daftar nama ikon: lihat DAFTAR-ASET.md */
  ikonFolder: 'assets/img/ikon/'
};
