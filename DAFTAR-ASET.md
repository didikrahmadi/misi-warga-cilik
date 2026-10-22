# Daftar Aset – Misi Warga Cilik

Taruh file di folder yang disebutkan, **dengan nama persis seperti di bawah**. Jika nama file Anda berbeda, ubah namanya di `assets/js/config.js` (untuk gambar umum, musik, efek) atau `assets/js/data-materi.js` (tokoh & latar tiap stasiun).

Semua aset bersifat **opsional**. Bila sebuah file belum ada, media tetap berjalan dengan pengganti bawaan (emoji, gambar kartun bawaan, dan bunyi buatan browser).

**Tips format:** ilustrasi menggunakan WebP agar ringan; lambang daerah tetap PNG. Semua gambar dijaga di bawah 200 KB per file. Tokoh berlatar transparan. Latar disiapkan untuk tampilan layar lebar. Suara MP3.

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
| `assets/img/logo.webp` | ± 1100×380 | Judul media di layar pembuka |
| `assets/img/latar/pembuka.webp` | 1920×1080 | Latar layar pembuka |
| `assets/img/latar/menu.webp` | 1920×1080 | Latar menu utama |
| `assets/img/latar/peta-misi.webp` | 1920×1080 | Latar Peta Misi (jalan RT → Provinsi) |
| `assets/img/menu-misi.webp` | ± 700×320 | Ilustrasi tombol Misi Warga Cilik |
| `assets/img/menu-jelajah.webp` | ± 700×320 | Ilustrasi tombol Jelajah Nusantara |
| `assets/img/tokoh/avatar-1.webp` | ± 400×520 | Avatar murid pilihan 1 |
| `assets/img/tokoh/avatar-2.webp` | ± 400×520 | Avatar murid pilihan 2 |
| `assets/img/tokoh/avatar-3.webp` | ± 400×520 | Avatar murid pilihan 3 |
| `assets/img/tokoh/avatar-4.webp` | ± 400×520 | Avatar murid pilihan 4 |
| `assets/img/tokoh/avatar-5.webp` | ± 400×520 | Avatar murid pilihan 5 |
| `assets/img/tokoh/avatar-6.webp` | ± 400×520 | Avatar murid pilihan 6 |

## 4. Tokoh & latar tiap stasiun

| Stasiun | Tokoh (± 420×600, transparan) | Latar (1920×1080) |
|---|---|---|
| 1. Rukun Tetangga (RT) (Pak Darto, Ketua RT) | `assets/img/tokoh/ketua-rt.webp` | `assets/img/latar/rt.webp` |
| 2. Rukun Warga (RW) (Bu Sari, Ketua RW) | `assets/img/tokoh/ketua-rw.webp` | `assets/img/latar/rw.webp` |
| 3. Desa / Kelurahan (Pak Hasan, Kepala Desa / Lurah) | `assets/img/tokoh/kepala-desa.webp` | `assets/img/latar/desa.webp` |
| 4. Kecamatan (Pak Bayu, Camat) | `assets/img/tokoh/camat.webp` | `assets/img/latar/kecamatan.webp` |
| 5. Kabupaten / Kota (Bu Ratna, Bupati / Wali Kota) | `assets/img/tokoh/bupati.webp` | `assets/img/latar/kabupaten.webp` |
| 6. Provinsi (Pak Gubernur, Gubernur) | `assets/img/tokoh/gubernur.webp` | `assets/img/latar/provinsi.webp` |

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

## 8. Tombol & panel bergambar (opsional)

Folder: `assets/img/ui/`. Gambar **tanpa tulisan**, WebP berlatar transparan, dilihat lurus dari depan.

Media memotong gambar menjadi **9 bagian**: keempat sudut tidak melar, sisi dan tengah melebar mengikuti ukuran tombol. Jadi **satu gambar dipakai untuk tombol pendek maupun panjang**, dan tulisannya tetap diketik oleh media.

```
┌──────┬─────────────┬──────┐
│ sudut│  sisi atas  │ sudut│  ← lebar "potong" (piksel di gambar asli)
├──────┼─────────────┼──────┤
│ sisi │   TENGAH    │ sisi │  ← tengah sebaiknya polos (warna/tekstur rata)
├──────┼─────────────┼──────┤
│ sudut│  sisi bawah │ sudut│
└──────┴─────────────┴──────┘
```

Tips: buat sudut membulat ±60 px, letakkan hiasan (paku, serat kayu, kilap) di sudut atau tersebar rata, dan **buat bagian tengah polos**. Bila hasilnya kurang pas, ubah angka `potong` (lebar sudut di gambar asli) dan `sudut` (lebar sudut saat tampil) di `assets/js/config.js`. Untuk gambar yang pendek (mis. papan judul), `potong` sebaiknya **kurang dari setengah tinggi gambar**.

