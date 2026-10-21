# Daftar Aset – Misi Warga Cilik

Taruh file di folder yang disebutkan, **dengan nama persis seperti di bawah**. Jika nama file Anda berbeda, ubah namanya di `assets/js/config.js` (untuk gambar umum, musik, efek) atau `assets/js/data-materi.js` (tokoh & latar tiap stasiun).

Semua aset bersifat **opsional**. Bila sebuah file belum ada, media tetap berjalan dengan pengganti bawaan (emoji, gambar kartun bawaan, dan bunyi buatan browser).

**Tips format:** gambar PNG/WEBP berlatar transparan (tokoh, ikon) atau PNG/JPG 1920×1080 (latar). Suara MP3. Usahakan ukuran file kecil agar ringan dibuka di PID.

## 1. Musik latar

| File | Keterangan |
|---|---|
| `assets/audio/musik/latar.mp3` | Instrumental lembut, diputar berulang (mis. “Dari Sabang sampai Merauke”). Volume bawaan: 0.25 |

## 2. Efek suara

| File | Dipakai saat |
|---|---|
| `assets/audio/sfx/klik.mp3` | menyentuh tombol |
| `assets/audio/sfx/pop.mp3` | balon dialog / jendela muncul |
| `assets/audio/sfx/benar.mp3` | jawaban benar |
| `assets/audio/sfx/salah.mp3` | jawaban belum tepat (bunyi lembut) |
| `assets/audio/sfx/stempel.mp3` | stempel paspor “dug!” |
| `assets/audio/sfx/konfeti.mp3` | perayaan / konfeti |
| `assets/audio/sfx/buka.mp3` | bagian baru terbuka |
| `assets/audio/sfx/halaman.mp3` | pindah layar |
| `assets/audio/sfx/seret.mp3` | kartu mulai diseret |
| `assets/audio/sfx/zoom.mp3` | peta diperbesar/diperkecil |

## 3. Gambar umum

| File | Ukuran saran | Keterangan |
|---|---|---|
| `assets/img/logo.png` | ± 1100×380 | Judul media di layar pembuka |
| `assets/img/latar/pembuka.png` | 1920×1080 | Latar layar pembuka |
| `assets/img/latar/menu.png` | 1920×1080 | Latar menu utama |
| `assets/img/latar/peta-misi.png` | 1920×1080 | Latar Peta Misi (jalan RT → Provinsi) |
| `assets/img/menu-misi.png` | ± 700×320 | Ilustrasi tombol Misi Warga Cilik |
| `assets/img/menu-jelajah.png` | ± 700×320 | Ilustrasi tombol Jelajah Nusantara |
| `assets/img/tokoh/avatar-1.png` | ± 400×520 | Avatar murid pilihan 1 |
| `assets/img/tokoh/avatar-2.png` | ± 400×520 | Avatar murid pilihan 2 |
| `assets/img/tokoh/avatar-3.png` | ± 400×520 | Avatar murid pilihan 3 |
| `assets/img/tokoh/avatar-4.png` | ± 400×520 | Avatar murid pilihan 4 |
| `assets/img/tokoh/avatar-5.png` | ± 400×520 | Avatar murid pilihan 5 |
| `assets/img/tokoh/avatar-6.png` | ± 400×520 | Avatar murid pilihan 6 |

## 4. Tokoh & latar tiap stasiun

| Stasiun | Tokoh (± 420×600, transparan) | Latar (1920×1080) |
|---|---|---|
| 1. Rukun Tetangga (RT) (Pak Darto, Ketua RT) | `assets/img/tokoh/ketua-rt.png` | `assets/img/latar/rt.png` |
| 2. Rukun Warga (RW) (Bu Sari, Ketua RW) | `assets/img/tokoh/ketua-rw.png` | `assets/img/latar/rw.png` |
| 3. Desa / Kelurahan (Pak Hasan, Kepala Desa / Lurah) | `assets/img/tokoh/kepala-desa.png` | `assets/img/latar/desa.png` |
| 4. Kecamatan (Pak Bayu, Camat) | `assets/img/tokoh/camat.png` | `assets/img/latar/kecamatan.png` |
| 5. Kabupaten / Kota (Bu Ratna, Bupati / Wali Kota) | `assets/img/tokoh/bupati.png` | `assets/img/latar/kabupaten.png` |
| 6. Provinsi (Pak Gubernur, Gubernur) | `assets/img/tokoh/gubernur.png` | `assets/img/latar/provinsi.png` |

## 5. Lambang daerah (sudah terisi)

Lambang ditampilkan di kartu provinsi, kartu kabupaten/kota, daftar daerah, pilihan provinsi, Kartu Pers, aktivitas Rapat Gubernur, dan Tantangan Temukan Provinsi.

