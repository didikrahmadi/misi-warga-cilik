/* =====================================================================
   ISI MATERI – MISI WARGA CILIK
   Semua teks dialog, pertanyaan, aktivitas, dan soal ada di file ini.
   Penanda khusus di dalam teks:
     {nama}      → nama tokoh murid
     {provinsi}  → provinsi pilihan murid
     {ibukota}   → ibu kota provinsi pilihan murid
     {jmlKab} {jmlKota} → jumlah kabupaten & kota di provinsi pilihan
   "kode" pada setiap kalimat dipakai untuk file narasi:
     assets/audio/narasi/<kode>.mp3
   ===================================================================== */
window.MATERI = {

  /* ================= 6 STASIUN PETUALANGAN ================= */
  stasiun: [
    {
      id: 'rt', no: 1, nama: 'Rukun Tetangga (RT)', singkat: 'RT',
      pemimpin: 'Ketua RT', sapaan: 'Pak Darto', emoji: '👨🏽', warna: '#FF8A3D',
      gambarTokoh: 'assets/img/tokoh/ketua-rt.png', gambarLatar: 'assets/img/latar/rt.png',
      latar: 'rumah',
      dialog: [
        { kode: 'rt-1', teks: 'Halo, <b>{nama}</b>! Selamat datang di <b>RT 03</b>. Saya Pak Darto, <b>Ketua RT</b> di sini.' },
        { kode: 'rt-2', teks: 'Kamu sedang menjadi Wartawan Cilik, ya? Hebat! Di sini kamu akan mengenal wilayah yang <b>paling dekat</b> dengan rumahmu.' }
      ],
      kataPenting: { istilah: 'RT', arti: 'Rukun Tetangga, yaitu kumpulan beberapa keluarga yang rumahnya berdekatan.' },
      wawancara: [
        { kode: 'rt-w1', tanya: 'Siapa pemimpin di RT ini?', jawab: 'Pemimpinnya adalah <b>Ketua RT</b>. Di RT 03, ketuanya saya. Saya dibantu sekretaris dan bendahara RT.', catat: ['Pemimpin', 'Ketua RT'] },
        { kode: 'rt-w2', tanya: 'Bagaimana Bapak bisa menjadi Ketua RT?', jawab: 'Saya <b>dipilih oleh warga</b> RT melalui <b>musyawarah</b>. Warga berkumpul, berdiskusi, lalu sepakat memilih ketua.', catat: ['Cara terpilih', 'Dipilih warga melalui musyawarah'] },
        { kode: 'rt-w3', tanya: 'Apa saja tugas Ketua RT?', jawab: 'Membantu warga membuat <b>surat pengantar</b>, <b>mendata warga</b>, menjaga <b>keamanan</b> lingkungan, dan mengajak warga <b>bergotong royong</b>.', catat: ['Tugas', 'Membantu urusan warga, menjaga keamanan, mengajak gotong royong'] }
      ],
      bonus: { kode: 'rt-b', tanya: 'Apa itu ronda malam?', jawab: 'Ronda malam adalah kegiatan warga <b>bergiliran menjaga keamanan</b> lingkungan pada malam hari. Itu contoh gotong royong!' },
      aktivitas: {
        jenis: 'sortir', judul: 'Bantu Pak RT!',
        instruksi: 'Pak RT sedang menyusun daftar kegiatan. Seret setiap kartu ke kotak yang tepat!',
        kotak: ['Urusan RT', 'Bukan urusan RT'],
        kartu: [
          { teks: 'Mengatur kerja bakti', ke: 0, alasan: 'Ketua RT mengajak warga bekerja bakti bersama.' },
          { teks: 'Membuat surat pengantar warga', ke: 0, alasan: 'Surat pengantar RT dibutuhkan warga untuk mengurus surat di desa atau kelurahan.' },
          { teks: 'Mencetak KTP', ke: 1, alasan: 'KTP dicetak oleh Dinas Kependudukan di kabupaten atau kota.' },
          { teks: 'Mengatur jadwal ronda', ke: 0, alasan: 'Ketua RT membantu mengatur jadwal ronda agar lingkungan aman.' },
          { teks: 'Mendata warga baru', ke: 0, alasan: 'Warga baru melapor dan didata oleh Ketua RT.' },
          { teks: 'Membangun bandara', ke: 1, alasan: 'Bandara dibangun oleh pemerintah pusat atau pemerintah daerah, bukan RT.' }
        ]
      },
      tekateki: {
        kode: 'rt-t1',
        tanya: 'Liputanmu di RT sudah selesai! Kalau kamu ingin tahu tentang <b>kumpulan beberapa RT</b>, siapa yang harus kamu temui?',
        pilihan: [
          { teks: 'Gubernur', emoji: '🧑🏽‍💼', umpan: 'Hmm, Gubernur memimpin <b>provinsi</b> yang sangat luas. Kumpulan beberapa RT dipimpin oleh <b>Ketua RW</b>. Coba lagi, ya!' },
          { teks: 'Ketua RW', emoji: '👩🏽', benar: true },
          { teks: 'Camat', emoji: '👨🏽‍💼', umpan: 'Camat memimpin <b>kecamatan</b>, wilayah yang jauh lebih luas. Coba lagi, ya!' }
        ]
      },
      kunci: 'RT dipimpin <b>Ketua RT</b> yang dipilih warga melalui <b>musyawarah</b>.'
    },

    {
      id: 'rw', no: 2, nama: 'Rukun Warga (RW)', singkat: 'RW',
      pemimpin: 'Ketua RW', sapaan: 'Bu Sari', emoji: '👩🏽', warna: '#FFB627',
      gambarTokoh: 'assets/img/tokoh/ketua-rw.png', gambarLatar: 'assets/img/latar/rw.png',
      latar: 'kampung',
      dialog: [
        { kode: 'rw-1', teks: 'Selamat datang, <b>{nama}</b>! Saya Bu Sari, <b>Ketua RW 05</b>.' },
        { kode: 'rw-2', teks: 'RW 05 terdiri dari <b>beberapa RT</b>, termasuk RT 03 yang tadi kamu kunjungi. Ayo, mulai wawancaranya!' }
      ],
      kataPenting: { istilah: 'RW', arti: 'Rukun Warga, yaitu gabungan dari beberapa RT.' },
      wawancara: [
        { kode: 'rw-w1', tanya: 'Siapa pemimpin di RW ini?', jawab: 'Pemimpinnya adalah <b>Ketua RW</b>. Ketua RW bekerja sama dengan para <b>Ketua RT</b> di wilayahnya.', catat: ['Pemimpin', 'Ketua RW'] },
        { kode: 'rw-w2', tanya: 'Bagaimana Ibu bisa menjadi Ketua RW?', jawab: 'Saya <b>dipilih melalui musyawarah warga</b>. Biasanya para Ketua RT dan tokoh warga ikut bermusyawarah.', catat: ['Cara terpilih', 'Dipilih melalui musyawarah warga'] },
        { kode: 'rw-w3', tanya: 'Apa saja tugas Ketua RW?', jawab: '<b>Mengoordinasikan para Ketua RT</b>, menyampaikan informasi dari kantor desa atau kelurahan, dan membantu kegiatan warga seperti <b>posyandu</b>.', catat: ['Tugas', 'Mengoordinasikan RT dan membantu kegiatan warga'] }
      ],
      bonus: { kode: 'rw-b', tanya: 'Apa itu posyandu?', jawab: 'Posyandu adalah <b>Pos Pelayanan Terpadu</b>. Di sana bayi dan balita ditimbang dan diperiksa kesehatannya. Kadernya biasanya warga sekitar.' },
      aktivitas: {
        jenis: 'urut', judul: 'Dari Kecil ke Besar',
        instruksi: 'Urutkan wilayah dari yang <b>paling kecil</b> sampai yang <b>paling besar</b>!',
        slot: ['1 · paling kecil', '2', '3', '4 · paling besar'],
        kartu: ['Keluarga', 'RT', 'RW', 'Desa / Kelurahan'],
        penjelasan: 'Beberapa keluarga membentuk RT, beberapa RT membentuk RW, dan beberapa RW membentuk desa atau kelurahan.'
      },
      tekateki: {
        kode: 'rw-t1',
        tanya: 'Beberapa RW bergabung menjadi sebuah <b>desa</b>. Siapa yang memimpin desa?',
        pilihan: [
          { teks: 'Ketua RT', emoji: '👨🏽', umpan: 'Ketua RT memimpin RT, wilayah yang lebih kecil dari RW. Coba lagi!' },
          { teks: 'Bupati', emoji: '👩🏽‍💼', umpan: 'Bupati memimpin <b>kabupaten</b>, wilayah yang jauh lebih luas. Coba lagi!' },
          { teks: 'Kepala Desa', emoji: '👨🏽‍🌾', benar: true }
        ]
      },
      kunci: 'RW adalah gabungan beberapa RT dan dipimpin <b>Ketua RW</b>.'
    },

    {
      id: 'desa', no: 3, nama: 'Desa / Kelurahan', singkat: 'Desa/Kel',
      pemimpin: 'Kepala Desa / Lurah', sapaan: 'Pak Hasan', emoji: '👨🏽‍🌾', warna: '#2BB673',
      gambarTokoh: 'assets/img/tokoh/kepala-desa.png', gambarLatar: 'assets/img/latar/desa.png',
      latar: 'desa',
      dialog: [
        { kode: 'desa-1', teks: 'Selamat datang di <b>Kantor Desa Sukamaju</b>, {nama}! Saya Pak Hasan, <b>Kepala Desa</b>.' },
        { kode: 'desa-2', teks: 'Desa terdiri dari beberapa RW dan RT. Di daerah perkotaan, wilayah setingkat desa disebut <b>kelurahan</b> dan dipimpin oleh seorang <b>Lurah</b>.' }
      ],
      kataPenting: { istilah: 'Desa & Kelurahan', arti: 'Wilayah di bawah kecamatan. Desa dipimpin Kepala Desa, kelurahan dipimpin Lurah.' },
      wawancara: [
        { kode: 'desa-w1', tanya: 'Siapa pemimpin desa dan kelurahan?', jawab: 'Desa dipimpin <b>Kepala Desa</b>, dibantu perangkat desa. Kelurahan dipimpin <b>Lurah</b>, dibantu pegawai kelurahan.', catat: ['Pemimpin', 'Kepala Desa (desa) · Lurah (kelurahan)'] },
        { kode: 'desa-w2', tanya: 'Bagaimana Bapak bisa menjadi Kepala Desa?', jawab: 'Kepala Desa <b>dipilih langsung oleh warga desa</b> melalui <b>Pilkades</b>. Kalau Lurah, ia pegawai pemerintah yang <b>diangkat oleh Bupati atau Wali Kota</b>.', catat: ['Cara terpilih', 'Kepala Desa dipilih warga (Pilkades) · Lurah diangkat Bupati/Wali Kota'] },
        { kode: 'desa-w3', tanya: 'Apa saja tugas Kepala Desa?', jawab: '<b>Melayani warga</b>, misalnya membuat surat keterangan, <b>membangun desa</b>, dan bersama BPD membuat <b>peraturan desa</b>.', catat: ['Tugas', 'Melayani warga, membangun desa, membuat peraturan desa'] }
      ],
      bonus: { kode: 'desa-b', tanya: 'Apa itu BPD?', jawab: 'BPD adalah <b>Badan Permusyawaratan Desa</b>. Anggotanya wakil warga desa. BPD menampung pendapat warga dan bersama Kepala Desa membuat peraturan desa.' },
      aktivitas: {
        jenis: 'urut', judul: 'Mengurus Surat di Desa',
        instruksi: 'Warga ingin mengurus <b>surat keterangan</b> dari desa. Urutkan langkahnya!',
        slot: ['Langkah 1', 'Langkah 2', 'Langkah 3', 'Langkah 4'],
        kartu: ['Minta surat pengantar ke Ketua RT', 'Minta tanda tangan Ketua RW', 'Bawa surat ke kantor desa', 'Petugas desa membuat surat keterangan'],
        penjelasan: 'Urusan warga dimulai dari RT, lalu RW, kemudian diselesaikan di kantor desa atau kelurahan.'
      },
      tekateki: {
        kode: 'desa-t1',
        tanya: 'Beberapa desa dan kelurahan bergabung menjadi sebuah <b>kecamatan</b>. Siapa pemimpinnya?',
        pilihan: [
          { teks: 'Camat', emoji: '👨🏽‍💼', benar: true },
          { teks: 'Ketua RW', emoji: '👩🏽', umpan: 'Ketua RW memimpin RW, bagian kecil dari desa. Coba lagi!' },
          { teks: 'Gubernur', emoji: '🧑🏽‍💼', umpan: 'Gubernur memimpin provinsi. Kecamatan dipimpin oleh seorang <b>Camat</b>.' }
        ]
      },
      kunci: 'Desa dipimpin <b>Kepala Desa</b> yang dipilih warga. Kelurahan dipimpin <b>Lurah</b> yang diangkat Bupati/Wali Kota.'
    },

    {
      id: 'kec', no: 4, nama: 'Kecamatan', singkat: 'Kecamatan',
      pemimpin: 'Camat', sapaan: 'Pak Bayu', emoji: '👨🏽‍💼', warna: '#22C3C3',
      gambarTokoh: 'assets/img/tokoh/camat.png', gambarLatar: 'assets/img/latar/kecamatan.png',
      latar: 'kantor',
      dialog: [
        { kode: 'kec-1', teks: 'Halo, <b>{nama}</b>! Saya Pak Bayu, <b>Camat</b> di Kecamatan Melati.' },
        { kode: 'kec-2', teks: 'Kecamatan Melati terdiri dari <b>beberapa desa dan kelurahan</b>. Saya membina dan mengoordinasikan mereka semua.' }
      ],
      kataPenting: { istilah: 'Kecamatan', arti: 'Wilayah yang terdiri dari beberapa desa dan/atau kelurahan, dipimpin seorang Camat.' },
      wawancara: [
        { kode: 'kec-w1', tanya: 'Siapa pemimpin kecamatan?', jawab: 'Kecamatan dipimpin oleh <b>Camat</b>. Camat bekerja di <b>kantor kecamatan</b> bersama para pegawai.', catat: ['Pemimpin', 'Camat'] },
        { kode: 'kec-w2', tanya: 'Bagaimana Bapak bisa menjadi Camat?', jawab: 'Camat adalah <b>pegawai pemerintah</b>. Camat <b>diangkat oleh Bupati atau Wali Kota</b>, bukan dipilih langsung oleh warga.', catat: ['Cara terpilih', 'Diangkat oleh Bupati/Wali Kota'] },
        { kode: 'kec-w3', tanya: 'Apa saja tugas Camat?', jawab: '<b>Membina desa dan kelurahan</b>, melayani urusan warga tertentu, dan menyampaikan program dari kabupaten atau kota kepada warga.', catat: ['Tugas', 'Membina desa/kelurahan dan melayani warga'] }
      ],
      bonus: { kode: 'kec-b', tanya: 'Apa itu Musrenbang?', jawab: 'Musrenbang adalah <b>Musyawarah Perencanaan Pembangunan</b>. Di kecamatan, wakil-wakil desa dan kelurahan berkumpul untuk mengusulkan pembangunan yang dibutuhkan warga.' },
      aktivitas: {
        jenis: 'cocok', judul: 'Pasangkan Pemimpinnya!',
        instruksi: 'Sentuh seorang pemimpin, lalu sentuh wilayah yang dipimpinnya.',
        pasangan: [['Ketua RT', 'RT'], ['Ketua RW', 'RW'], ['Kepala Desa', 'Desa'], ['Lurah', 'Kelurahan'], ['Camat', 'Kecamatan']]
      },
      tekateki: {
        kode: 'kec-t1',
        tanya: 'Beberapa kecamatan bergabung menjadi sebuah <b>kabupaten</b>. Siapa yang memimpin kabupaten?',
        pilihan: [
          { teks: 'Lurah', emoji: '🧕🏽', umpan: 'Lurah memimpin kelurahan, bagian dari kecamatan. Coba lagi!' },
          { teks: 'Bupati', emoji: '👩🏽‍💼', benar: true },
          { teks: 'Wali Kota', emoji: '🧔🏽', umpan: 'Hampir! Wali Kota memimpin <b>kota</b>. Kabupaten dipimpin oleh <b>Bupati</b>.' }
        ]
      },
      kunci: 'Kecamatan dipimpin <b>Camat</b> yang diangkat oleh Bupati atau Wali Kota.'
    },

    {
      id: 'kab', no: 5, nama: 'Kabupaten / Kota', singkat: 'Kab/Kota',
      pemimpin: 'Bupati / Wali Kota', sapaan: 'Bu Ratna', emoji: '👩🏽‍💼', warna: '#2F6BFF',
      gambarTokoh: 'assets/img/tokoh/bupati.png', gambarLatar: 'assets/img/latar/kabupaten.png',
      latar: 'kota',
      dialog: [
        { kode: 'kab-1', teks: 'Selamat datang di <b>Kabupaten Nusa Indah</b>, {nama}! Saya Bu Ratna, <b>Bupati</b> di sini.' },
        { kode: 'kab-2', teks: 'Kabupaten dipimpin <b>Bupati</b>, sedangkan kota dipimpin <b>Wali Kota</b>. Kabupaten dan kota <b>setingkat</b> dan berada di bawah provinsi.' }
      ],
      kataPenting: { istilah: 'Kabupaten / Kota', arti: 'Wilayah di bawah provinsi yang terdiri dari beberapa kecamatan. Kabupaten dipimpin Bupati, kota dipimpin Wali Kota.' },
      wawancara: [
        { kode: 'kab-w1', tanya: 'Siapa pemimpin kabupaten dan kota?', jawab: 'Kabupaten dipimpin <b>Bupati</b> dan Wakil Bupati. Kota dipimpin <b>Wali Kota</b> dan Wakil Wali Kota.', catat: ['Pemimpin', 'Bupati (kabupaten) · Wali Kota (kota)'] },
        { kode: 'kab-w2', tanya: 'Bagaimana Ibu bisa menjadi Bupati?', jawab: 'Bupati dan Wali Kota <b>dipilih langsung oleh rakyat</b> melalui Pemilihan Kepala Daerah atau <b>Pilkada</b>, setiap <b>5 tahun</b> sekali.', catat: ['Cara terpilih', 'Dipilih rakyat melalui Pilkada, 5 tahun sekali'] },
        { kode: 'kab-w3', tanya: 'Apa saja tugas Bupati?', jawab: '<b>Memimpin pemerintahan daerah</b>, membangun sekolah, puskesmas, dan jalan, serta melayani warga. Saya dibantu <b>dinas-dinas</b> dan bekerja sama dengan <b>DPRD</b>.', catat: ['Tugas', 'Memimpin pemerintahan daerah, membangun, melayani warga'] }
      ],
      bonus: { kode: 'kab-b', tanya: 'Apa bedanya kabupaten dan kota?', jawab: 'Keduanya setingkat. Kabupaten <b>umumnya lebih luas</b> dan banyak daerah pedesaan. Kota <b>umumnya lebih padat</b>, dengan banyak kegiatan perdagangan dan jasa.' },
      aktivitas: {
        jenis: 'jelajah', judul: 'Jelajah Pusat Pemerintahan',
        instruksi: 'Sentuh setiap gedung untuk mengenal tugasnya!',
        gedung: [
          { nama: 'Kantor Bupati', gambar: 'kabupaten', ikon: 'kantor', info: 'Tempat <b>Bupati dan Wakil Bupati</b> bekerja memimpin pemerintahan kabupaten.' },
          { nama: 'Gedung DPRD', gambar: 'dprd', ikon: 'dprd', info: '<b>DPRD</b> adalah wakil rakyat. Bersama Bupati, DPRD membuat <b>peraturan daerah</b> (Perda).' },
          { nama: 'Dinas Pendidikan', gambar: 'dinas-pendidikan', ikon: 'sekolah', info: 'Mengurus <b>sekolah dasar dan sekolah menengah pertama</b> serta guru-gurunya.' },
          { nama: 'Dinas Kesehatan', gambar: 'dinas-kesehatan', ikon: 'rs', info: 'Mengurus <b>puskesmas</b> dan kesehatan warga.' },
          { nama: 'Dinas Kependudukan', gambar: 'dinas-kependudukan', ikon: 'ktp', info: 'Membuat <b>KTP, Kartu Keluarga, dan akta kelahiran</b> warga.' },
          { nama: 'Dinas Pekerjaan Umum', gambar: 'dinas-pu', ikon: 'kerucut', info: 'Membangun dan merawat <b>jalan serta jembatan</b>.' }
        ]
      },
      tekateki: {
        kode: 'kab-t1',
        tanya: 'Kabupaten dan kota bergabung dalam sebuah <b>provinsi</b>. Siapa pemimpin provinsi?',
        pilihan: [
          { teks: 'Presiden', emoji: '🤵🏽', umpan: 'Presiden memimpin <b>seluruh Indonesia</b>. Provinsi dipimpin oleh <b>Gubernur</b>.' },
          { teks: 'Camat', emoji: '👨🏽‍💼', umpan: 'Camat memimpin kecamatan, bagian dari kabupaten. Coba lagi!' },
          { teks: 'Gubernur', emoji: '🧑🏽‍💼', benar: true }
        ]
      },
      kunci: 'Kabupaten dipimpin <b>Bupati</b>, kota dipimpin <b>Wali Kota</b>. Keduanya dipilih rakyat melalui <b>Pilkada</b>.'
    },

    {
      id: 'prov', no: 6, nama: 'Provinsi', singkat: 'Provinsi',
      pemimpin: 'Gubernur', sapaan: 'Pak Gubernur', emoji: '🧑🏽‍💼', warna: '#8B5CF6',
      gambarTokoh: 'assets/img/tokoh/gubernur.png', gambarLatar: 'assets/img/latar/provinsi.png',
      latar: 'provinsi',
      dialog: [
        { kode: 'prov-1', teks: 'Selamat datang di kantor Gubernur <b>Provinsi {provinsi}</b>, {nama}!' },
        { kode: 'prov-2', teks: 'Provinsi {provinsi} terdiri dari <b>{jmlKab} kabupaten</b> dan <b>{jmlKota} kota</b>. Ibu kota provinsinya adalah <b>{ibukota}</b>.' },
        { kode: 'prov-3', teks: 'Indonesia memiliki <b>38 provinsi</b>. Setiap provinsi dipimpin oleh seorang <b>Gubernur</b>.' }
      ],
      kataPenting: { istilah: 'Provinsi', arti: 'Wilayah besar yang terdiri dari beberapa kabupaten dan kota, dipimpin seorang Gubernur.' },
      wawancara: [
        { kode: 'prov-w1', tanya: 'Siapa pemimpin provinsi?', jawab: 'Provinsi dipimpin <b>Gubernur</b> dan Wakil Gubernur. Ada juga <b>DPRD Provinsi</b> sebagai wakil rakyat.', catat: ['Pemimpin', 'Gubernur dan Wakil Gubernur'] },
        { kode: 'prov-w2', tanya: 'Bagaimana seseorang menjadi Gubernur?', jawab: 'Gubernur <b>dipilih langsung oleh rakyat</b> melalui <b>Pilkada</b> setiap 5 tahun sekali. Di Daerah Istimewa Yogyakarta, Gubernurnya adalah <b>Sultan</b> yang ditetapkan sesuai keistimewaan daerah itu.', catat: ['Cara terpilih', 'Dipilih rakyat melalui Pilkada'] },
        { kode: 'prov-w3', tanya: 'Apa saja tugas Gubernur?', jawab: 'Memimpin pemerintahan provinsi, <b>mengoordinasikan kabupaten dan kota</b>, serta menjadi <b>wakil pemerintah pusat</b> di daerah.', catat: ['Tugas', 'Memimpin provinsi dan mengoordinasikan kabupaten/kota'] }
      ],
      bonus: { kode: 'prov-b', tanya: 'Provinsi apa yang paling baru?', jawab: 'Provinsi terbaru adalah <b>Papua Barat Daya</b>, provinsi ke-38, yang dibentuk tahun 2022. Kamu bisa menjelajahi semua provinsi di <b>Jelajah Nusantara</b>!' },
      aktivitas: {
        jenis: 'sortirDaerah', judul: 'Rapat Bersama Gubernur',
        instruksi: 'Gubernur akan rapat dengan para pemimpin daerah di Provinsi {provinsi}. Seret setiap daerah ke pemimpinnya!',
        kotak: ['Dipimpin Bupati', 'Dipimpin Wali Kota']
      },
      tekateki: {
        kode: 'prov-t1',
        tanya: 'Semua provinsi bersatu dalam <b>Negara Kesatuan Republik Indonesia</b>. Siapa yang memimpin negara kita?',
        pilihan: [
          { teks: 'Gubernur', emoji: '🧑🏽‍💼', umpan: 'Gubernur memimpin satu provinsi saja. Coba lagi!' },
          { teks: 'Presiden', emoji: '🤵🏽', benar: true },
          { teks: 'Bupati', emoji: '👩🏽‍💼', umpan: 'Bupati memimpin kabupaten. Coba lagi!' }
        ]
      },
      kunci: 'Provinsi dipimpin <b>Gubernur</b> yang dipilih rakyat melalui <b>Pilkada</b>.'
    }
  ],

  /* ================= BENGKEL KONSEP ================= */
  bengkel: [
    {
      id: 'tangga', judul: 'Tangga Wilayah', ikon: 'tangga', sub: 'Susun dari terbesar ke terkecil',
      tahap: [
        { instruksi: 'Seret kartu ke anak tangga. <b>Paling atas = wilayah terbesar.</b>', kartu: ['Provinsi', 'Kabupaten / Kota', 'Kecamatan', 'Desa / Kelurahan', 'RW', 'RT'] },
        { instruksi: 'Hebat! Sekarang seret <b>pemimpin</b> ke wilayah yang dipimpinnya.', kartu: ['Gubernur', 'Bupati / Wali Kota', 'Camat', 'Kepala Desa / Lurah', 'Ketua RW', 'Ketua RT'] }
      ]
    },
    {
      id: 'desakel', judul: 'Desa atau Kelurahan?', ikon: 'sawah', gambar: 'desa', sub: 'Pilah ciri-cirinya',
      kotak: ['DESA', 'KELURAHAN'], kotakIkon: ['sawah', 'kota'],
      kartu: [
        { teks: 'Dipimpin Kepala Desa', ke: 0 },
        { teks: 'Dipimpin Lurah', ke: 1 },
        { teks: 'Pemimpinnya dipilih langsung oleh warga', ke: 0, alasan: 'Kepala Desa dipilih warga melalui Pilkades.' },
        { teks: 'Pemimpinnya diangkat oleh Bupati/Wali Kota', ke: 1, alasan: 'Lurah diangkat oleh Bupati atau Wali Kota.' },
        { teks: 'Ada Badan Permusyawaratan Desa (BPD)', ke: 0, alasan: 'BPD hanya ada di desa.' },
        { teks: 'Pemimpinnya pegawai pemerintah (ASN)', ke: 1, alasan: 'Lurah adalah Aparatur Sipil Negara.' },
        { teks: 'Bisa membuat peraturan desa', ke: 0, alasan: 'Kepala Desa bersama BPD membuat peraturan desa.' }
      ],
      sama: '<b>Sama-sama:</b> berada di bawah kecamatan dan membawahi RW serta RT.'
    },
    {
      id: 'kabkota', judul: 'Kabupaten atau Kota?', ikon: 'kota', gambar: 'kabupaten', sub: 'Bupati atau Wali Kota?',
      kotak: ['KABUPATEN', 'KOTA'], kotakIkon: ['pohon', 'kota'],
      kartu: [
        { teks: 'Dipimpin Bupati', ke: 0 },
        { teks: 'Dipimpin Wali Kota', ke: 1 },
        { teks: 'Umumnya wilayahnya lebih luas', ke: 0 },
        { teks: 'Umumnya penduduknya lebih padat', ke: 1 },
        { teks: 'Banyak daerah pedesaan dan pertanian', ke: 0 },
        { teks: 'Banyak kegiatan perdagangan dan jasa', ke: 1 }
      ],
      sama: '<b>Sama-sama:</b> setingkat, berada di bawah provinsi, pemimpinnya dipilih melalui Pilkada.'
    },
    {
      id: 'memilih', judul: 'Siapa Memilih Siapa?', ikon: 'kotakSuara', sub: 'Dipilih warga atau diangkat?',
      kotak: ['Dipilih oleh warga / rakyat', 'Diangkat oleh Bupati / Wali Kota'], kotakIkon: ['kotakSuara', 'surat'],
      kartu: [
        { teks: 'Gubernur', ke: 0, alasan: 'Dipilih rakyat melalui Pilkada.' },
        { teks: 'Bupati', ke: 0, alasan: 'Dipilih rakyat melalui Pilkada.' },
        { teks: 'Wali Kota', ke: 0, alasan: 'Dipilih rakyat melalui Pilkada.' },
        { teks: 'Camat', ke: 1, alasan: 'Camat diangkat oleh Bupati atau Wali Kota.' },
        { teks: 'Kepala Desa', ke: 0, alasan: 'Dipilih warga desa melalui Pilkades.' },
        { teks: 'Lurah', ke: 1, alasan: 'Lurah diangkat oleh Bupati atau Wali Kota.' },
        { teks: 'Ketua RW', ke: 0, alasan: 'Dipilih melalui musyawarah warga.' },
        { teks: 'Ketua RT', ke: 0, alasan: 'Dipilih warga melalui musyawarah.' }
      ],
      sama: '<b>Ingat:</b> di DI Yogyakarta, Gubernurnya Sultan yang ditetapkan. Di Jakarta, Wali Kota diangkat oleh Gubernur.'
    }
  ],

  /* ================= ARENA TEKA-TEKI ================= */
  akuSiapa: [
    { jawab: 'Wali Kota', emoji: '🧔🏽', petunjuk: ['Aku dipilih langsung oleh rakyat melalui Pilkada.', 'Wilayah yang kupimpin berada di bawah provinsi.', 'Wilayahku disebut kota, bukan kabupaten.'], pilihan: ['Bupati', 'Wali Kota', 'Camat', 'Gubernur'] },
    { jawab: 'Ketua RT', emoji: '👨🏽', petunjuk: ['Aku dipilih oleh warga melalui musyawarah.', 'Aku membantu warga membuat surat pengantar.', 'Wilayahku adalah yang paling kecil.'], pilihan: ['Ketua RW', 'Lurah', 'Ketua RT', 'Camat'] },
    { jawab: 'Lurah', emoji: '🧕🏽', petunjuk: ['Aku pegawai pemerintah.', 'Aku diangkat oleh Bupati atau Wali Kota.', 'Wilayahku berada di bawah kecamatan dan setingkat dengan desa.'], pilihan: ['Camat', 'Kepala Desa', 'Lurah', 'Ketua RW'] },
    { jawab: 'Gubernur', emoji: '🧑🏽‍💼', petunjuk: ['Aku dipilih rakyat melalui Pilkada.', 'Aku mengoordinasikan para Bupati dan Wali Kota.', 'Di Indonesia ada 38 orang yang memegang jabatan sepertiku.'], pilihan: ['Gubernur', 'Bupati', 'Presiden', 'Camat'] },
    { jawab: 'Kepala Desa', emoji: '👨🏽‍🌾', petunjuk: ['Aku dipilih langsung oleh warga melalui Pilkades.', 'Aku bekerja sama dengan BPD.', 'Wilayahku berada di bawah kecamatan.'], pilihan: ['Lurah', 'Kepala Desa', 'Ketua RW', 'Bupati'] },
    { jawab: 'Camat', emoji: '👨🏽‍💼', petunjuk: ['Aku diangkat oleh Bupati atau Wali Kota.', 'Aku membina beberapa desa dan kelurahan.', 'Kantorku disebut kantor kecamatan.'], pilihan: ['Lurah', 'Camat', 'Wali Kota', 'Ketua RW'] },
    { jawab: 'Ketua RW', emoji: '👩🏽', petunjuk: ['Aku dipilih melalui musyawarah warga.', 'Aku bekerja sama dengan beberapa Ketua RT.', 'Wilayahku lebih besar dari RT, tetapi lebih kecil dari desa.'], pilihan: ['Ketua RT', 'Ketua RW', 'Kepala Desa', 'Camat'] },
    { jawab: 'Bupati', emoji: '👩🏽‍💼', petunjuk: ['Aku dipilih rakyat melalui Pilkada setiap 5 tahun.', 'Aku dibantu dinas-dinas, seperti Dinas Pendidikan.', 'Wilayahku disebut kabupaten.'], pilihan: ['Wali Kota', 'Gubernur', 'Bupati', 'Camat'] }
  ],

  kemana: {
    pintu: [
      { teks: 'Ketua RT', gambar: 'rt', ikon: 'rumah' },
      { teks: 'Kantor Desa / Kelurahan', gambar: 'desa', ikon: 'kantor' },
      { teks: 'Kantor Kecamatan', gambar: 'kecamatan', ikon: 'kantor' },
      { teks: 'Pemerintah Kabupaten / Kota', gambar: 'kabupaten', ikon: 'kota' },
      { teks: 'Pemerintah Provinsi', gambar: 'provinsi', ikon: 'kantor' }
    ],
    situasi: [
      { ikon: 'kotak', gambar: 'assets/img/situasi/situasi-1.png', teks: 'Keluarga Dina baru pindah rumah. Mereka ingin <b>dicatat sebagai warga baru</b> di lingkungannya. Ke mana mereka melapor pertama kali?', benar: 0, bahas: 'Warga baru melapor dulu ke <b>Ketua RT</b> agar didata.' },
      { ikon: 'sapu', gambar: 'assets/img/situasi/situasi-2.png', teks: 'Warga satu RT ingin mengadakan <b>kerja bakti</b> membersihkan selokan. Siapa yang mengajak dan mengaturnya?', benar: 0, bahas: '<b>Ketua RT</b> menggerakkan warga untuk bergotong royong.' },
      { ikon: 'surat', gambar: 'assets/img/situasi/situasi-3.png', teks: 'Pak Budi sudah mendapat surat pengantar dari RT dan RW. Ke mana ia pergi untuk mendapatkan <b>surat keterangan</b>?', benar: 1, bahas: 'Surat keterangan dibuat di <b>kantor desa atau kelurahan</b>.' },
      { ikon: 'diskusi', gambar: 'assets/img/situasi/situasi-4.png', teks: 'Wakil dari beberapa desa dan kelurahan berkumpul untuk <b>musyawarah perencanaan pembangunan</b>. Di mana musyawarah itu diadakan?', benar: 2, bahas: 'Musrenbang tingkat kecamatan diadakan di <b>kantor kecamatan</b>.' },
      { ikon: 'sekolah', gambar: 'assets/img/situasi/situasi-5.png', teks: 'Sebuah <b>sekolah dasar</b> membutuhkan perbaikan gedung. Pemerintah mana yang mengurus sekolah dasar?', benar: 3, bahas: 'Sekolah dasar dan SMP diurus oleh <b>pemerintah kabupaten/kota</b> melalui Dinas Pendidikan.' },
      { ikon: 'ktp', gambar: 'assets/img/situasi/situasi-6.png', teks: 'Warga ingin membuat <b>KTP elektronik</b> dan <b>Kartu Keluarga</b> baru. Siapa yang mencetaknya?', benar: 3, bahas: 'KTP dan KK dicetak oleh <b>Dinas Kependudukan</b> di kabupaten/kota.' },
      { ikon: 'jalan', gambar: 'assets/img/situasi/situasi-7.png', teks: 'Ada <b>jalan provinsi</b> yang menghubungkan beberapa kabupaten. Siapa yang merawatnya?', benar: 4, bahas: 'Jalan provinsi dirawat oleh <b>pemerintah provinsi</b>.' },
      { ikon: 'toga', gambar: 'assets/img/situasi/situasi-8.png', teks: 'Pemerintah ingin memperbaiki <b>SMA dan SMK</b> negeri di beberapa kabupaten dan kota. Siapa yang mengurusnya?', benar: 4, bahas: 'SMA, SMK, dan SLB negeri diurus oleh <b>pemerintah provinsi</b>.' }
    ]
  },

  /* ================= LATIHAN SOAL ================= */
  topik: {
    tangga:    { nama: 'Urutan wilayah',              ulang: 'tangga' },
    pemimpin:  { nama: 'Pemimpin setiap wilayah',      ulang: 'tangga' },
    pemilihan: { nama: 'Cara pemimpin terpilih',       ulang: 'memilih' },
    desakel:   { nama: 'Desa dan kelurahan',           ulang: 'desakel' },
    kabkota:   { nama: 'Kabupaten dan kota',           ulang: 'kabkota' },
    tugas:     { nama: 'Tugas lembaga pemerintahan',   ulang: 'kemana' },
    umum:      { nama: 'Wilayah Indonesia',            ulang: 'jelajah' }
  },
  latihan: [
    { jenis: 'pg', topik: 'pemimpin', tanya: 'Wilayah <b>kabupaten</b> dipimpin oleh seorang …', pilihan: ['Gubernur', 'Bupati', 'Camat', 'Wali Kota'], benar: 1, bahas: 'Kabupaten dipimpin oleh <b>Bupati</b> dan Wakil Bupati. Wali Kota memimpin kota.' },
    { jenis: 'pg', topik: 'tangga', tanya: 'Urutan wilayah dari yang <b>terbesar</b> adalah …', pilihan: ['Provinsi – Kabupaten/Kota – Kecamatan – Desa', 'Kecamatan – Provinsi – Desa – Kabupaten', 'Desa – Kecamatan – Provinsi – Kabupaten', 'Provinsi – Kecamatan – Kabupaten – Desa'], benar: 0, bahas: 'Dari terbesar: <b>Provinsi → Kabupaten/Kota → Kecamatan → Desa/Kelurahan</b> → RW → RT.' },
    { jenis: 'bs', topik: 'pemilihan', tanya: 'Ketua RT dipilih oleh warga melalui musyawarah.', benar: 0, bahas: '<b>Benar.</b> Ketua RT dipilih warga melalui musyawarah.' },
    { jenis: 'pg', topik: 'desakel', tanya: 'Kelurahan dipimpin oleh seorang …', pilihan: ['Kepala Desa', 'Lurah', 'Camat', 'Ketua RW'], benar: 1, bahas: 'Kelurahan dipimpin oleh <b>Lurah</b>. Desa dipimpin oleh Kepala Desa.' },
    { jenis: 'bs', topik: 'pemilihan', tanya: 'Camat dipilih langsung oleh warga melalui pemilihan.', benar: 1, bahas: '<b>Salah.</b> Camat adalah pegawai pemerintah yang <b>diangkat oleh Bupati atau Wali Kota</b>.' },
    { jenis: 'pg', topik: 'tangga', tanya: 'Gabungan dari beberapa RT disebut …', pilihan: ['RW', 'Desa', 'Kecamatan', 'Kota'], benar: 0, bahas: 'Beberapa RT bergabung menjadi <b>RW</b> (Rukun Warga).' },
    { jenis: 'pg', topik: 'pemilihan', tanya: 'Bupati dan Wali Kota dipilih melalui …', pilihan: ['Musyawarah RT', 'Pilkada', 'Pilkades', 'Ditunjuk Camat'], benar: 1, bahas: 'Bupati dan Wali Kota dipilih rakyat melalui <b>Pilkada</b> (Pemilihan Kepala Daerah).' },
    { jenis: 'bs', topik: 'kabkota', tanya: 'Kota dipimpin oleh seorang Bupati.', benar: 1, bahas: '<b>Salah.</b> Kota dipimpin oleh <b>Wali Kota</b>. Bupati memimpin kabupaten.' },
    { jenis: 'pg', topik: 'desakel', tanya: 'Lembaga di desa yang anggotanya wakil warga dan bersama Kepala Desa membuat peraturan desa adalah …', pilihan: ['DPRD', 'BPD', 'Posyandu', 'Karang Taruna'], benar: 1, bahas: '<b>BPD</b> (Badan Permusyawaratan Desa) bersama Kepala Desa membuat peraturan desa.' },
    { jenis: 'pg', topik: 'pemimpin', tanya: 'Pemimpin sebuah provinsi disebut …', pilihan: ['Presiden', 'Bupati', 'Gubernur', 'Camat'], benar: 2, bahas: 'Provinsi dipimpin oleh <b>Gubernur</b> dan Wakil Gubernur.' },
    { jenis: 'pg', topik: 'tugas', tanya: 'Warga yang baru pindah ke sebuah lingkungan sebaiknya pertama kali melapor kepada …', pilihan: ['Gubernur', 'Ketua RT', 'Bupati', 'Camat'], benar: 1, bahas: 'Warga baru melapor kepada <b>Ketua RT</b> agar didata sebagai warga.' },
    { jenis: 'bs', topik: 'pemilihan', tanya: 'Kepala Desa dipilih langsung oleh warga desa.', benar: 0, bahas: '<b>Benar.</b> Kepala Desa dipilih warga desa melalui <b>Pilkades</b>.' },
    { jenis: 'pg', topik: 'tangga', tanya: 'Beberapa desa dan kelurahan bergabung membentuk sebuah …', pilihan: ['RW', 'Kecamatan', 'Provinsi', 'RT'], benar: 1, bahas: 'Beberapa desa dan kelurahan membentuk <b>kecamatan</b> yang dipimpin Camat.' },
    { jenis: 'pg', topik: 'tugas', tanya: 'Wakil rakyat di kabupaten yang bersama Bupati membuat peraturan daerah adalah …', pilihan: ['DPRD', 'BPD', 'Ketua RT', 'Posyandu'], benar: 0, bahas: '<b>DPRD</b> (Dewan Perwakilan Rakyat Daerah) bersama Bupati/Wali Kota membuat peraturan daerah.' },
    { jenis: 'pg', topik: 'umum', tanya: 'Saat ini Indonesia memiliki … provinsi.', pilihan: ['34', '36', '38', '40'], benar: 2, bahas: 'Indonesia memiliki <b>38 provinsi</b>. Provinsi terbaru adalah Papua Barat Daya (2022).' }
  ],

  /* ================= REFLEKSI ================= */
  refleksi: {
    tanya: 'Apa yang bisa kamu lakukan sebagai warga cilik di lingkungan RT-mu?',
    pilihan: ['Ikut kerja bakti', 'Menjaga kebersihan lingkungan', 'Menghormati hasil musyawarah', 'Membantu tetangga', 'Mematuhi aturan RT', 'Ikut lomba 17 Agustus'],
    ikon: ['sapu', 'pohon', 'tangan', 'rumah', 'daftar', 'bendera'],
    rasa: [['senyum', 'Senang'], ['biasa', 'Biasa saja'], ['bingung', 'Masih bingung']]
  },

  /* Tabel ringkasan di Buku Liputan */
  ringkasan: [
    ['Provinsi', 'Gubernur', 'Dipilih rakyat (Pilkada)'],
    ['Kabupaten / Kota', 'Bupati / Wali Kota', 'Dipilih rakyat (Pilkada)'],
    ['Kecamatan', 'Camat', 'Diangkat Bupati/Wali Kota'],
    ['Desa', 'Kepala Desa', 'Dipilih warga desa (Pilkades)'],
    ['Kelurahan', 'Lurah', 'Diangkat Bupati/Wali Kota'],
    ['RW / RT', 'Ketua RW / Ketua RT', 'Dipilih warga, musyawarah']
  ]
};