| File | Ukuran saran | Dipakai untuk | Status |
|---|---|---|---|
| `assets/img/ui/tombol-kuning.webp` | 600×200 | Tombol utama (MULAI, Lanjut, Daftar) | ✅ ada |
| `assets/img/ui/tombol-hijau.webp` | 600×200 | Tombol benar / selesai | ✅ ada |
| `assets/img/ui/tombol-biru.webp` | 600×200 | Tombol biasa | ✅ ada |
| `assets/img/ui/tombol-putih.webp` | 600×200 | Tombol sekunder (Menu, Kembali, pilihan) | ✅ ada |
| `assets/img/ui/tombol-oranye.webp` | 600×200 | Tombol peringatan, Main Tim | ✅ ada |
| `assets/img/ui/tombol-bulat.webp` | 200×200 | Tombol ikon bulat: musik, layar penuh, zoom (utuh, tidak dipotong) | ✅ ada |
| `assets/img/ui/panel-kertas.webp` | 400×400 | Panel isi, kartu info, jendela | ✅ ada |
| `assets/img/ui/papan-judul.webp` | 500×160 | Papan/pita judul di bilah atas | ✅ ada |
| `assets/img/ui/kartu-pilihan.webp` | 300×300 | Kartu jawaban & kartu yang diseret | ✅ ada |
| `assets/img/ui/balon-dialog.webp` | 400×400 | Balon percakapan tokoh | ✅ ada |

## 9. Jelajah: Buku Atlas & Kartu Koleksi (opsional)

Folder: `assets/img/jelajah/`. Bila `meja-atlas.webp` ada, layar provinsi berubah menjadi **buku atlas terbuka**: peta di halaman kiri, info provinsi di halaman kanan. Posisi kedua halaman diatur di `config.js` (`halamanKiri`, `halamanKanan` = [kiri, atas, lebar, tinggi] dalam piksel layar 1920×1080). Sesuaikan angkanya dengan gambar Bapak/Ibu.

| File | Ukuran saran | Isi | Status |
|---|---|---|---|
| `assets/img/jelajah/meja-atlas.webp` | 1920×1080 | Meja kayu dengan buku atlas terbuka, kedua halaman kosong & terang | ✅ ada |
| `assets/img/jelajah/laut.png` | 512×512 | Tekstur laut kartun yang bisa diulang (tepinya menyambung) | ✅ ada |
| `assets/img/jelajah/kartu-provinsi.webp` | 400×400 | Halaman info provinsi (9 bagian, tengah polos) | ✅ ada |
| `assets/img/jelajah/kartu-koleksi.webp` | 600×860 | Bingkai **kartu koleksi** kabupaten/kota; bagian dalam kosong & terang (lambang dan teks ditaruh media). Ditarik penuh, tidak dipotong | ✅ ada |
| `assets/img/jelajah/pin-ibukota.webp` | 128×160 | Penanda ibu kota provinsi di peta (ujung lancip di bawah tengah) | ✅ ada |
| `assets/img/jelajah/kompas.webp` | 300×300 | Hiasan mata angin di sudut peta | ✅ ada |

## 10. Tokoh per jabatan

Dipakai di dialog, pilihan teka-teki, Peta Misi (wajah dipotong otomatis dari bagian atas), dan Arena "Aku Siapa?" (siluet). Ukuran hasil kompresi ±400×600, seluruh badan, latar transparan, **kepala dekat bagian atas gambar** (seperti gambar yang sudah ada).

| Jabatan | File | Status |
|---|---|---|
| Ketua RT | `assets/img/tokoh/ketua-rt.webp` | ✅ ada |
| Ketua RW | `assets/img/tokoh/ketua-rw.webp` | ✅ ada |
| Kepala Desa | `assets/img/tokoh/kepala-desa.webp` | ✅ ada |
| Lurah | `assets/img/tokoh/lurah.webp` | ✅ ada |
| Camat | `assets/img/tokoh/camat.webp` | ✅ ada |
| Bupati | `assets/img/tokoh/bupati.webp` | ✅ ada |
| Wali Kota | `assets/img/tokoh/wali-kota.webp` | ✅ ada |
| Gubernur | `assets/img/tokoh/gubernur.webp` | ✅ ada |
| Presiden | `assets/img/tokoh/presiden.webp` | ✅ ada |

> Presiden: gunakan tokoh **umum**, bukan wajah presiden sungguhan.

## 11. Gedung (aktivitas Kabupaten & Arena "Ke Mana?")

| Kunci | File | Status |
|---|---|---|
| rt | `assets/img/latar/rt.webp` | ✅ ada |
| rw | `assets/img/latar/rw.webp` | ✅ ada |
| desa | `assets/img/latar/desa.webp` | ✅ ada |
| kecamatan | `assets/img/latar/kecamatan.webp` | ✅ ada |
| kabupaten | `assets/img/latar/kabupaten.webp` | ✅ ada |
| provinsi | `assets/img/latar/provinsi.webp` | ✅ ada |
| dprd | `assets/img/gedung/dprd.webp` | ✅ ada |
| dinas-pendidikan | `assets/img/gedung/dinas-pendidikan.webp` | ✅ ada |
| dinas-kesehatan | `assets/img/gedung/dinas-kesehatan.webp` | ✅ ada |
| dinas-kependudukan | `assets/img/gedung/dinas-kependudukan.webp` | ✅ ada |
| dinas-pu | `assets/img/gedung/dinas-pu.webp` | ✅ ada |

