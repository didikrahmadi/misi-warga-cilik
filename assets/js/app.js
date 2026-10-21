/* ===================== MISI WARGA CILIK – mesin utama ===================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const stage = $('#stage'), layar = $('#layar');
  const ST = MATERI.stasiun;
  let SKALA = 1;

  /* ---------- skala panggung 16:9 ---------- */
  function pas() { SKALA = Math.min(innerWidth / 1920, innerHeight / 1080); stage.style.setProperty('--s', SKALA); }
  addEventListener('resize', pas); pas();

  /* ---------- progres (tersimpan di perangkat) ---------- */
  const KUNCI = 'misi-warga-cilik-v1';
  const AWAL = { nama: '', avatar: 0, prov: '', stempel: {}, buku: {}, bengkel: {}, arena: { siapa: false, kemana: false, skor: null },
    latihan: null, refleksi: { pilih: [], rasa: null }, guru: false, musik: true, efek: true, besar: false };
  let S = muat();
  function muat() {
    const a = JSON.parse(JSON.stringify(AWAL));
    try { const d = JSON.parse(localStorage.getItem(KUNCI)); if (d) return Object.assign(a, d); } catch (e) {}
    return a;
  }
  function simpan() { try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch (e) {} }
  function hapusProgres() { const keep = { musik: S.musik, efek: S.efek, besar: S.besar }; S = Object.assign(JSON.parse(JSON.stringify(AWAL)), keep); simpan(); }

  /* ---------- status buka-kunci ---------- */
  const jmlStempel = () => ST.filter(s => S.stempel[s.id]).length;
  const stasiunTerbuka = i => S.guru || i === 0 || !!S.stempel[ST[i - 1].id];
  const bengkelSelesai = () => MATERI.bengkel.every(b => S.bengkel[b.id]);
  const arenaSelesai = () => S.arena.siapa && S.arena.kemana;
  const latihanSelesai = () => !!(S.latihan && S.latihan.selesai);
  const BAGIAN = [
    { id: 'bengkel', nama: 'Bengkel Konsep', ikon: 'bengkel', ke: 'bengkel', buka: () => jmlStempel() === 6, selesai: bengkelSelesai, syarat: 'Kumpulkan 6 stempel dulu' },
    { id: 'arena', nama: 'Arena Teka-teki', ikon: 'arena', ke: 'arena', buka: bengkelSelesai, selesai: arenaSelesai, syarat: 'Selesaikan Bengkel Konsep dulu' },
    { id: 'latihan', nama: 'Latihan Soal', ikon: 'latihan', ke: 'latihan', buka: arenaSelesai, selesai: latihanSelesai, syarat: 'Selesaikan Arena Teka-teki dulu' },
    { id: 'refleksi', nama: 'Refleksi', ikon: 'refleksi', ke: 'refleksi', buka: latihanSelesai, selesai: () => S.refleksi.pilih.length > 0, syarat: 'Selesaikan Latihan Soal dulu' }
  ];
  const bagianTerbuka = b => S.guru || b.buka();

  /* ---------- info provinsi pilihan ---------- */
  function infoProv(kode) {
    const p = PROVINSI[kode]; if (!p) return null;
    const daftar = Object.entries(KABKOTA).filter(([k]) => k.startsWith(kode + '.'));
    const jmlKota = daftar.filter(([, v]) => /^Kota /.test(v.nama)).length;
    return Object.assign({ kode, jmlKab: daftar.length - jmlKota, jmlKota, daftar }, p);
  }
  function isi(t) {
    const p = infoProv(S.prov);
    return String(t)
      .replace(/\{nama\}/g, S.nama || 'Wartawan Cilik')
      .replace(/\{provinsi\}/g, p ? p.nama : 'tempat tinggalmu')
      .replace(/\{ibukota\}/g, p ? p.ibukota : '-')
      .replace(/\{jmlKab\}/g, p ? p.jmlKab : '-')
      .replace(/\{jmlKota\}/g, p ? p.jmlKota : '-');
  }

  /* ---------- pembantu tampilan ---------- */
  const AVATAR = ['👦🏽', '👧🏽', '🧒🏻', '👧🏾', '👦🏻', '🧕🏽'];
  const WARNA_AV = ['#FFD166', '#FF9EC4', '#8FD3FF', '#A7E8A1', '#FFB38A', '#C7B2FF'];
  const acak = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const pos = (x, y, w, h) => `left:${x}px;top:${y}px;width:${w}px;height:${h}px`;

  // gambar dari file + cadangan (dipakai bila file belum ada)
  function pic(src, cadangan, gaya = '', kelas = '') {
    return `<div class="pic ${kelas}" style="${gaya}"><div class="cad">${cadangan}</div>${src ? `<img src="${src}" alt="" draggable="false" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}</div>`;
  }
  const I = (n, u, t, k) => IKON.ikon(n, u, t, k);
  function tokoh(src, emoji, warna, nama, gaya, ekstra = '') {
    // cadangan (bila gambar belum ada): siluet di lingkaran berwarna
    const w = +((gaya.match(/width:(\d+)px/) || [])[1] || 300), h = +((gaya.match(/height:(\d+)px/) || [])[1] || 300);
    const d = Math.min(w, h);
    return `<div class="tokoh ${ekstra}" style="${gaya}">${pic(src, `<div class="ganti" style="background:${warna};width:${d}px;color:#fff;border-width:${Math.max(4, Math.round(d / 40))}px">${I('orang', Math.round(d * .62), 1.8)}</div>`, 'width:100%;height:100%')}${nama ? `<div class="papan-nama" style="${d < 200 ? 'font-size:20px;bottom:-34px' : ''}">${nama}</div>` : ''}</div>`;
  }
  // jabatan pemimpin tiap stasiun (untuk mengambil gambar tokoh)
  const JAB_ST = { rt: 'Ketua RT', rw: 'Ketua RW', desa: 'Kepala Desa', kec: 'Camat', kab: 'Bupati', prov: 'Gubernur' };
  const srcJab = jab => (ASET.gambar.tokohJabatan || {})[jab];
  // wajah: potongan kepala dari gambar tokoh, di dalam lingkaran
  function wajah(src, d = 120, warna = '#fff', kelas = '') {
    return `<div class="wajah ${kelas}" style="width:${d}px;height:${d}px;background:${warna}"><span class="wj-cad">${I('orang', Math.round(d * .62), 1.8)}</span>${src ? `<img src="${src}" alt="" draggable="false" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ''}</div>`;
  }
  const wajahJab = (jab, d, warna, kelas) => wajah(srcJab(jab), d, warna, kelas);
  // gambar tokoh seluruh badan (cadangan: siluet)
  const badanJab = (jab, gaya) => pic(srcJab(jab), `<div style="color:#C9C6DC">${I('orang', 150, 1.5)}</div>`, gaya);
  // lambang daerah (provinsi: kode 2 digit, kabupaten/kota: kode dengan titik)
  function logo(kode, gaya = 'width:120px;height:120px') {
    const src = (kode.includes('.') ? ASET.gambar.logoKabKota : ASET.gambar.logoProvinsi).replace('{kode}', kode);
    const w = +((gaya.match(/width:(\d+)px/) || [])[1] || 120);
    return `<div class="pic logo" style="${gaya}"><div class="cad"><span class="perisai">${I('perisai', Math.round(w * .7), 1.6)}</span></div><img src="${src}" alt="Lambang" loading="lazy" draggable="false" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()"></div>`;
  }
  const avatarSaya = (gaya, ekstra) => tokoh(ASET.gambar.avatar[S.avatar], AVATAR[S.avatar], WARNA_AV[S.avatar], S.nama || 'Wartawan Cilik', gaya, ekstra);

  function bar(judul, o = {}) {
    let kiri = `<button class="btn putih kecil" data-ke="menu" style="min-width:200px">${I('menu', 34)} Menu</button>`;
    if (o.kembali) kiri = `<button class="btn putih kecil" data-ke="${o.kembali[1]}" ${o.kembali[2] ? `data-arg="${o.kembali[2]}"` : ''} style="min-width:200px">${I('kembali', 34, 2.8)} ${o.kembali[0]}</button>`;
    if (o.tanpaKiri) kiri = '<div style="width:200px"></div>';
    return `<div class="bar">${kiri}<div class="judul">${o.ikon ? I(o.ikon, 46) + ' ' : ''}${judul}</div>${o.pil ? `<div class="pil" id="bar-pil">${o.pil}</div>` : ''}${tombolSudut()}</div>`;
  }
  function tombolSudut() {
    return `<button class="btn-ikon ${S.musik ? '' : 'mati'}" data-aksi="musik" title="Musik">${I(S.musik ? 'musik' : 'musikMati', 38)}</button>
      <button class="btn-ikon" data-aksi="layarpenuh" title="Layar penuh">${I('layarPenuh', 38)}</button>`;
  }
  const LANJUT = (t = 'Lanjut') => `${t} ${I('lanjut', 36, 3)}`;

  /* ---------- latar pemandangan kartun (dipakai bila gambar latar belum ada) ---------- */
  function rumah(x, y, s, c, atap) {
    const w = 170 * s, h = 120 * s;
    return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" rx="${8 * s}"/>
      <path d="M${x - 18 * s} ${y - h + 6 * s} L${x + w / 2} ${y - h - 86 * s} L${x + w + 18 * s} ${y - h + 6 * s}Z" fill="${atap}"/>
      <rect x="${x + w * .4}" y="${y - 66 * s}" width="${36 * s}" height="${66 * s}" fill="#8A5A3B" rx="${5 * s}"/>
      <rect x="${x + 20 * s}" y="${y - h + 30 * s}" width="${34 * s}" height="${34 * s}" fill="#C8EEFF" stroke="#fff" stroke-width="${5 * s}"/>
      <rect x="${x + w - 54 * s}" y="${y - h + 30 * s}" width="${34 * s}" height="${34 * s}" fill="#C8EEFF" stroke="#fff" stroke-width="${5 * s}"/>`;
  }
  function gedung(x, y, w, h, c, o = {}) {
    let s = '';
    if (o.bendera) s += `<rect x="${x + w / 2 - 4}" y="${y - h - (o.kubah ? 230 : 150)}" width="8" height="${o.kubah ? 150 : 110}" fill="#777"/>
      <rect x="${x + w / 2 + 4}" y="${y - h - (o.kubah ? 230 : 150)}" width="70" height="24" fill="#E8262B"/><rect x="${x + w / 2 + 4}" y="${y - h - (o.kubah ? 206 : 126)}" width="70" height="24" fill="#fff"/>`;
    if (o.kubah) s += `<path d="M${x + w / 2 - 90} ${y - h} A90 90 0 0 1 ${x + w / 2 + 90} ${y - h}Z" fill="${o.kubah}"/>`;
    if (o.atap) s += `<path d="M${x - 20} ${y - h + 4} L${x + w / 2} ${y - h - 70} L${x + w + 20} ${y - h + 4}Z" fill="${o.atap}"/>`;
    s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" rx="10"/>`;
    const kol = Math.max(2, Math.floor(w / 72)), bar_ = Math.max(1, Math.floor((h - (o.papan ? 110 : 60)) / 74));
    for (let r = 0; r < bar_; r++) for (let k = 0; k < kol; k++)
      s += `<rect x="${x + 22 + k * ((w - 44) / kol)}" y="${y - h + 24 + r * 74}" width="${(w - 44) / kol - 18}" height="46" rx="6" fill="#C8EEFF"/>`;
    if (o.tiang) for (let k = 0; k < 5; k++) s += `<rect x="${x + 30 + k * (w - 80) / 4}" y="${y - 130}" width="22" height="130" fill="#fff" opacity=".9"/>`;
    if (o.papan) s += `<rect x="${x + w / 2 - 170}" y="${y - h + (h > 260 ? 200 : 100)}" width="340" height="56" rx="12" fill="#fff" stroke="#2D2A4A" stroke-width="4"/>
      <text x="${x + w / 2}" y="${y - h + (h > 260 ? 239 : 139)}" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="30" font-weight="600" fill="#2D2A4A">${o.papan}</text>`;
    return s;
  }
  function pohon(x, y, s = 1) {
    return `<rect x="${x - 10 * s}" y="${y - 90 * s}" width="${20 * s}" height="${90 * s}" fill="#8A5A3B"/><circle cx="${x}" cy="${y - 120 * s}" r="${60 * s}" fill="#3FB55E"/><circle cx="${x - 40 * s}" cy="${y - 90 * s}" r="${40 * s}" fill="#4CC76B"/><circle cx="${x + 42 * s}" cy="${y - 92 * s}" r="${42 * s}" fill="#36A853"/>`;
  }
  function latar(jenis, gambar, redup) {
    const langit = jenis === 'provinsi' ? ['#9FD8FF', '#E8F6FF'] : ['#7FD0FF', '#DDF4FF'];
    let isiSvg = `<defs><linearGradient id="lg-${jenis}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${langit[0]}"/><stop offset="1" stop-color="${langit[1]}"/></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#lg-${jenis})"/><circle cx="1700" cy="200" r="90" fill="#FFE066"/><circle cx="1700" cy="200" r="130" fill="#FFE066" opacity=".25"/>
      <path d="M0 760 Q300 620 640 720 T1300 700 T1920 690 V1080 H0Z" fill="#8EDB7E"/>
      <path d="M0 860 Q420 760 900 840 T1920 820 V1080 H0Z" fill="#6CC860"/>`;
    const tanah = 900;
    if (jenis === 'rumah') isiSvg += rumah(60, tanah, 1, '#FFB4A2', '#E5604D') + rumah(300, tanah - 40, .8, '#FFE29A', '#F08A24') + rumah(1520, tanah - 30, .9, '#BDE0FE', '#5B7FDB') + pohon(1440, tanah, .9) + pohon(1820, tanah + 20, 1);
    if (jenis === 'kampung') isiSvg += rumah(40, tanah, .9, '#FFE29A', '#F08A24') + rumah(240, tanah - 50, .7, '#CDB4DB', '#8E5BB5') + rumah(1340, tanah - 60, .75, '#FFB4A2', '#E5604D') + rumah(1530, tanah - 20, .9, '#BDE0FE', '#5B7FDB') + rumah(1740, tanah - 40, .7, '#B9F3C9', '#2E9E5B') + pohon(470, tanah - 20, .8);
    if (jenis === 'desa') isiSvg += `<path d="M0 760 Q300 620 640 720 T1300 700 T1920 690 V760 H0Z" fill="#A6E38F"/>` + gedung(1250, tanah, 560, 230, '#FFF1C9', { atap: '#E5604D', bendera: true, papan: 'KANTOR DESA' }) + pohon(1180, tanah, .9) + rumah(60, tanah, .8, '#FFE29A', '#F08A24') + pohon(330, tanah, .8);
    if (jenis === 'kantor') isiSvg += gedung(1180, tanah, 640, 300, '#E3F2FF', { atap: '#3D7BD9', bendera: true, papan: 'KANTOR KECAMATAN' }) + pohon(1110, tanah, 1) + pohon(120, tanah, 1.1) + rumah(240, tanah - 30, .7, '#FFB4A2', '#E5604D');
    if (jenis === 'kota') isiSvg += gedung(20, tanah, 200, 420, '#C9D6FF') + gedung(230, tanah, 170, 320, '#FFD6E0') + gedung(1180, tanah, 640, 340, '#FFF4D6', { tiang: true, bendera: true, papan: 'KANTOR BUPATI', atap: '#E3A21A' }) + gedung(1830, tanah, 120, 480, '#C9F2E4');
    if (jenis === 'provinsi') isiSvg += gedung(1080, tanah, 780, 380, '#FFFFFF', { kubah: '#7C5CE6', tiang: true, bendera: true, papan: 'KANTOR GUBERNUR' }) + pohon(1010, tanah, 1.1) + gedung(40, tanah, 180, 380, '#E1D5FF') + gedung(230, tanah, 150, 280, '#D0F0FF');
    if (jenis === 'misi') isiSvg += rumah(40, 1020, .7, '#FFB4A2', '#E5604D') + gedung(1460, 620, 300, 230, '#FFFFFF', { kubah: '#7C5CE6', bendera: true }) + pohon(1290, 720, .7) + pohon(60, 720, .8);
    const awan = jenis === 'polos' ? '' : `<div class="awan" style="top:120px;width:220px;height:60px;animation-duration:70s"></div><div class="awan" style="top:260px;width:160px;height:46px;animation-duration:95s;animation-delay:-40s"></div><div class="awan" style="top:180px;width:260px;height:70px;animation-duration:120s;animation-delay:-80s"></div>`;
    return `<div class="latar"><svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">${isiSvg}</svg>${awan}${gambar ? `<img class="lapis" src="${gambar}" alt="" onerror="this.remove()">` : ''}${redup ? `<div class="abs" style="inset:0;background:rgba(255,255,255,${redup})"></div>` : ''}</div>`;
  }

  /* ---------- efek: konfeti, umpan balik, jendela ---------- */
  function konfeti(n = 70) {
    const w = ['#FF5A5F', '#FFC93C', '#2F6BFF', '#22B573', '#FF6FA8', '#8B5CF6', '#22C3C3'];
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div'); d.className = 'konfeti';
      d.style.left = Math.random() * 1920 + 'px'; d.style.background = w[i % w.length];
      d.style.animationDuration = (1.8 + Math.random() * 1.6) + 's'; d.style.animationDelay = Math.random() * .5 + 's';
      stage.appendChild(d); setTimeout(() => d.remove(), 4200);
    }
  }
  let umpanTimer;
  function umpan(jenis, html, ms = 2800) {
    $$('.umpan', stage).forEach(e => e.remove()); clearTimeout(umpanTimer);
    const d = document.createElement('div'); d.className = 'umpan ' + (jenis === 'ok' ? 'ok' : 'no');
    d.innerHTML = `<div class="ik">${I(jenis === 'ok' ? 'bintang' : 'lampu', 58, 2.2)}</div><div>${html}</div>`;
    stage.appendChild(d); if (ms) umpanTimer = setTimeout(() => d.remove(), ms);
    return d;
  }
  function jendela(html, lebar = 1100) {
    const t = document.createElement('div'); t.className = 'tirai';
    t.innerHTML = `<div class="jendela" style="width:${lebar}px">${html}</div>`;
    stage.appendChild(t);
    t.addEventListener('click', e => { if (e.target.closest('[data-aksi="tutup"]')) { Suara.efek('klik'); t.remove(); } });
    return t;
  }

  /* ---------- seret-lepas (sentuh & tetikus) ---------- */
  function seret(el, o) {
    el.addEventListener('pointerdown', e => {
      if (el.classList.contains('benar') || el.dataset.kunci) return;
      e.preventDefault(); try { el.setPointerCapture(e.pointerId); } catch (_) {}
      const x0 = e.clientX, y0 = e.clientY, l0 = parseFloat(el.style.left), t0 = parseFloat(el.style.top);
      el.classList.remove('balik', 'salah-kilat'); el.classList.add('angkat'); Suara.efek('seret');
      const gerak = ev => {
        el.style.left = (l0 + (ev.clientX - x0) / SKALA) + 'px'; el.style.top = (t0 + (ev.clientY - y0) / SKALA) + 'px';
        o.sorot && o.sorot(ev.clientX, ev.clientY);
      };
      const lepas = ev => {
        el.removeEventListener('pointermove', gerak); el.removeEventListener('pointerup', lepas); el.removeEventListener('pointercancel', lepas);
        el.classList.remove('angkat'); o.sorot && o.sorot(-1, -1);
        const moved = Math.hypot(ev.clientX - x0, ev.clientY - y0) > 8;
        const ok = moved && o.lepas(ev.clientX, ev.clientY);
        if (!ok) { el.classList.add('balik'); el.style.left = l0 + 'px'; el.style.top = t0 + 'px'; if (moved && ok === false) { el.classList.add('salah-kilat'); } }
      };
      el.addEventListener('pointermove', gerak); el.addEventListener('pointerup', lepas); el.addEventListener('pointercancel', lepas);
    });
  }
  const di = (el, x, y) => { const r = el.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };

  /* Mesin sortir: kartu → 2 kotak */
  function mesinSortir(wadah, o) {
    // o: { kotak:[judul,judul], zona:[[x,y,w,h],..], kartu:[{teks,ke,alasan}], posKartu(i,n)->[x,y,w,h], kepala:180, tinggi:96, font, onSelesai }
    const isiZona = [0, 0];
    wadah.insertAdjacentHTML('beforeend', o.zona.map((z, i) => `<div class="zona" data-z="${i}" style="${pos(...z)}"><div class="kepala">${o.kotak[i]}</div></div>`).join(''));
    const zonaEl = $$('.zona', wadah);
    let sisa = o.kartu.length;
    acak(o.kartu.map((k, i) => i)).forEach((ki, urut) => {
      const k = o.kartu[ki], p = o.posKartu(urut, o.kartu.length);
      const el = document.createElement('div'); el.className = 'kartu'; el.innerHTML = k.teks;
      el.style.cssText = pos(...p) + (o.font ? `;font-size:${o.font}px` : '');
      wadah.appendChild(el);
      seret(el, {
        sorot: (x, y) => zonaEl.forEach(z => z.classList.toggle('sorot', di(z, x, y))),
        lepas: (x, y) => {
          const z = zonaEl.find(z => di(z, x, y)); if (!z) return null;
          const zi = +z.dataset.z;
          if (zi !== k.ke) { Suara.efek('salah'); umpan('no', o.pesanSalah || 'Hmm, belum tepat. Coba kotak yang lain!', 2000); return false; }
          Suara.efek('benar');
          const [zx, zy, zw] = o.zona[zi], n = isiZona[zi]++, kol = o.kolom || 2, kw = (zw - 30 - 16 * (kol - 1)) / kol;
          el.classList.add('benar', 'balik');
          el.style.left = (zx + 15 + (n % kol) * (kw + 16)) + 'px'; el.style.top = (zy + (o.kepala || 90) + Math.floor(n / kol) * ((o.tinggi || 96) + 14)) + 'px';
          el.style.width = kw + 'px'; el.style.height = (o.tinggi || 96) + 'px'; if (o.fontIsi) el.style.fontSize = o.fontIsi + 'px';
          if (k.alasan) umpan('ok', k.alasan, 2600);
          if (--sisa === 0) setTimeout(() => o.onSelesai && o.onSelesai(), 700);
          return true;
        }
      });
    });
  }

  /* Mesin urut: kartu → slot berurutan */
  function mesinUrut(wadah, o) {
    // o: { slot:[[x,y,w,h,label]], kartu:[teks berurutan], posKartu(i)->[x,y,w,h], onBenar(i), onSelesai, font }
    wadah.insertAdjacentHTML('beforeend', o.slot.map((s, i) => `<div class="slot" data-s="${i}" style="${pos(s[0], s[1], s[2], s[3])}">${s[4] || ''}</div>`).join(''));
    const slotEl = $$('.slot', wadah).slice(-o.slot.length);
    let sisa = o.kartu.length;
    acak(o.kartu.map((k, i) => i)).forEach((ki, urut) => {
      const el = document.createElement('div'); el.className = 'kartu'; el.innerHTML = o.kartu[ki];
      el.style.cssText = pos(...o.posKartu(urut)) + (o.font ? `;font-size:${o.font}px` : '');
      wadah.appendChild(el);
      seret(el, {
        sorot: (x, y) => slotEl.forEach(s => s.classList.toggle('sorot', !s.classList.contains('isi') && di(s, x, y))),
        lepas: (x, y) => {
          const s = slotEl.find(s => di(s, x, y)); if (!s || s.classList.contains('isi')) return null;
          const si = +s.dataset.s;
          if (si !== ki) { Suara.efek('salah'); umpan('no', o.pesanSalah || 'Belum tepat. Coba tempat yang lain!', 1800); return false; }
          Suara.efek('benar'); s.classList.add('isi');
          const sp = o.slot[si]; el.classList.add('benar', 'balik');
          el.style.left = (sp[0] + 6) + 'px'; el.style.top = (sp[1] + 6) + 'px'; el.style.width = (sp[2] - 12) + 'px'; el.style.height = (sp[3] - 12) + 'px';
          o.onBenar && o.onBenar(si);
          if (--sisa === 0) setTimeout(() => o.onSelesai && o.onSelesai(), 600);
          return true;
        }
      });
    });
  }

  /* Mesin cocok: sentuh kiri lalu kanan */
  function mesinCocok(wadah, o) {
    const n = o.pasangan.length, kanan = acak(o.pasangan.map((p, i) => i));
    const y0 = 330, tinggi = 104, jarak = 128;
    let html = `<svg class="abs" style="left:0;top:0;width:1920px;height:1080px;pointer-events:none" viewBox="0 0 1920 1080" id="garis"></svg>`;
    o.pasangan.forEach((p, i) => { html += `<button class="pilih" data-kiri="${i}" style="${pos(300, y0 + i * jarak, 520, tinggi)}">${p[0]}</button>`; });
    kanan.forEach((pi, j) => { html += `<button class="pilih" data-kanan="${pi}" style="${pos(1100, y0 + j * jarak, 520, tinggi)}">${o.pasangan[pi][1]}</button>`; });
    wadah.insertAdjacentHTML('beforeend', html);
    let pilihKiri = null, sisa = n;
    wadah.addEventListener('click', e => {
      const b = e.target.closest('.pilih'); if (!b || b.classList.contains('benar')) return;
      if (b.dataset.kiri !== undefined) {
        $$('[data-kiri]', wadah).forEach(x => x.classList.remove('terpilih')); b.classList.add('terpilih'); pilihKiri = b; Suara.efek('klik'); return;
      }
      if (!pilihKiri) { umpan('no', 'Sentuh dulu nama <b>pemimpin</b> di sebelah kiri.', 1800); return; }
      if (b.dataset.kanan === pilihKiri.dataset.kiri) {
        Suara.efek('benar'); pilihKiri.classList.remove('terpilih'); pilihKiri.classList.add('benar'); b.classList.add('benar');
        const a = pilihKiri.getBoundingClientRect(), c = b.getBoundingClientRect(), r = stage.getBoundingClientRect();
        const g = $('#garis', wadah);
        g.insertAdjacentHTML('beforeend', `<line x1="${(a.right - r.left) / SKALA}" y1="${(a.top + a.height / 2 - r.top) / SKALA}" x2="${(c.left - r.left) / SKALA}" y2="${(c.top + c.height / 2 - r.top) / SKALA}" stroke="#22B573" stroke-width="10" stroke-linecap="round"/>`);
        pilihKiri = null;
        if (--sisa === 0) setTimeout(() => o.onSelesai && o.onSelesai(), 600);
      } else {
        Suara.efek('salah'); b.classList.add('salah'); setTimeout(() => b.classList.remove('salah'), 700);
        umpan('no', `<b>${pilihKiri.textContent}</b> tidak memimpin <b>${b.textContent}</b>. Coba lagi!`, 2000);
      }
    });
  }

  /* efek ketik untuk balon dialog */
  let timer = [];
  const bersihTimer = () => { timer.forEach(t => clearInterval(t)); timer = []; };
  function ketik(el, html, selesai) {
    el.innerHTML = html;
    const kata = [];
    (function bungkus(n) {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) f.appendChild(document.createTextNode(w)); else { const s = document.createElement('span'); s.textContent = w; f.appendChild(s); kata.push(s); } });
          c.replaceWith(f);
        } else bungkus(c);
      });
    })(el);
    el.classList.add('ketik'); let i = 0;
    const t = setInterval(() => { if (i < kata.length) kata[i++].classList.add('on'); else { clearInterval(t); selesai && selesai(); } }, 70);
    timer.push(t);
    return () => { kata.forEach(k => k.classList.add('on')); clearInterval(t); selesai && selesai(); };
  }

  /* ---------- pengatur layar ---------- */
  const LAYAR = {};
  let kini = { nama: null, arg: null };
  function ke(nama, arg) {
    if (!LAYAR[nama]) return;
    bersihTimer(); Suara.hentiNarasi(); $$('.umpan,.tirai,.konfeti', stage).forEach(e => e.remove());
    layar.innerHTML = '';
    const r = document.createElement('div'); r.className = 'abs layar-masuk'; r.style.inset = '0';
    layar.appendChild(r);
    stage.classList.toggle('teks-besar', !!S.besar);
    kini = { nama, arg };
    LAYAR[nama](r, arg);
  }

  // tombol global
  stage.addEventListener('click', e => {
    const k = e.target.closest('[data-ke]');
    if (k && !k.classList.contains('mati')) { Suara.efek('halaman'); ke(k.dataset.ke, k.dataset.arg); return; }
    const a = e.target.closest('[data-aksi]'); if (!a) return;
    if (a.dataset.aksi === 'musik') { S.musik = !S.musik; simpan(); Suara.setMusik(S.musik); a.classList.toggle('mati', !S.musik); a.innerHTML = I(S.musik ? 'musik' : 'musikMati', 38); }
    if (a.dataset.aksi === 'layarpenuh') layarPenuh(true);
  });
  stage.addEventListener('pointerdown', e => { Suara.buka(); const b = e.target.closest('.btn,.btn-ikon,.chip'); if (b && !b.dataset.ke) Suara.efek('klik'); }, true);
  function layarPenuh(tukar) {
    const d = document, el = d.documentElement;
    try {
      if (d.fullscreenElement || d.webkitFullscreenElement) { if (tukar) (d.exitFullscreen || d.webkitExitFullscreen).call(d); }
      else { const p = (el.requestFullscreen || el.webkitRequestFullscreen).call(el); if (p && p.catch) p.catch(() => tukar && umpan('no', 'Layar penuh tidak tersedia di sini. Gunakan tombol layar penuh di platform.', 2600)); }
    } catch (e) { if (tukar) umpan('no', 'Layar penuh tidak tersedia di sini.', 2200); }
  }

  /* ======================= LAYAR: PEMBUKA ======================= */
  LAYAR.pembuka = r => {
    r.innerHTML = latar('rumah', ASET.gambar.latarPembuka) + `
      <div class="abs" style="${pos(460, 60, 1000, 440)}">${pic(ASET.gambar.logo, `<div class="panel" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px">
        <div style="font-size:30px;color:var(--oranye);font-weight:600;letter-spacing:4px">PETUALANGAN WARTAWAN CILIK</div>
        <div style="font-size:104px;font-weight:700;color:var(--biru-tua);line-height:1">MISI WARGA CILIK</div></div>`, 'width:100%;height:100%')}</div>
      <div class="abs plakat" style="left:50%;top:520px;transform:translateX(-50%)"><b>Mengenal Provinsi, Kabupaten/Kota, sampai RT</b><span>Pendidikan Pancasila · Kelas 4 SD</span></div>
      <button class="btn kuning denyut abs" style="${pos(710, 700, 500, 150)};font-size:62px;border-radius:44px" data-aksi="mulai">${I('lanjut', 56, 3.2)} MULAI</button>
      <div class="abs" style="right:28px;top:20px;display:flex;gap:16px">${tombolSudut()}</div>`;
    $('[data-aksi="mulai"]', r).onclick = () => { Suara.buka(); Suara.efek('buka'); layarPenuh(false); ke('menu'); };
  };

  /* ======================= LAYAR: MENU ======================= */
  LAYAR.menu = r => {
    const sapa = S.nama ? `Halo, ${S.nama}! Mau ke mana hari ini?` : 'Halo, Wartawan Cilik! Mau ke mana hari ini?';
    r.innerHTML = latar('kampung', ASET.gambar.latarMenu) + bar(sapa, { tanpaKiri: true }) + `
      <button class="abs panel" data-ke="${S.prov ? 'petamisi' : 'tokoh'}" style="${pos(140, 170, 790, 660)};border:0;cursor:pointer;font-family:inherit;color:inherit;padding:30px">
        ${pic(ASET.gambar.pintuMisi, `<div style="color:var(--biru)">${I('mik', 170, 1.6)}</div>`, 'width:100%;height:320px;border-radius:26px', 'tutup')}
        <div style="font-size:60px;font-weight:700;color:var(--biru-tua);margin-top:14px">MISI WARGA CILIK</div>
        <div style="font-size:30px;margin-top:6px">Jadi Wartawan Cilik &amp; kumpulkan stempel dari RT sampai Provinsi</div>
        <div class="pil" style="display:inline-block;margin-top:18px;font-size:28px;padding:8px 26px;border-radius:30px;background:var(--krem);border:3px solid var(--kuning)">${I('paspor', 30)} Stempel: ${jmlStempel()} / 6</div>
      </button>
      <button class="abs panel" data-ke="nusantara" style="${pos(990, 170, 790, 660)};border:0;cursor:pointer;font-family:inherit;color:inherit;padding:30px">
        ${pic(ASET.gambar.pintuJelajah, `<div style="color:var(--hijau)">${I('peta', 170, 1.6)}</div>`, 'width:100%;height:320px;border-radius:26px', 'tutup')}
        <div style="font-size:60px;font-weight:700;color:var(--hijau-tua);margin-top:14px">JELAJAH NUSANTARA</div>
        <div style="font-size:30px;margin-top:6px">Sentuh provinsi dan kabupaten/kota di seluruh Indonesia</div>
        <div style="display:inline-block;margin-top:18px;font-size:28px;padding:8px 26px;border-radius:30px;background:var(--hijau-muda);border:3px solid var(--hijau)">38 provinsi · 514 kabupaten/kota</div>
      </button>
      <button class="btn putih abs" data-ke="buku" style="${pos(140, 890, 520, 120)}">${I('buku', 44)} Buku Liputan</button>
      <button class="btn putih abs" data-ke="guru" style="${pos(700, 890, 520, 120)}">${I('guru', 44)} Panduan Guru</button>
      <button class="btn putih abs" data-aksi="atur" style="${pos(1260, 890, 520, 120)}">${I('atur', 44)} Pengaturan</button>`;
    $('[data-aksi="atur"]', r).onclick = () => App.bukaPengaturan();
  };

  /* ======================= LAYAR: BUAT TOKOH ======================= */
  LAYAR.tokoh = r => {
    function gambar() {
      const p = PROVINSI[S.prov];
      r.innerHTML = latar('rumah', ASET.gambar.latarPembuka, .3) + bar('Kenalan Dulu, Wartawan Cilik!', { kembali: ['Menu', 'menu'] }) + `
        <div class="abs panel" style="${pos(90, 150, 560, 880)};padding:30px;display:flex;flex-direction:column;align-items:center">
          <div style="font-size:28px;font-weight:700;color:var(--oranye);letter-spacing:3px">KARTU PERS</div>
          ${avatarSaya('position:relative;width:380px;height:460px;margin-top:20px', 'goyang')}
          <div style="margin-top:50px;font-size:44px;font-weight:700">${S.nama || 'Wartawan Cilik'}</div>
          <div style="font-size:30px;margin-top:10px;display:flex;align-items:center;gap:14px">${p ? logo(S.prov, 'width:70px;height:80px') + 'Provinsi ' + p.nama : I('pin', 34) + ' Provinsi: belum dipilih'}</div>
        </div>
        <div class="abs panel" style="${pos(700, 150, 1130, 880)};padding:40px 50px">
          <div style="font-size:38px;font-weight:700">1. Siapa namamu?</div>
          <input class="isian" id="in-nama" maxlength="16" placeholder="Ketuk untuk menulis nama…" value="${(S.nama || '').replace(/"/g, '&quot;')}" style="margin-top:14px">
          <div style="font-size:38px;font-weight:700;margin-top:36px">2. Pilih tokohmu</div>
          <div style="display:flex;gap:22px;margin-top:16px">${AVATAR.map((a, i) => `<button data-av="${i}" style="border:0;background:none;padding:0;cursor:pointer;border-radius:50%;${i === S.avatar ? 'box-shadow:0 0 0 8px var(--hijau)' : ''}">${wajah(ASET.gambar.avatar[i], 150, WARNA_AV[i])}</button>`).join('')}</div>
          <div style="font-size:38px;font-weight:700;margin-top:36px">3. Kamu tinggal di provinsi mana?</div>
          <button class="btn putih" id="b-prov" style="width:100%;margin-top:16px;justify-content:flex-start">${p ? logo(S.prov, 'width:56px;height:64px') : I('pin', 40)} ${p ? p.nama : 'Pilih provinsi (38)'} <span style="margin-left:auto;transform:rotate(90deg);display:inline-flex">${I('lanjut', 36, 3)}</span></button>
          <button class="btn hijau abs ${S.prov ? 'denyut' : 'mati'}" id="b-lanjut" style="right:50px;bottom:40px;width:420px">${LANJUT()}</button>
        </div>`;
      const inp = $('#in-nama', r);
      inp.addEventListener('input', () => { S.nama = inp.value.trim().slice(0, 16); simpan(); $$('.papan-nama', r).forEach(e => e.textContent = S.nama || 'Wartawan Cilik'); $('.panel div[style*="44px"]', r).textContent = S.nama || 'Wartawan Cilik'; });
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
      $$('[data-av]', r).forEach(b => b.onclick = () => { S.avatar = +b.dataset.av; simpan(); Suara.efek('pop'); gambar(); });
      $('#b-prov', r).onclick = () => pilihProvinsi(k => { S.prov = k; simpan(); gambar(); });
      $('#b-lanjut', r).onclick = () => { if (!S.prov) { umpan('no', 'Pilih dulu <b>provinsi</b> tempat tinggalmu, ya!'); return; } Suara.efek('buka'); ke('petamisi'); };
    }
    gambar();
  };
  function pilihProvinsi(cb) {
    let h = `<h2>${I('pin', 50)} Pilih provinsi tempat tinggalmu</h2><div class="gulir" style="height:700px;padding-right:16px">`;
    PULAU.forEach(pl => {
      const daftar = Object.entries(PROVINSI).filter(([, p]) => p.pulau === pl.id);
      h += `<div style="font-size:30px;font-weight:700;margin:18px 0 10px;color:${pl.warna[2]}">${pl.nama}</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">`;
      daftar.forEach(([k, p]) => { h += `<button class="btn putih kecil" data-p="${k}" style="font-size:25px;min-height:96px;padding:0 14px;justify-content:flex-start;text-align:left;${k === S.prov ? 'background:var(--hijau-muda)' : ''}">${logo(k, 'width:56px;height:64px')}${p.nama}</button>`; });
      h += `</div>`;
    });
    h += `</div><button class="btn kuning kecil abs" data-aksi="tutup" style="right:40px;top:34px">Tutup ${I('tutup', 30, 3)}</button>`;
    const t = jendela(h, 1640);
    $$('[data-p]', t).forEach(b => b.onclick = () => { Suara.efek('pop'); t.remove(); cb(b.dataset.p); });
  }

  /* ======================= LAYAR: PETA MISI ======================= */
  const TITIK = [[150, 900], [425, 924], [777, 726], [1112, 582], [1483, 413], [1667, 243]];
  LAYAR.petamisi = r => {
    const aktif = ST.findIndex(s => !S.stempel[s.id]);
    // TITIK = titik pijakan tiap stasiun (koordinat panggung 1920×1080), disesuaikan dengan
    // lingkaran pijakan & bangunan pada gambar latar peta-misi.png. Ubah di sini bila gambar diganti.
    const jalan = 'M-40 1060 L' + TITIK.map(([x, y]) => `${x} ${y}`).join(' L');
    r.innerHTML = latar('misi', ASET.gambar.latarPetaMisi) + bar('Peta Misi', { pil: `${I('paspor', 30)} Stempel ${jmlStempel()}/6` }) + `
      <svg class="abs" id="jalan-cad" style="left:0;top:0;width:1920px;height:1080px;display:none" viewBox="0 0 1920 1080">
        <path d="${jalan}" fill="none" stroke="#E2BF7A" stroke-width="84" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${jalan}" fill="none" stroke="#F4D9A0" stroke-width="70" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="abs panel-kaca" style="${pos(24, 128, 700, 286)}"></div>
      ${BAGIAN.map((b, i) => { const buka = bagianTerbuka(b), sel = b.selesai();
        return `<div class="gerbang ${buka ? '' : 'kunci'} ${sel ? 'selesai' : ''}" data-bagian="${i}" style="${pos(40 + (i % 2) * 340, 144 + Math.floor(i / 2) * 130, 324, 114)}">${I(buka ? b.ikon : 'kunci', 46, 2.2)}<span>${b.nama}</span>${sel ? `<span class="tanda-ok">${I('centang', 24, 3.4)}</span>` : ''}</div>`; }).join('')}
      ${ST.map((s, i) => { const buka = stasiunTerbuka(i), sel = !!S.stempel[s.id], [x, y] = TITIK[i];
        return `<div class="simpul ${buka ? '' : 'kunci'} ${sel ? 'selesai' : ''} ${i === aktif ? 'aktif' : ''}" data-st="${i}" style="left:${x - 58}px;top:${Math.max(120, y - 134)}px;--w:${s.warna}">
          ${wajahJab(JAB_ST[s.id], 116, s.warna)}${buka ? '' : `<span class="gembok">${I('kunci', 34, 2.6)}</span>`}
          <div class="label-simpul"><b>${s.no}</b> ${s.singkat}</div></div>`; }).join('')}
      ${aktif >= 0 ? (() => { const [x, y] = TITIK[aktif], kanan = x < 420; return `<div class="abs penanda-saya goyang" style="left:${kanan ? x + 78 : x - 205}px;top:${y - 205}px">${pic(ASET.gambar.avatar[S.avatar], wajah(null, 110, WARNA_AV[S.avatar]), 'width:120px;height:180px')}<div class="papan-nama">${S.nama || 'Kamu'}</div></div>`; })() : ''}
      <div class="paspor-mini">${I('paspor', 40)}<b>Paspor</b>${ST.map(s => `<div class="cap ${S.stempel[s.id] ? 'ada' : ''}" style="--w:${s.warna}">${S.stempel[s.id] ? I('centang', 30, 3.4) : ''}<span>${s.singkat}</span></div>`).join('')}</div>`;
    { const im = new Image(); im.onerror = () => { const j = $('#jalan-cad', r); if (j) j.style.display = 'block'; }; im.src = ASET.gambar.latarPetaMisi; }
    $$('[data-st]', r).forEach(el => el.onclick = () => {
      const i = +el.dataset.st;
      if (!stasiunTerbuka(i)) { Suara.efek('salah'); umpan('no', `Selesaikan stasiun <b>${ST[i - 1].singkat}</b> dulu, ya!`); return; }
      Suara.efek('halaman'); ke('stasiun', ST[i].id);
    });
    $$('[data-bagian]', r).forEach(el => el.onclick = () => {
      const b = BAGIAN[+el.dataset.bagian];
      if (!bagianTerbuka(b)) { Suara.efek('salah'); umpan('no', `${b.syarat}, ya!`); return; }
      Suara.efek('halaman'); ke(b.ke);
    });
    // ucapan saat semua stempel baru lengkap
    if (jmlStempel() === 6 && !S.ucapan6) {
      S.ucapan6 = true; simpan();
      setTimeout(() => { Suara.efek('buka'); konfeti(); jendela(`<div style="text-align:center"><div style="color:#E0A400">${I('piala', 130, 1.8)}</div><h2>Paspormu lengkap!</h2><div style="font-size:36px">Kamu sudah mewawancarai pemimpin dari <b>RT sampai Provinsi</b>.<br><b>Bengkel Konsep</b> sekarang terbuka!</div><button class="btn kuning" data-aksi="tutup" style="margin-top:36px;width:400px">Asyik!</button></div>`, 1100); }, 500);
    }
  };

  /* ======================= LAYAR: STASIUN ======================= */
  const LANGKAH = ['Dialog', 'Wawancara', 'Aktivitas', 'Teka-teki', 'Stempel'];
  LAYAR.stasiun = (r, id) => {
    const s = ST.find(x => x.id === id), iSt = ST.indexOf(s);
    S.buku[id] = S.buku[id] || {}; const catat = S.buku[id];
    r.innerHTML = latar(s.latar, s.gambarLatar) + bar(`Stasiun ${s.no} · ${s.nama}`, { kembali: ['Peta', 'petamisi'] }) + `<div class="langkah" id="langkah"></div><div class="abs" id="isi" style="inset:0"></div>`;
    const isiEl = $('#isi', r);
    const tandai = n => { $$('.umpan', stage).forEach(e => e.remove()); clearTimeout(umpanTimer); $('#langkah', r).innerHTML = LANGKAH.map((l, i) => `<span class="${i === n ? 'on' : i < n ? 'selesai' : ''}">${i < n ? I('centang', 22, 3.4) + ' ' : ''}${l}</span>`).join(''); };
    const tokohPemimpin = (gaya, ekstra = 'goyang') => tokoh(s.gambarTokoh, s.emoji, s.warna, `${s.sapaan}`, gaya, ekstra);

    /* 1. dialog */
    function dialog() {
      tandai(0); let i = 0;
      isiEl.innerHTML = avatarSaya(pos(110, 400, 340, 470), 'goyang') + tokohPemimpin(pos(1440, 250, 420, 620)) + `
        <div class="balon ekor-kanan" id="balon" style="left:500px;top:250px;width:870px;min-height:260px"><div class="nama-tokoh">${s.pemimpin}</div><div id="teks"></div>
          <button class="btn-ikon abs" id="b-narasi" style="right:20px;bottom:16px;display:none;width:70px;height:64px">${I('suara', 36)}</button></div>
        <div class="kata-penting abs" id="kp" style="left:500px;top:620px;width:870px;display:none"><span class="lbl">${I('pin', 30)} Kata Penting · ${s.kataPenting.istilah}</span><br>${s.kataPenting.arti}</div>
        <button class="btn hijau abs" id="b-lanjut" style="${pos(1460, 956, 400, 100)}">${LANJUT()}</button>`;
      let lewati = null;
      function tampil() {
        const d = s.dialog[i]; Suara.efek('pop');
        const nb = $('#b-narasi', isiEl); nb.style.display = 'none';
        Suara.cekNarasi(d.kode, main => { nb.style.display = 'flex'; nb.onclick = e => { e.stopPropagation(); main(); }; });
        lewati = ketik($('#teks', isiEl), isi(d.teks), () => { lewati = null; });
        if (i === s.dialog.length - 1) { $('#kp', isiEl).style.display = 'block'; }
      }
      $('#balon', isiEl).onclick = () => lewati && lewati();
      $('#b-lanjut', isiEl).onclick = () => {
        if (lewati) { lewati(); return; }
        if (i < s.dialog.length - 1) { i++; tampil(); } else wawancara();
      };
      tampil();
    }

    /* 2. wawancara */
    function wawancara() {
      tandai(1); Suara.hentiNarasi();
      const semua = () => s.wawancara.every((w, k) => catat[k]);
      function gambar() {
        isiEl.innerHTML = `
          <div class="abs panel" style="${pos(60, 200, 640, 850)};background:#FFFBEF;padding:34px 38px;border:6px solid #F2D27A">
            <div style="font-size:40px;font-weight:700;display:flex;align-items:center;gap:12px">${I('buku', 44)} Buku Liputan</div><div style="font-size:30px;color:var(--abu);margin-bottom:14px">${s.nama}</div>
            ${s.wawancara.map((w, k) => `<div style="display:flex;gap:16px;margin:18px 0;font-size:29px;line-height:1.3"><span class="cek-kotak ${catat[k] ? 'ok' : ''}">${catat[k] ? I('centang', 26, 3.6) : ''}</span><div><b>${w.catat[0]}:</b><br>${catat[k] ? w.catat[1] : '<span style="color:#B7B4CC">…</span>'}</div></div>`).join('')}
            ${catat.bonus ? `<div style="font-size:26px;margin-top:10px;color:#9A6B00;display:flex;align-items:center;gap:8px">${I('bintang', 30)} Fakta unik sudah dicatat!</div>` : ''}
          </div>
          <div class="abs plakat" style="left:760px;top:200px;padding:10px 30px;flex-direction:row;align-items:center;gap:14px;font-size:38px;font-weight:700;color:var(--biru-tua)">${I('mik', 42)} Pilih pertanyaan untuk ${s.pemimpin}:</div>
          ${s.wawancara.map((w, k) => `<button class="pilih kiri ${catat[k] ? 'benar' : ''}" data-w="${k}" style="${pos(760, 300 + k * 165, 1100, 136)}"><span class="huruf">${catat[k] ? I('centang', 34, 3.4) : '?'}</span>${w.tanya}</button>`).join('')}
          <button class="pilih kiri" data-w="bonus" style="${pos(760, 806, 600, 110)};background:#FFF4CC;font-size:32px"><span class="huruf" style="background:var(--kuning);color:#7A5600">${I('bintang', 34)}</span>Bonus: ${s.bonus.tanya}</button>
          <button class="btn hijau abs ${semua() ? 'denyut' : 'mati'}" id="b-lanjut" style="${pos(1400, 956, 460, 100)}">${LANJUT()}</button>`;
        $$('[data-w]', isiEl).forEach(b => b.onclick = () => {
          const k = b.dataset.w, w = k === 'bonus' ? s.bonus : s.wawancara[+k];
          Suara.efek('pop');
          const t = jendela(`<div style="display:flex;gap:36px;align-items:flex-start">
              ${tokohPemimpin('position:relative;width:240px;height:360px;flex:none;margin-bottom:40px', '')}
              <div style="flex:1"><div style="font-size:30px;color:var(--abu);display:flex;align-items:center;gap:10px">${I('mik', 34)} ${w.tanya}</div><div class="balon" id="jw" style="position:relative;margin-top:20px;font-size:38px;min-height:200px"></div></div></div>
              <div style="display:flex;justify-content:space-between;margin-top:10px"><button class="btn-ikon" id="b-narasi" style="display:none">${I('suara', 36)}</button><span></span>
              <button class="btn hijau" data-aksi="tutup" style="width:360px">${I('centang', 36, 3.2)} Dicatat!</button></div>`, 1400);
          const lw = ketik($('#jw', t), w.jawab); $('#jw', t).onclick = lw;
          Suara.cekNarasi(w.kode, main => { const nb = $('#b-narasi', t); nb.style.display = 'flex'; nb.onclick = main; });
          $('[data-aksi="tutup"]', t).addEventListener('click', () => {
            Suara.hentiNarasi();
            const baru = !catat[k]; catat[k] = true; simpan();
            if (baru) Suara.efek('benar');
            gambar();
          });
        });
        $('#b-lanjut', isiEl).onclick = () => { if (!semua()) { umpan('no', 'Ajukan ketiga pertanyaan dulu, ya! Pertanyaan bonus boleh dilewati.'); return; } aktivitas(); };
      }
      gambar();
    }

    /* 3. aktivitas */
    function aktivitas() {
      tandai(2); const a = s.aktivitas;
      isiEl.innerHTML = `<div class="abs" style="${pos(40, 190, 1840, 870)};background:rgba(255,255,255,.82);border-radius:40px"></div>
        <div class="balon abs" style="${pos(80, 205, 1760, 120)};padding:30px 40px 12px;font-size:32px;display:flex;align-items:center;justify-content:center;text-align:center"><div class="nama-tokoh">${a.judul}</div>${isi(a.instruksi)}</div>
        <button class="btn hijau abs" id="b-lanjut" style="${pos(1460, 956, 400, 100)};display:none">${LANJUT()}</button>`;
      const selesai = pesan => { konfeti(40); Suara.efek('konfeti'); if (pesan) umpan('ok', pesan, 4500); const b = $('#b-lanjut', isiEl); b.style.display = 'flex'; b.classList.add('denyut'); };
      $('#b-lanjut', isiEl).onclick = tekateki;
      if (a.jenis === 'sortir' || a.jenis === 'sortirDaerah') {
        let kartu = a.kartu;
        if (a.jenis === 'sortirDaerah') {
          const p = infoProv(S.prov) || infoProv('32');
          const kab = acak(p.daftar.filter(([, v]) => !/^Kota /.test(v.nama))), kota = acak(p.daftar.filter(([, v]) => /^Kota /.test(v.nama)));
          const nKota = Math.min(3, kota.length), nKab = Math.min(6 - nKota, kab.length);
          const kartuDaerah = ([k, v], ke) => ({ teks: `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${logo(k, 'width:64px;height:72px')}<span>${v.nama}</span></div>`, ke });
          kartu = kab.slice(0, nKab).map(x => kartuDaerah(x, 0)).concat(kota.slice(0, nKota).map(x => kartuDaerah(x, 1)));
        }
        const n = kartu.length, lebar = (1760 - (n - 1) * 20) / n;
        const kotak = a.jenis === 'sortirDaerah' ? [wajahJab('Bupati', 66, '#FFD166') + ' ' + a.kotak[0], wajahJab('Wali Kota', 66, '#8FD3FF') + ' ' + a.kotak[1]] : a.kotak.map((t, i) => `<span style="color:${i ? 'var(--merah-tua)' : 'var(--hijau-tua)'}">${I(i ? 'tutup' : 'centang', 40, 3.2)}</span> ${t}`);
        mesinSortir(isiEl, { kotak, zona: [[80, 520, 860, 420], [980, 520, 860, 420]], kartu, kepala: 90, tinggi: a.jenis === 'sortirDaerah' ? 150 : 92, kolom: a.jenis === 'sortirDaerah' ? 3 : 2, font: n > 5 ? 27 : 30, fontIsi: 26,
          posKartu: i => [80 + i * (lebar + 20), 335, lebar, a.jenis === 'sortirDaerah' ? 165 : 145], onSelesai: () => selesai(a.jenis === 'sortirDaerah' ? 'Hebat! <b>Kabupaten</b> dipimpin Bupati, <b>kota</b> dipimpin Wali Kota.' : 'Hebat! Semua kartu sudah di tempat yang tepat.') });
      }
      if (a.jenis === 'urut') {
        const n = a.kartu.length, w = 400, gap = (1760 - n * w) / (n - 1);
        mesinUrut(isiEl, { kartu: a.kartu, slot: a.slot.map((l, i) => [80 + i * (w + gap), 640, w, 170, l]),
          posKartu: i => [80 + i * (w + gap) + 10, 380, w - 20, 150], font: 30,
          onSelesai: () => selesai(a.penjelasan) });
        isiEl.insertAdjacentHTML('beforeend', a.slot.slice(0, -1).map((l, i) => `<div class="abs" style="left:${80 + (i + 1) * (w + gap) - gap / 2 - 24}px;top:695px;color:var(--abu)">${I('lanjut', 56, 3)}</div>`).join(''));
      }
      if (a.jenis === 'cocok') mesinCocok(isiEl, { pasangan: a.pasangan, onSelesai: () => selesai('Hebat! Kamu sudah mengenal pemimpin dari RT sampai kecamatan.') });
      if (a.jenis === 'jelajah') {
        const dilihat = new Set();
        isiEl.insertAdjacentHTML('beforeend', a.gedung.map((g, i) => `<button class="pilih" data-g="${i}" style="${pos(140 + (i % 3) * 560, 350 + Math.floor(i / 3) * 290, 520, 266)};flex-direction:column;gap:10px;padding:14px">${pic(ASET.gambar.gedung[g.gambar], `<div style="color:var(--biru)">${I(g.ikon, 96, 1.6)}</div>`, 'width:100%;height:170px;flex:none', 'tutup kotak-gambar')}${g.nama}</button>`).join(''));
        $$('[data-g]', isiEl).forEach(b => b.onclick = () => {
          const g = a.gedung[+b.dataset.g]; Suara.efek('pop');
          jendela(`<div style="display:flex;gap:36px;align-items:center">${pic(ASET.gambar.gedung[g.gambar], `<div style="color:var(--biru)">${I(g.ikon, 150, 1.5)}</div>`, 'width:420px;height:260px;flex:none', 'tutup kotak-gambar')}<div><h2>${g.nama}</h2><div style="font-size:36px">${g.info}</div></div></div><div style="text-align:right;margin-top:30px"><button class="btn hijau" data-aksi="tutup" style="width:320px">Oke!</button></div>`, 1400);
          b.classList.add('benar'); dilihat.add(b.dataset.g);
          if (dilihat.size === a.gedung.length) setTimeout(() => selesai('Hebat! Bupati dibantu <b>dinas-dinas</b> dan bekerja sama dengan <b>DPRD</b>.'), 400);
        });
      }
    }

    /* 4. teka-teki penghubung */
    function tekateki() {
      tandai(3); const t = s.tekateki;
      isiEl.innerHTML = tokohPemimpin(pos(60, 160, 210, 300), '') + `
        <div class="balon ekor-kiri" style="${pos(330, 200, 1530, 230)};display:flex;align-items:center"><div class="nama-tokoh">${s.pemimpin}</div><div>${t.tanya}</div></div>
        ${t.pilihan.map((p, i) => `<button class="pilih" data-p="${i}" style="${pos(160 + i * 550, 500, 500, 390)};flex-direction:column;gap:6px;padding:14px">${badanJab(p.teks, 'width:100%;height:290px;flex:none')}<span style="font-size:42px">${p.teks}</span></button>`).join('')}`;
      Suara.cekNarasi(t.kode, () => {});
      $$('[data-p]', isiEl).forEach(b => b.onclick = () => {
        const p = t.pilihan[+b.dataset.p];
        if (p.benar) {
          b.classList.add('benar'); Suara.efek('benar'); konfeti(50);
          umpan('ok', `Tepat! Selanjutnya kamu akan menemui <b>${p.teks}</b>.`, 1800);
          setTimeout(stempel, 1500);
        } else { b.classList.add('salah', 'redup'); Suara.efek('salah'); umpan('no', p.umpan, 4000); }
      });
    }

    /* 5. stempel */
    function stempel() {
      tandai(4);
      const baru = !S.stempel[id]; S.stempel[id] = true; simpan();
      isiEl.innerHTML = `<div class="abs" style="inset:0;background:rgba(20,24,60,.45);z-index:30"></div>
        <div class="abs" style="${pos(390, 140, 1140, 790)};background:#7A3E9D;border-radius:46px;box-shadow:0 16px 0 #5B2A78;z-index:31;padding:30px">
          <div style="background:#FFF7E3;border-radius:30px;height:100%;padding:30px;position:relative">
            <div style="text-align:center;font-size:48px;font-weight:700;color:#7A3E9D;display:flex;align-items:center;justify-content:center;gap:14px">${I('paspor', 54)} PASPOR WARGA CILIK</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px 40px;padding:30px 80px">
              ${ST.map(x => `<div style="height:190px;border-radius:50%;aspect-ratio:1;margin:auto;display:flex;align-items:center;justify-content:center;text-align:center;font-size:28px;font-weight:700;flex-direction:column;gap:4px;
                ${S.stempel[x.id] ? `background:${x.warna};color:#fff;border:8px solid #fff;box-shadow:0 0 0 6px ${x.warna};${x.id === id ? 'animation:cap .6s cubic-bezier(.3,1.6,.5,1) both;' : 'transform:rotate(-8deg);'}` : 'border:5px dashed #C9B6D8;color:#B9A6C8'}" >${S.stempel[x.id] ? wajahJab(JAB_ST[x.id], 104, '#fff') + '<span>' + x.singkat + '</span>' : x.singkat}</div>`).join('')}
            </div>
            <div class="balon" style="position:relative;font-size:36px;text-align:center;padding:24px 30px">${s.kunci}</div>
          </div></div>
        <button class="btn kuning abs denyut" id="b-kembali" style="${pos(660, 960, 600, 100)};z-index:32">${iSt < 5 ? LANJUT('Kembali ke Peta Misi') : I('piala', 40) + ' Lihat Peta Misi'}</button>
        <style>@keyframes cap{from{transform:scale(3) rotate(20deg);opacity:0}to{transform:scale(1) rotate(-8deg);opacity:1}}</style>`;
      setTimeout(() => { Suara.efek('stempel'); if (baru) setTimeout(() => { Suara.efek('konfeti'); konfeti(); }, 300); }, 350);
      $('#b-kembali', isiEl).onclick = () => ke('petamisi');
    }
    dialog();
  };

  /* ---------- ekspor untuk modul lain ---------- */
  window.App = { $, $$, ke, LAYAR, logo, I, wajah, wajahJab, badanJab, srcJab, JAB_ST, LANJUT, tombolSudut, get S() { return S; }, simpan, hapusProgres, pos, pic, tokoh, avatarSaya, bar, latar, konfeti, umpan, jendela, acak, seret, di,
    mesinSortir, mesinUrut, mesinCocok, ketik, infoProv, isi, BAGIAN, bagianTerbuka, jmlStempel, AVATAR, WARNA_AV, get SKALA() { return SKALA; }, stage, layarPenuh,
    get kini() { return kini; } };

  addEventListener('DOMContentLoaded', () => {
    Suara.setEfek(S.efek);
    if (!S.musik) Suara.setMusik(false);
    // tautan langsung, mis. index.html#layar=nusantara atau #layar=provinsi&arg=32
    const h = new URLSearchParams(location.hash.slice(1));
    if (h.get('layar') && LAYAR[h.get('layar')]) ke(h.get('layar'), h.get('arg') || undefined);
    else ke('pembuka');
  });
})();