| Folder | Format nama | Isi |
|---|---|---|
| `assets/img/logo-provinsi/` | `<kode>.png`, mis. `32.png` | 38 dari 38 provinsi |
| `assets/img/logo-kabkota/` | `<kode>.png`, mis. `32.73.png` | 504 dari 514 kabupaten/kota |

- Ukuran saran: ± 220×240 px, PNG berlatar transparan.
- Sumber setiap lambang (Wikidata / Wikimedia Commons / Wikipedia bahasa Indonesia) tercatat di `SUMBER-LAMBANG.csv`. Mohon dicocokkan dengan lambang resmi terbaru di situs pemerintah daerah.
- Bila lambang belum ada, kartu menampilkan perisai 🛡️ abu-abu.

**Lambang yang belum ada (silakan dilengkapi):**

| File | Daerah |
|---|---|
| `assets/img/logo-kabkota/19.04.png` | Kabupaten Bangka Tengah |
| `assets/img/logo-kabkota/61.02.png` | Kabupaten Mempawah |
| `assets/img/logo-kabkota/61.03.png` | Kabupaten Sanggau |
| `assets/img/logo-kabkota/64.01.png` | Kabupaten Paser |
| `assets/img/logo-kabkota/71.09.png` | Kabupaten Kep. Siau Tagulandang Biaro |
| `assets/img/logo-kabkota/74.03.png` | Kabupaten Muna |
| `assets/img/logo-kabkota/76.06.png` | Kabupaten Mamuju Tengah |
| `assets/img/logo-kabkota/81.09.png` | Kabupaten Buru Selatan |
| `assets/img/logo-kabkota/92.06.png` | Kabupaten Teluk Bintuni |
| `assets/img/logo-kabkota/95.05.png` | Kabupaten Mamberamo Tengah |

## 6. Ikon daerah

Ikon (bangunan/tempat khas) setiap provinsi ditampilkan sebagai emoji + teks pada tab **Ikon Daerah**, diatur di `assets/js/data-provinsi.js` (kunci `emoji` dan `ikon`).

## 7. Narasi (opsional)

Format nama: `assets/audio/narasi/<kode>.mp3`. Tombol 🔊 otomatis muncul bila file ada.