## 12. Gambar situasi Arena "Ke Mana Aku Harus Pergi?"

Ukuran saran 560×520 (dipotong rapi ke kotak). Diatur di `data-materi.js` (kunci `gambar`).

| File | Situasi | Status |
|---|---|---|
| `assets/img/situasi/situasi-1.webp` | Keluarga Dina baru pindah rumah. Mereka ingin dicatat sebagai warga baru di lingkungannya. Ke mana mereka melapor pertama kali? | ✅ ada |
| `assets/img/situasi/situasi-2.webp` | Warga satu RT ingin mengadakan kerja bakti membersihkan selokan. Siapa yang mengajak dan mengaturnya? | ✅ ada |
| `assets/img/situasi/situasi-3.webp` | Pak Budi sudah mendapat surat pengantar dari RT dan RW. Ke mana ia pergi untuk mendapatkan surat keterangan? | ✅ ada |
| `assets/img/situasi/situasi-4.webp` | Wakil dari beberapa desa dan kelurahan berkumpul untuk musyawarah perencanaan pembangunan. Di mana musyawarah itu diadakan? | ✅ ada |
| `assets/img/situasi/situasi-5.webp` | Sebuah sekolah dasar membutuhkan perbaikan gedung. Pemerintah mana yang mengurus sekolah dasar? | ✅ ada |
| `assets/img/situasi/situasi-6.webp` | Warga ingin membuat KTP elektronik dan Kartu Keluarga baru. Siapa yang mencetaknya? | ✅ ada |
| `assets/img/situasi/situasi-7.webp` | Ada jalan provinsi yang menghubungkan beberapa kabupaten. Siapa yang merawatnya? | ✅ ada |
| `assets/img/situasi/situasi-8.webp` | Pemerintah ingin memperbaiki SMA dan SMK negeri di beberapa kabupaten dan kota. Siapa yang mengurusnya? | ✅ ada |

## 13. Ikon tombol (opsional)

Folder: `assets/img/ikon/`, PNG transparan ±128×128, nama file = nama ikon + `.png` (mis. `musik.png`). Seluruh 59 ikon PNG sudah dibuat dan otomatis menggantikan ikon garis bawaan.

`menu` · `kembali` · `lanjut` · `musik` · `musikMati` · `layarPenuh` · `buku` · `guru` · `atur` · `kunci` · `centang` · `bintang` · `bengkel` · `arena` · `latihan` · `refleksi` · `mik` · `peta` · `lup` · `tambah` · `kurang` · `ulang` · `tutup` · `simpan` · `cetak` · `suara` · `piala` · `daftar` · `target` · `pin` · `perisai` · `lampu` · `paspor` · `orang` · `kantor` · `rumah` · `tangga` · `kotakSuara` · `kota` · `sawah` · `kotak` · `sapu` · `surat` · `diskusi` · `sekolah` · `ktp` · `jalan` · `toga` · `rs` · `dprd` · `kerucut` · `pohon` · `tangan` · `bendera` · `senyum` · `biasa` · `bingung` · `tim` · `sendiri`

## 14. Contoh perintah (prompt) pembuatan gambar

- Tombol: *"Game UI button, cartoon 3D style, [warm yellow wooden plank / glossy candy yellow], rounded corners, plain flat center, decorations only on corners, no text, transparent background, front view"*
- Panel kertas: *"Game UI panel, aged cream paper with soft brown border, rounded corners, plain empty center, cartoon style, no text, transparent background"*
- Meja atlas: *"Open adventure atlas book on a wooden desk, top view, cartoon 3D style, warm lighting, both pages blank and light colored, no text, 16:9"*
- Kartu koleksi: *"Collectible trading card frame, golden ornate border, empty light inner area, cartoon game style, no text, transparent background, portrait"*
- Pin ibu kota: *"Red map pin marker with small star, cartoon 3D icon, transparent background"*

## 15. Citra satelit peta (sudah terisi)

Peta Jelajah Nusantara memakai citra satelit asli **NASA Blue Marble Next Generation** (topografi + batimetri laut, resolusi 500 m), dipotong mengikuti proyeksi peta media.

| File | Isi |
|---|---|
| `assets/img/peta/indonesia.jpg` | Citra seluruh Indonesia (92,6°–143,1° BT, 10° LU–15° LS) |
| `assets/img/peta/prov-<kode>.jpg` | Citra tiap provinsi (38 file), dimuat hanya saat provinsi dibuka |
| `assets/data/peta/citra.js` | Posisi citra provinsi pada peta (jangan diubah) |

Kepekatan warna provinsi di atas citra diatur di `config.js` (`citraWarna`). Untuk kembali ke peta warna polos, kosongkan `citraNasional` dan `citraProvinsi`.
Sumber: NASA Earth Observatory (Reto Stöckli, NASA GSFC). Cantumkan sumber ini bila media disebarluaskan.