| Kode | Teks |
|---|---|
| `rt-1` | Halo, {nama}! Selamat datang di RT 03. Saya Pak Darto, Ketua RT di sini. |
| `rt-2` | Kamu sedang menjadi Wartawan Cilik, ya? Hebat! Di sini kamu akan mengenal wilayah yang paling dekat dengan rumahmu. |
| `rt-w1` | Pemimpinnya adalah Ketua RT. Di RT 03, ketuanya saya. Saya dibantu sekretaris dan bendahara RT. |
| `rt-w2` | Saya dipilih oleh warga RT melalui musyawarah. Warga berkumpul, berdiskusi, lalu sepakat memilih ketua. |
| `rt-w3` | Membantu warga membuat surat pengantar, mendata warga, menjaga keamanan lingkungan, dan mengajak warga bergotong royong. |
| `rt-b` | Ronda malam adalah kegiatan warga bergiliran menjaga keamanan lingkungan pada malam hari. Itu contoh gotong royong! |
| `rt-t1` | Liputanmu di RT sudah selesai! Kalau kamu ingin tahu tentang kumpulan beberapa RT, siapa yang harus kamu temui? |
| `rw-1` | Selamat datang, {nama}! Saya Bu Sari, Ketua RW 05. |
| `rw-2` | RW 05 terdiri dari beberapa RT, termasuk RT 03 yang tadi kamu kunjungi. Ayo, mulai wawancaranya! |
| `rw-w1` | Pemimpinnya adalah Ketua RW. Ketua RW bekerja sama dengan para Ketua RT di wilayahnya. |
| `rw-w2` | Saya dipilih melalui musyawarah warga. Biasanya para Ketua RT dan tokoh warga ikut bermusyawarah. |
| `rw-w3` | Mengoordinasikan para Ketua RT, menyampaikan informasi dari kantor desa atau kelurahan, dan membantu kegiatan warga seperti posyandu. |
| `rw-b` | Posyandu adalah Pos Pelayanan Terpadu. Di sana bayi dan balita ditimbang dan diperiksa kesehatannya. Kadernya biasanya warga sekitar. |
| `rw-t1` | Beberapa RW bergabung menjadi sebuah desa. Siapa yang memimpin desa? |
| `desa-1` | Selamat datang di Kantor Desa Sukamaju, {nama}! Saya Pak Hasan, Kepala Desa. |
| `desa-2` | Desa terdiri dari beberapa RW dan RT. Di daerah perkotaan, wilayah setingkat desa disebut kelurahan dan dipimpin oleh seorang Lurah. |
| `desa-w1` | Desa dipimpin Kepala Desa, dibantu perangkat desa. Kelurahan dipimpin Lurah, dibantu pegawai kelurahan. |
| `desa-w2` | Kepala Desa dipilih langsung oleh warga desa melalui Pilkades. Kalau Lurah, ia pegawai pemerintah yang diangkat oleh Bupati atau Wali Kota. |
| `desa-w3` | Melayani warga, misalnya membuat surat keterangan, membangun desa, dan bersama BPD membuat peraturan desa. |
| `desa-b` | BPD adalah Badan Permusyawaratan Desa. Anggotanya wakil warga desa. BPD menampung pendapat warga dan bersama Kepala Desa membuat peraturan desa. |
| `desa-t1` | Beberapa desa dan kelurahan bergabung menjadi sebuah kecamatan. Siapa pemimpinnya? |
| `kec-1` | Halo, {nama}! Saya Pak Bayu, Camat di Kecamatan Melati. |
| `kec-2` | Kecamatan Melati terdiri dari beberapa desa dan kelurahan. Saya membina dan mengoordinasikan mereka semua. |
| `kec-w1` | Kecamatan dipimpin oleh Camat. Camat bekerja di kantor kecamatan bersama para pegawai. |
| `kec-w2` | Camat adalah pegawai pemerintah. Camat diangkat oleh Bupati atau Wali Kota, bukan dipilih langsung oleh warga. |
| `kec-w3` | Membina desa dan kelurahan, melayani urusan warga tertentu, dan menyampaikan program dari kabupaten atau kota kepada warga. |
| `kec-b` | Musrenbang adalah Musyawarah Perencanaan Pembangunan. Di kecamatan, wakil-wakil desa dan kelurahan berkumpul untuk mengusulkan pembangunan yang dibutuhkan warga. |
| `kec-t1` | Beberapa kecamatan bergabung menjadi sebuah kabupaten. Siapa yang memimpin kabupaten? |
| `kab-1` | Selamat datang di Kabupaten Nusa Indah, {nama}! Saya Bu Ratna, Bupati di sini. |
| `kab-2` | Kabupaten dipimpin Bupati, sedangkan kota dipimpin Wali Kota. Kabupaten dan kota setingkat dan berada di bawah provinsi. |
| `kab-w1` | Kabupaten dipimpin Bupati dan Wakil Bupati. Kota dipimpin Wali Kota dan Wakil Wali Kota. |
| `kab-w2` | Bupati dan Wali Kota dipilih langsung oleh rakyat melalui Pemilihan Kepala Daerah atau Pilkada, setiap 5 tahun sekali. |
| `kab-w3` | Memimpin pemerintahan daerah, membangun sekolah, puskesmas, dan jalan, serta melayani warga. Saya dibantu dinas-dinas dan bekerja sama dengan DPRD. |
| `kab-b` | Keduanya setingkat. Kabupaten umumnya lebih luas dan banyak daerah pedesaan. Kota umumnya lebih padat, dengan banyak kegiatan perdagangan dan jasa. |
| `kab-t1` | Kabupaten dan kota bergabung dalam sebuah provinsi. Siapa pemimpin provinsi? |
| `prov-1` | Selamat datang di kantor Gubernur Provinsi {provinsi}, {nama}! |
| `prov-2` | Provinsi {provinsi} terdiri dari {jmlKab} kabupaten dan {jmlKota} kota. Ibu kota provinsinya adalah {ibukota}. |
| `prov-3` | Indonesia memiliki 38 provinsi. Setiap provinsi dipimpin oleh seorang Gubernur. |
| `prov-w1` | Provinsi dipimpin Gubernur dan Wakil Gubernur. Ada juga DPRD Provinsi sebagai wakil rakyat. |
| `prov-w2` | Gubernur dipilih langsung oleh rakyat melalui Pilkada setiap 5 tahun sekali. Di Daerah Istimewa Yogyakarta, Gubernurnya adalah Sultan yang ditetapkan sesuai keistimewaan daerah itu. |
| `prov-w3` | Memimpin pemerintahan provinsi, mengoordinasikan kabupaten dan kota, serta menjadi wakil pemerintah pusat di daerah. |
| `prov-b` | Provinsi terbaru adalah Papua Barat Daya, provinsi ke-38, yang dibentuk tahun 2022. Kamu bisa menjelajahi semua provinsi di Jelajah Nusantara! |
| `prov-t1` | Semua provinsi bersatu dalam Negara Kesatuan Republik Indonesia. Siapa yang memimpin negara kita? |

> Teks berisi {nama} / {provinsi} akan diganti otomatis di layar; pada rekaman suara, sebaiknya gunakan kalimat umum (mis. “Halo, Wartawan Cilik!”).
