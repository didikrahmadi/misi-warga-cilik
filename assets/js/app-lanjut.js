/* ===================== Bengkel, Arena, Latihan, Refleksi, Buku, Guru, Pengaturan ===================== */
(function () {
  const A = window.App, { $, $$, pos, pic, bar, latar, konfeti, umpan, jendela, acak, ke, LAYAR, I, wajahJab, badanJab, srcJab, LANJUT } = A;
  const G = ASET.gambar, BG_KUIS = () => latar('polos', G.latarMenu, .35);
  const BINTANG = n => `<span class="bintang-teks">${'★'.repeat(n)}<span style="color:#D9D6E8">${'★'.repeat(3 - n)}</span></span>`;
  const M = MATERI;

  /* ======================= BENGKEL KONSEP ======================= */
  LAYAR.bengkel = r => {
    const S = A.S;
    r.innerHTML = latar('kantor', G.gedung.kecamatan, .3) + bar('Bengkel Konsep', { ikon: 'bengkel', kembali: ['Peta', 'petamisi'], pil: `${M.bengkel.filter(b => S.bengkel[b.id]).length}/4 selesai` }) +
      M.bengkel.map((b, i) => `<button class="abs panel" data-b="${b.id}" style="${pos(120 + (i % 2) * 860, 150 + Math.floor(i / 2) * 460, 820, 420)};border:${S.bengkel[b.id] ? '8px solid var(--hijau)' : '0'};cursor:pointer;font-family:inherit;color:inherit;padding:24px">
        ${b.gambar ? pic(G.gedung[b.gambar], `<div style="color:var(--biru)">${I(b.ikon, 120, 1.6)}</div>`, 'width:100%;height:210px;margin-bottom:10px', 'tutup kotak-gambar') : `<div style="color:var(--biru);height:210px;display:flex;align-items:center;justify-content:center">${I(b.ikon, 150, 1.6)}</div>`}<div style="font-size:50px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px">${b.judul}${S.bengkel[b.id] ? `<span style="color:var(--hijau)">${I('centang', 44, 3.4)}</span>` : ''}</div><div style="font-size:32px;color:var(--abu)">${b.sub}</div></button>`).join('');
    $$('[data-b]', r).forEach(b => b.onclick = () => ke('bengkelItem', b.dataset.b));
  };

  function bengkelBeres(id, pesan) {
    const S = A.S, baru = !S.bengkel[id]; S.bengkel[id] = true; A.simpan();
    konfeti(); A.umpan('ok', pesan, 0);
    const semua = M.bengkel.every(b => S.bengkel[b.id]);
    const tombol = `<div class="abs" style="right:60px;bottom:30px;display:flex;gap:24px;z-index:45">
      <button class="btn putih" data-ke="bengkel">${I('kembali', 36, 2.8)} Bengkel</button>${semua && baru ? `<button class="btn kuning denyut" data-ke="arena">${I('arena', 40)} ${LANJUT('Arena terbuka!')}</button>` : ''}</div>`;
    A.layarAktif().insertAdjacentHTML('beforeend', tombol);
    $$('.umpan').forEach(u => { u.style.right = semua && baru ? '760px' : '480px'; u.style.left = '60px'; });
    if (semua && baru) Suara.efek('buka');
  }

  LAYAR.bengkelItem = (r, id) => {
    const b = M.bengkel.find(x => x.id === id);
    r.innerHTML = latar('kantor', G.gedung.kecamatan) + bar(b.judul, { ikon: b.ikon, kembali: ['Bengkel', 'bengkel'], pil: id === 'tangga' ? 'Tahap 1/2' : '' }) +
      `<div class="abs" style="${pos(30, 128, 1860, 940)};background:rgba(255,255,255,.85);border-radius:40px"></div><div class="abs" id="w" style="inset:0"></div>`;
    const w = $('#w', r);
    if (id === 'tangga') {
      const tahap = n => {
        const t = b.tahap[n]; w.innerHTML = `<div class="abs" style="left:70px;top:145px;font-size:36px;width:1500px">${t.instruksi}</div>`;
        const pil = $('#bar-pil'); if (pil) pil.textContent = `Tahap ${n + 1}/2`;
        const slot = [];
        b.tahap[0].kartu.forEach((wil, i) => {
          const x = 560 + i * 110, y = 230 + i * 128;
          if (n === 0) slot.push([x, y, 400, 112, i === 0 ? 'Tingkat 1 · terbesar' : i === 5 ? 'Tingkat 6 · terkecil' : 'Tingkat ' + (i + 1)]);
          else { w.insertAdjacentHTML('beforeend', `<div class="kartu benar" style="${pos(x, y + 6, 330, 100)};cursor:default">${wil}</div>`); slot.push([x + 345, y, 400, 112, '?']); }
        });
        w.insertAdjacentHTML('beforeend', `<div class="abs penunjuk-arah" style="left:${n === 0 ? 990 : 1350}px;top:215px"><span style="transform:rotate(-90deg);display:inline-flex">${I('lanjut', 40, 3)}</span> besar</div><div class="abs penunjuk-arah" style="left:${n === 0 ? 1530 : 1500}px;top:${n === 0 ? 905 : 975}px"><span style="transform:rotate(90deg);display:inline-flex">${I('lanjut', 40, 3)}</span> kecil</div>`);
        A.mesinUrut(w, { kartu: t.kartu, slot, posKartu: i => [70, 230 + i * 116, 430, 100], font: 30,
          onSelesai: () => {
            if (n === 0) { Suara.efek('konfeti'); konfeti(40); umpan('ok', 'Hebat! Urutan wilayah sudah benar. Lanjut ke tahap 2!', 2200); setTimeout(() => tahap(1), 2300); }
            else bengkelBeres('tangga', 'Luar biasa! Kamu sudah hafal <b>tangga wilayah</b> dan <b>pemimpinnya</b>.');
          } });
      };
      tahap(0);
    } else {
      const n = b.kartu.length, tinggi = Math.min(110, (880 - (n - 1) * 12) / n);
      w.innerHTML = `<div class="abs" style="left:810px;top:140px;width:300px;text-align:center;font-size:26px;color:var(--abu)">Seret ke kiri atau kanan</div>`;
      A.mesinSortir(w, { kotak: b.kotak.map((t, i) => b.kotakIkon ? `${I(b.kotakIkon[i], 46, 2.2)} ${t}` : t), zona: [[60, 150, 720, 900], [1140, 150, 720, 900]], kartu: b.kartu, kepala: 110, tinggi: 104, font: 24, fontIsi: 25,
        posKartu: i => [810, 190 + i * (tinggi + 12), 300, tinggi],
        onSelesai: () => bengkelBeres(id, b.sama) });
    }
  };

  /* ======================= ARENA TEKA-TEKI ======================= */
  let ARENA = null;
  LAYAR.arena = r => {
    r.innerHTML = BG_KUIS() + bar('Arena Teka-teki', { ikon: 'arena', kembali: ['Peta', 'petamisi'] });
    const S = A.S;
    const t = jendela(`<div style="text-align:center"><div style="color:var(--ungu)">${I('arena', 110, 1.8)}</div><h2>Arena Teka-teki</h2>
      <div style="font-size:34px">Ada 2 permainan: <b>Aku Siapa?</b> dan <b>Ke Mana Aku Harus Pergi?</b><br>Mau bermain bagaimana?</div>
      <div style="display:flex;gap:30px;justify-content:center;margin-top:40px">
        <button class="btn" data-m="sendiri" style="width:420px">${I('sendiri', 44)} Main Sendiri</button>
        <button class="btn oranye" data-m="tim" style="width:620px">${I('tim', 44)} Main Tim (Merah vs Biru)</button></div>
      <div style="margin-top:30px;font-size:28px;color:var(--abu)">Langsung ke: <span class="chip" data-m2="siapa">Aku Siapa? ${S.arena.siapa ? I('centang', 26, 3.4) : ''}</span> <span class="chip" data-m2="kemana">Ke Mana? ${S.arena.kemana ? I('centang', 26, 3.4) : ''}</span></div></div>`, 1300);
    let mode = null;
    $$('[data-m]', t).forEach(b => b.onclick = () => { mode = b.dataset.m; ARENA = { tim: mode === 'tim', skor: [0, 0], ronde: 0 }; t.remove(); ke('akuSiapa'); });
    $$('[data-m2]', t).forEach(b => b.onclick = () => { ARENA = { tim: false, skor: [0, 0], ronde: 0 }; t.remove(); ke(b.dataset.m2 === 'siapa' ? 'akuSiapa' : 'kemana'); });
  };
  const papanSkor = () => ARENA.tim ? `<span style="color:#E5484D"><i class="titik-tim" style="background:#E5484D"></i>Merah ${ARENA.skor[0]}</span>&nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:#2F6BFF"><i class="titik-tim" style="background:#2F6BFF"></i>Biru ${ARENA.skor[1]}</span>` : `<span class="bintang-teks">★</span> ${ARENA.skor[0]}`;
  const giliran = i => ARENA.tim ? (i % 2 === 0 ? '<b class="plakat-kecil" style="color:#E5484D"><i class="titik-tim" style="background:#E5484D"></i>Giliran Tim Merah</b>' : '<b class="plakat-kecil" style="color:#2F6BFF"><i class="titik-tim" style="background:#2F6BFF"></i>Giliran Tim Biru</b>') : '';

  LAYAR.akuSiapa = (r, arg) => {
    if (!ARENA) ARENA = { tim: false, skor: [0, 0], ronde: 0 };
    const i = +(arg || 0), soal = M.akuSiapa[i];
    let buka = 1, bintang = 3, selesai = false;
    r.innerHTML = BG_KUIS() + bar('Aku Siapa?', { ikon: 'arena', kembali: ['Peta', 'petamisi'], pil: `Ronde ${i + 1}/${M.akuSiapa.length}` }) + `
      <div class="abs panel" id="siluet" style="${pos(80, 150, 600, 760)};display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(#F1EEFF,#DCD7FB)">
        <div id="sil" class="siluet" style="width:440px;height:560px">${badanJab(soal.jawab, 'width:100%;height:100%')}</div><div id="sil-nama" style="font-size:54px;color:var(--teks);font-weight:700;margin-top:10px">? ? ?</div></div>
      <div class="abs" style="left:80px;top:940px;width:600px;text-align:center;font-size:32px">${giliran(i)}</div>
      <div class="abs" id="petunjuk" style="${pos(740, 150, 1110, 450)}"></div>
      ${soal.pilihan.map((p, k) => `<button class="pilih" data-j="${k}" style="${pos(740 + k * 282, 630, 262, 150)};font-size:34px">${p}</button>`).join('')}
      <div class="abs panel" style="${pos(740, 820, 520, 100)};display:flex;align-items:center;justify-content:center;font-size:44px;color:#F2A900" id="bintang"></div>
      <div class="abs panel" style="${pos(1290, 820, 560, 100)};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700" id="skor">${papanSkor()}</div>
      <button class="btn hijau abs" id="b-lanjut" style="${pos(1290, 950, 560, 100)};display:none">${LANJUT(i < M.akuSiapa.length - 1 ? 'Ronde berikutnya' : 'Lanjut: Ke Mana?')}</button>`;
    function gambarPetunjuk() {
      $('#petunjuk', r).innerHTML = soal.petunjuk.map((p, k) => k < buka
        ? `<div class="kartu-info" style="position:relative;padding:22px 32px;margin-bottom:18px;font-size:32px"><b>Petunjuk ${k + 1}:</b> ${p}</div>`
        : `<button class="btn putih" data-buka="${k}" style="width:100%;margin-bottom:18px;min-height:110px;font-size:30px;${k === buka ? '' : 'opacity:.5'}">${I('kunci', 36)} Sentuh untuk membuka Petunjuk ${k + 1} <span style="font-size:24px;opacity:.7">(−1 ★)</span></button>`).join('');
      $('#bintang', r).innerHTML = BINTANG(bintang);
      $$('[data-buka]', r).forEach(b => b.onclick = () => { if (selesai || +b.dataset.buka !== buka) return; buka++; bintang = Math.max(1, bintang - 1); Suara.efek('pop'); gambarPetunjuk(); });
    }
    gambarPetunjuk();
    $$('[data-j]', r).forEach(b => b.onclick = () => {
      if (selesai) return;
      const p = soal.pilihan[+b.dataset.j];
      if (p === soal.jawab) {
        selesai = true; b.classList.add('benar'); Suara.efek('benar'); konfeti(50);
        $('#sil', r).classList.add('terungkap'); $('#sil-nama', r).textContent = soal.jawab;
        buka = 3; gambarPetunjuk();
        ARENA.skor[ARENA.tim ? i % 2 : 0] += bintang; $('#skor', r).innerHTML = papanSkor();
        umpan('ok', `Tepat! Aku adalah <b>${soal.jawab}</b>. +${bintang} bintang`, 2500);
        $('#b-lanjut', r).style.display = 'flex';
      } else {
        b.classList.add('salah', 'redup'); Suara.efek('salah'); bintang = Math.max(0, bintang - 1); $('#bintang', r).innerHTML = BINTANG(bintang);
        umpan('no', `Bukan ${p}. Baca petunjuknya lagi${buka < 3 ? ' atau buka petunjuk berikutnya' : ''}!`, 2400);
      }
    });
    $('#b-lanjut', r).onclick = () => {
      if (i < M.akuSiapa.length - 1) ke('akuSiapa', i + 1);
      else { A.S.arena.siapa = true; A.simpan(); ke('kemana', 0); }
    };
  };

  LAYAR.kemana = (r, arg) => {
    if (!ARENA) ARENA = { tim: false, skor: [0, 0], ronde: 0 };
    const i = +(arg || 0), s = M.kemana.situasi[i], P = M.kemana.pintu;
    let dijawab = false;
    r.innerHTML = BG_KUIS() + bar('Ke Mana Aku Harus Pergi?', { ikon: 'arena', kembali: ['Peta', 'petamisi'], pil: `Situasi ${i + 1}/${M.kemana.situasi.length}` }) + `
      <div class="abs kartu-info" style="${pos(160, 150, 1600, 330)};display:flex;gap:40px;align-items:center">
        ${pic(s.gambar, `<div style="color:var(--oranye)">${I(s.ikon, 170, 1.5)}</div>`, 'width:280px;height:260px;flex:none', 'tutup kotak-gambar')}<div style="font-size:40px;line-height:1.35">${s.teks}</div></div>
      <div class="abs" style="left:160px;top:494px;font-size:30px">${giliran(i)}</div>
      ${P.map((p, k) => `<button class="pilih" data-k="${k}" style="${pos(95 + k * 350, 556, 330, 336)};flex-direction:column;gap:10px;font-size:30px;padding:12px">${pic(G.gedung[p.gambar], `<div style="color:var(--biru)">${I(p.ikon, 100, 1.6)}</div>`, 'width:100%;height:180px;flex:none', 'tutup kotak-gambar')}${p.teks}</button>`).join('')}
      <div class="abs panel" style="${pos(95, 920, 700, 110)};display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:700" id="skor">${papanSkor()}</div>
      <button class="btn hijau abs" id="b-lanjut" style="${pos(1260, 920, 570, 110)};display:none">${i < M.kemana.situasi.length - 1 ? LANJUT('Situasi berikutnya') : I('piala', 40) + ' Lihat hasil'}</button>`;
    $$('[data-k]', r).forEach(b => b.onclick = () => {
      if (dijawab) return; dijawab = true;
      const k = +b.dataset.k, benar = k === s.benar;
      $$('[data-k]', r).forEach(x => { if (+x.dataset.k === s.benar) x.classList.add('benar'); else if (x !== b) x.classList.add('redup'); });
      if (benar) { Suara.efek('benar'); konfeti(40); ARENA.skor[ARENA.tim ? i % 2 : 0] += 1; $('#skor', r).innerHTML = papanSkor(); }
      else { b.classList.add('salah'); Suara.efek('salah'); }
      umpan(benar ? 'ok' : 'no', (benar ? 'Tepat! ' : 'Belum tepat. ') + s.bahas, 0).style.cssText += ';bottom:150px';
      $('#b-lanjut', r).style.display = 'flex';
    });
    $('#b-lanjut', r).onclick = () => {
      if (i < M.kemana.situasi.length - 1) { ke('kemana', i + 1); return; }
      const S = A.S; S.arena.kemana = true; S.arena.skor = ARENA.skor.slice(); A.simpan();
      Suara.efek('konfeti'); konfeti(100);
      const menang = ARENA.tim ? (ARENA.skor[0] === ARENA.skor[1] ? 'Seri! Kedua tim hebat!' : (ARENA.skor[0] > ARENA.skor[1] ? 'Tim Merah menang!' : 'Tim Biru menang!')) : `Kamu mengumpulkan ${ARENA.skor[0]} bintang!`;
      jendela(`<div style="text-align:center"><div style="color:#E0A400">${I('piala', 130, 1.8)}</div><h2>Arena selesai!</h2><div style="font-size:44px;font-weight:700">${papanSkor()}</div><div style="font-size:38px;margin-top:16px">${menang}</div>
        <div style="font-size:30px;color:var(--abu);margin-top:16px">${A.S.arena.siapa ? '<b>Latihan Soal</b> sekarang terbuka.' : 'Mainkan juga “Aku Siapa?” untuk membuka Latihan Soal.'}</div>
        <div style="display:flex;gap:24px;justify-content:center;margin-top:36px"><button class="btn putih" data-ke="petamisi">Peta Misi</button>${A.S.arena.siapa ? `<button class="btn kuning denyut" data-ke="latihan">${I('latihan', 40)} ${LANJUT('Latihan Soal')}</button>` : `<button class="btn kuning" data-ke="akuSiapa">${LANJUT('Aku Siapa?')}</button>`}</div></div>`, 1200);
    };
  };

  /* ======================= LATIHAN SOAL ======================= */
  LAYAR.latihan = (r, arg) => {
    const S = A.S;
    if (!S.latihan || arg === 'ulang' || arg === 'baru') {
      const daftar = arg === 'ulang' && S.latihan ? S.latihan.jawab.map((j, k) => j && j.benar ? -1 : k).filter(k => k >= 0) : M.latihan.map((_, k) => k);
      S.latihan = { daftar, i: 0, jawab: arg === 'ulang' && S.latihan ? S.latihan.jawab : [], selesai: S.latihan ? S.latihan.selesai : false, ulang: arg === 'ulang' };
      A.simpan();
    }
    const L = S.latihan;
    if (L.i >= L.daftar.length) { ke('hasil'); return; }
    const no = L.daftar[L.i], q = M.latihan[no];
    const opsi = q.jenis === 'bs' ? [I('centang', 60, 3.2) + ' Benar', I('tutup', 60, 3.2) + ' Salah'] : q.pilihan;
    r.innerHTML = BG_KUIS() + bar('Latihan Soal', { ikon: 'latihan', kembali: ['Peta', 'petamisi'], pil: `Soal ${L.i + 1}/${L.daftar.length}` }) + `
      <div class="abs" style="${pos(120, 128, 1680, 22)};background:#fff;border-radius:20px;overflow:hidden"><div style="height:100%;width:${(L.i / L.daftar.length) * 100}%;background:var(--hijau)"></div></div>
      <div class="abs kartu-info" style="${pos(120, 170, 1680, 210)};display:flex;align-items:center;font-size:46px;line-height:1.3"><div>${q.jenis === 'bs' ? '<span style="font-size:30px;color:var(--abu)">Benar atau salah?</span><br>' : ''}${q.tanya}</div></div>
      ${opsi.map((o, k) => q.jenis === 'bs'
        ? `<button class="pilih" data-o="${k}" style="${pos(240 + k * 760, 420, 680, 240)};font-size:60px">${o}</button>`
        : `<button class="pilih kiri" data-o="${k}" style="${pos(120 + (k % 2) * 860, 410 + Math.floor(k / 2) * 150, 820, 128)};font-size:36px"><span class="huruf">${'ABCD'[k]}</span>${o}</button>`).join('')}`;
    let dijawab = false;
    $$('[data-o]', r).forEach(b => b.onclick = () => {
      if (dijawab) return; dijawab = true;
      const k = +b.dataset.o, benar = k === q.benar;
      L.jawab[no] = { pilih: k, benar }; A.simpan();
      $$('[data-o]', r).forEach(x => { if (+x.dataset.o === q.benar) x.classList.add('benar'); else if (x !== b) x.classList.add('redup'); });
      if (!benar) b.classList.add('salah');
      Suara.efek(benar ? 'benar' : 'salah'); if (benar) konfeti(30);
      const t = A.M_topik(q.topik);
      r.insertAdjacentHTML('beforeend', `<div class="abs umpan ${benar ? 'ok' : 'no'}" style="${pos(120, q.jenis === 'bs' ? 720 : 730, 1680, q.jenis === 'bs' ? 320 : 320)};left:120px;right:auto;bottom:auto;flex-direction:column;align-items:flex-start;gap:10px">
        <div style="font-size:46px;font-weight:700;display:flex;align-items:center;gap:12px">${benar ? I('centang', 48, 3.4) + ' Tepat sekali!' : I('tutup', 48, 3.4) + ' Belum tepat'}</div><div style="font-size:34px">${q.bahas}</div>
        <div style="display:flex;width:100%;margin-top:auto;align-items:center">${t ? `<button class="btn putih kecil" data-ulang="${t.ulang}">${I('ulang', 32)} Lihat lagi: ${t.nama}</button>` : ''}
          <button class="btn hijau" id="b-next" style="margin-left:auto;width:440px">${L.i < L.daftar.length - 1 ? LANJUT('Soal berikutnya') : I('piala', 40) + ' Lihat hasil'}</button></div></div>`);
      $('#b-next', r).onclick = () => { L.i++; A.simpan(); ke('latihan'); };
      const u = $('[data-ulang]', r); if (u) u.onclick = () => { L.i++; A.simpan(); bukaUlang(u.dataset.ulang); };
    });
  };
  function bukaUlang(t) {
    if (t === 'jelajah') ke('nusantara');
    else if (t === 'kemana') { ARENA = { tim: false, skor: [0, 0], ronde: 0 }; ke('kemana', 0); }
    else ke('bengkelItem', t);
  }
  A.M_topik = t => M.topik[t];

  LAYAR.hasil = r => {
    const S = A.S, L = S.latihan;
    const semua = M.latihan.map((q, k) => ({ q, j: L.jawab[k] }));
    const skor = semua.filter(x => x.j && x.j.benar).length, total = M.latihan.length;
    L.selesai = true; A.simpan();
    const perTopik = {};
    semua.forEach(({ q, j }) => { const t = perTopik[q.topik] = perTopik[q.topik] || { b: 0, n: 0 }; t.n++; if (j && j.benar) t.b++; });
    const kuat = Object.entries(perTopik).filter(([, v]) => v.b === v.n).map(([k]) => M.topik[k].nama);
    const ulang = Object.entries(perTopik).filter(([, v]) => v.b < v.n);
    const bintang = skor >= 13 ? 3 : skor >= 10 ? 2 : 1;
    const salah = semua.filter(x => !(x.j && x.j.benar)).length;
    r.innerHTML = BG_KUIS() + bar('Hasil Latihan', { ikon: 'piala', kembali: ['Peta', 'petamisi'] }) + `
      <div class="abs panel" style="${pos(130, 170, 560, 700)};display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div style="font-size:150px;font-weight:700;color:var(--hijau-tua);line-height:1">${skor}<span style="font-size:70px;color:var(--abu)">/${total}</span></div>
        <div style="font-size:90px;color:#F2A900">${'★'.repeat(bintang)}<span style="color:#DDD">${'★'.repeat(3 - bintang)}</span></div>
        <div style="font-size:36px;margin-top:10px">${bintang === 3 ? 'Luar biasa!' : bintang === 2 ? 'Bagus sekali!' : 'Terus semangat belajar!'}</div></div>
      <div class="abs panel" style="${pos(740, 170, 1050, 700)};padding:40px 50px">
        <div style="font-size:40px;font-weight:700;display:flex;align-items:center;gap:12px;color:var(--hijau-tua)">${I('bintang', 44)} Kamu sudah kuat di:</div>
        <div style="font-size:32px;margin:10px 0 30px">${kuat.length ? kuat.map(k => '• ' + k).join('<br>') : '–'}</div>
        <div style="font-size:40px;font-weight:700;display:flex;align-items:center;gap:12px;color:#A2480D">${I('ulang', 44)} Coba pelajari lagi:</div>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:14px">${ulang.length ? ulang.map(([k, v]) => `<button class="btn putih kecil" data-ulang="${M.topik[k].ulang}" style="justify-content:flex-start">${M.topik[k].nama} <span style="margin-left:auto;font-size:26px;color:var(--abu)">${v.b}/${v.n} benar ${I('lanjut', 26, 3)}</span></button>`).join('') : '<div style="font-size:32px">Tidak ada. Semua topik sudah dikuasai!</div>'}</div></div>
      ${salah ? `<button class="btn putih abs" id="b-ulang" style="${pos(740, 920, 500, 120)}">${I('ulang', 40)} Ulangi ${salah} soal yang salah</button>` : ''}
      <button class="btn kuning abs denyut" data-ke="refleksi" style="${pos(1290, 920, 500, 120)}">${I('refleksi', 40)} ${LANJUT('Lanjut ke Refleksi')}</button>`;
    setTimeout(() => { Suara.efek('konfeti'); konfeti(bintang * 40); }, 300);
    $$('[data-ulang]', r).forEach(b => b.onclick = () => bukaUlang(b.dataset.ulang));
    const bu = $('#b-ulang', r); if (bu) bu.onclick = () => ke('latihan', 'ulang');
  };

  /* ======================= REFLEKSI ======================= */
  LAYAR.refleksi = r => {
    const S = A.S, R = M.refleksi, pilih = new Set(S.refleksi.pilih);
    r.innerHTML = latar('rumah', G.latarPembuka, .3) + bar('Refleksi Warga Cilik', { ikon: 'refleksi', kembali: ['Peta', 'petamisi'] }) + `
      <div class="abs kartu-info" style="${pos(120, 140, 1680, 110)};display:flex;align-items:center;font-size:40px"><b>${R.tanya}</b>&nbsp;<span style="font-size:26px;color:var(--abu)">(boleh pilih lebih dari satu)</span></div>
      ${R.pilihan.map((p, k) => `<button class="pilih ${pilih.has(k) ? 'benar' : ''}" data-p="${k}" style="${pos(120 + (k % 3) * 570, 290 + Math.floor(k / 3) * 220, 540, 190)};font-size:36px;flex-direction:column;gap:8px"><span style="color:var(--biru)">${I(R.ikon[k], 62, 2)}</span>${p}</button>`).join('')}
      <div class="abs kartu-info" style="${pos(120, 760, 1100, 260)}"><div style="font-size:36px;font-weight:700">Perasaanku setelah belajar hari ini:</div>
        <div style="display:flex;gap:30px;margin-top:16px">${R.rasa.map((x, k) => `<button class="pilih ${S.refleksi.rasa === k ? 'terpilih' : ''}" data-r="${k}" style="position:relative;width:300px;height:140px;flex-direction:column;gap:0;font-size:28px"><span style="color:var(--oranye)">${I(x[0], 64, 2)}</span>${x[1]}</button>`).join('')}</div></div>
      <button class="btn kuning abs" id="b-buku" style="${pos(1280, 820, 520, 150)}">${I('buku', 44)} ${LANJUT('Lihat Buku Liputanku')}</button>
      <div class="abs plakat-kecil" style="left:1280px;top:990px;width:520px;text-align:center;font-size:22px">Sikap ini sesuai nilai Pancasila: persatuan, musyawarah, dan keadilan sosial.</div>`;
    $$('[data-p]', r).forEach(b => b.onclick = () => { const k = +b.dataset.p; pilih.has(k) ? pilih.delete(k) : pilih.add(k); b.classList.toggle('benar'); Suara.efek('pop'); S.refleksi.pilih = [...pilih]; A.simpan(); });
    $$('[data-r]', r).forEach(b => b.onclick = () => { S.refleksi.rasa = +b.dataset.r; $$('[data-r]', r).forEach(x => x.classList.toggle('terpilih', x === b)); Suara.efek('pop'); A.simpan(); });
    $('#b-buku', r).onclick = () => { if (!pilih.size) { umpan('no', 'Pilih minimal satu hal yang bisa kamu lakukan, ya!'); return; } Suara.efek('buka'); konfeti(); ke('buku'); };
  };

  /* ======================= BUKU LIPUTAN ======================= */
  LAYAR.buku = r => {
    const S = A.S, p = PROVINSI[S.prov], n = A.jmlStempel();
    r.innerHTML = latar('polos', G.latarMenu, .4) + bar('Buku Liputanku', { ikon: 'buku' }) + `
      <div class="abs" style="${pos(60, 140, 1800, 820)};background:#8E5BB5;border-radius:46px;box-shadow:0 16px 0 #6B3F8F"></div>
      <div class="abs" style="${pos(90, 165, 860, 770)};background:#FFF7E3;border-radius:34px 10px 10px 34px;padding:34px 40px;display:flex;flex-direction:column;align-items:center">
        <div style="font-size:30px;font-weight:700;color:var(--oranye);letter-spacing:4px">KARTU PERS · WARTAWAN CILIK</div>
        ${A.avatarSaya('position:relative;width:260px;height:300px;margin-top:20px')}
        <div style="font-size:50px;font-weight:700;margin-top:40px">${S.nama || 'Wartawan Cilik'}</div>
        <div style="font-size:32px;display:flex;align-items:center;gap:14px">${p ? A.logo(S.prov, 'width:62px;height:70px') + 'Provinsi ' + p.nama : I('pin', 34) + ' Provinsi belum dipilih'}</div>
        <div style="display:flex;gap:12px;margin-top:20px">${MATERI.stasiun.map(s => `<div style="width:92px;height:92px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:14px;font-weight:700;line-height:1;${S.stempel[s.id] ? `background:${s.warna};color:#fff;border:5px solid #fff;box-shadow:0 0 0 4px ${s.warna}` : 'border:4px dashed #C9B6D8;color:#B9A6C8'}">${S.stempel[s.id] ? I('centang', 30, 3.4) : ''}<span>${s.singkat}</span></div>`).join('')}</div>
        <div style="font-size:28px;margin-top:20px;text-align:center">${S.refleksi.pilih.length ? '<b>Janjiku:</b> ' + S.refleksi.pilih.map(k => MATERI.refleksi.pilihan[k]).join(' · ') : `Stempel terkumpul: <b>${n}/6</b>`}</div>
      </div>
      <div class="abs" style="${pos(970, 165, 860, 770)};background:#FFF7E3;border-radius:10px 34px 34px 10px;padding:34px 40px">
        <div style="font-size:42px;font-weight:700;margin-bottom:18px;display:flex;align-items:center;gap:12px">${I('daftar', 44)} Ringkasan Liputanku</div>
        <table class="tabel" style="font-size:24px"><tr><th>Wilayah</th><th>Pemimpin</th><th>Cara terpilih</th></tr>
        ${MATERI.ringkasan.map(b => `<tr><td><b>${b[0]}</b></td><td>${b[1]}</td><td>${b[2]}</td></tr>`).join('')}</table>
        <div style="font-size:21px;margin-top:14px;color:#6B5B2A"><b>Catatan:</b> Di DI Yogyakarta, Gubernur adalah Sultan yang ditetapkan. Di Jakarta, Wali Kota dan Bupati diangkat oleh Gubernur.</div>
      </div>
      <div class="abs no-print" style="left:60px;right:60px;bottom:14px;display:flex;gap:24px">
        <button class="btn putih kecil" id="b-png">${I('simpan', 34)} Simpan gambar</button><button class="btn putih kecil" id="b-cetak">${I('cetak', 34)} Cetak</button>
        <button class="btn kuning kecil" data-ke="menu" style="margin-left:auto">${I('menu', 34)} Menu</button></div>`;
    $('#b-cetak', r).onclick = () => { try { print(); } catch (e) { umpan('no', 'Fitur cetak tidak tersedia di perangkat ini.'); } };
    AV_GAMBAR = new Image(); AV_GAMBAR.src = G.avatar[S.avatar];
    $('#b-png', r).onclick = () => simpanGambar();
  };
  let AV_GAMBAR = new Image();
  function simpanGambar() {
    const S = A.S, p = PROVINSI[S.prov], c = document.createElement('canvas'); c.width = 1600; c.height = 900;
    const g = c.getContext('2d'), F = 'Fredoka, sans-serif';
    g.fillStyle = '#8E5BB5'; g.fillRect(0, 0, 1600, 900);
    g.fillStyle = '#FFF7E3'; rr(g, 30, 30, 760, 840, 30); rr(g, 810, 30, 760, 840, 30);
    g.fillStyle = '#FF8A3D'; g.font = `600 28px ${F}`; g.textAlign = 'center'; g.fillText('KARTU PERS · WARTAWAN CILIK', 410, 90);
    if (AV_GAMBAR.complete && AV_GAMBAR.naturalWidth) { const h = 230, w = h * AV_GAMBAR.naturalWidth / AV_GAMBAR.naturalHeight; g.drawImage(AV_GAMBAR, 410 - w / 2, 115, w, h); }
    g.fillStyle = '#2D2A4A'; g.font = `700 54px ${F}`; g.fillText(S.nama || 'Wartawan Cilik', 410, 400);
    g.font = `32px ${F}`; g.fillText(p ? 'Provinsi ' + p.nama : '', 410, 450);
    MATERI.stasiun.forEach((s, i) => {
      const x = 110 + i * 120, y = 560; g.beginPath(); g.arc(x, y, 50, 0, 7);
      if (S.stempel[s.id]) { g.fillStyle = s.warna; g.fill(); g.fillStyle = '#fff'; } else { g.strokeStyle = '#C9B6D8'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#B9A6C8'; }
      g.font = `600 22px ${F}`; g.fillText(s.singkat, x, y + 8);
    });
    g.fillStyle = '#2D2A4A'; g.font = `28px ${F}`;
    const janji = S.refleksi.pilih.map(k => MATERI.refleksi.pilihan[k]).slice(0, 4);
    janji.forEach((t, i) => g.fillText('✓ ' + t, 410, 680 + i * 40));
    g.textAlign = 'left'; g.font = `700 40px ${F}`; g.fillText('Ringkasan Liputanku', 850, 95);
    const kol = [850, 1080, 1320];
    g.fillStyle = '#FFC93C'; rr(g, 840, 125, 710, 56, 14); g.fillStyle = '#5A3E00'; g.font = `600 26px ${F}`;
    ['Wilayah', 'Pemimpin', 'Cara terpilih'].forEach((t, i) => g.fillText(t, kol[i] + 6, 163));
    g.fillStyle = '#2D2A4A';
    MATERI.ringkasan.forEach((b, j) => {
      const y = 230 + j * 100; g.font = `600 24px ${F}`;
      b.forEach((t, i) => tulisBaris(g, t, kol[i] + 6, y, i === 2 ? 220 : 220, 30));
      g.strokeStyle = '#F0E3BD'; g.lineWidth = 3; g.beginPath(); g.moveTo(840, y + 58); g.lineTo(1550, y + 58); g.stroke();
    });
    try {
      const a = document.createElement('a'); a.download = 'buku-liputan-' + (S.nama || 'wartawan-cilik').replace(/\s+/g, '-').toLowerCase() + '.png';
      a.href = c.toDataURL('image/png'); document.body.appendChild(a); a.click(); a.remove();
      umpan('ok', 'Gambar Buku Liputan disimpan ke folder unduhan.');
    } catch (e) { umpan('no', 'Gambar tidak dapat disimpan di perangkat ini.'); }
  }
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); g.fill(); }
  function tulisBaris(g, t, x, y, w, lh) {
    const kata = t.split(' '); let baris = '', yy = y;
    kata.forEach(k => { const coba = baris ? baris + ' ' + k : k; if (g.measureText(coba).width > w && baris) { g.fillText(baris, x, yy); baris = k; yy += lh; } else baris = coba; });
    g.fillText(baris, x, yy);
  }

  /* ======================= PANDUAN GURU ======================= */
  const TAB_GURU = {
    tujuan: ['target', 'Tujuan Pembelajaran', `<div style="font-size:30px;line-height:1.55"><b>Pendidikan Pancasila · Fase B · Kelas 4</b><br>Elemen: Negara Kesatuan Republik Indonesia<br><br>Setelah menggunakan media ini, murid dapat:<ol style="margin:10px 0">
      <li>mengurutkan wilayah dari provinsi sampai RT;</li><li>menyebutkan pemimpin setiap wilayah dan cara pemimpin itu terpilih;</li>
      <li>membedakan desa dan kelurahan, serta kabupaten dan kota;</li><li>memberi contoh tugas pemerintah daerah dalam kehidupan sehari-hari;</li>
      <li>menunjukkan provinsi dan kabupaten/kota tempat tinggalnya pada peta Indonesia.</li></ol><span style="color:var(--abu);font-size:26px">Silakan sesuaikan dengan CP/TP dan modul ajar sekolah.</span></div>`],
    alur: ['daftar', 'Alur 70 Menit', null],
    pakai: ['guru', 'Cara Pakai di PID', `<div style="font-size:30px;line-height:1.55">• Tekan tombol <b>layar penuh</b> di pojok kanan atas untuk layar penuh.<br>• Tekan tombol <b>musik</b> untuk menyalakan/mematikan musik.<br>• <b>Seret</b> kartu dengan satu jari. Sentuh tombol besar untuk memilih jawaban.<br>
      • Pada peta: <b>cubit dua jari</b> untuk memperbesar, <b>geser satu jari</b> untuk berpindah, atau gunakan tombol tambah / kurang.<br>• Progres murid <b>tersimpan otomatis</b> di perangkat ini, jadi bisa dilanjutkan di pertemuan berikutnya.<br>
      • Bila PID dipakai bergantian kelas, gunakan <b>Reset progres</b> di Mode Guru sebelum kelas dimulai.<br>• Arena Teka-teki punya <b>Mode Tim</b> (Merah vs Biru) untuk dimainkan bersama satu kelas.</div>`],
    guru: ['kunci', 'Mode Guru', null],
    sumber: ['buku', 'Sumber & Lisensi', `<div style="font-size:27px;line-height:1.5"><b>Data batas wilayah:</b> fatih-ntf/indonesia-geojson (MIT), mengacu Kepmendagri No. 300.2.2-2430 Tahun 2025; batas Kota Banjar dari cahyadsn/wilayah_boundaries (MIT). Batas wilayah untuk tampilan pembelajaran, bukan rujukan hukum.<br>
      <b>Lambang daerah:</b> berkas dari Wikimedia Commons / Wikipedia bahasa Indonesia (daftar sumber di <code>SUMBER-LAMBANG.csv</code>). Lambang dipakai apa adanya untuk tujuan pendidikan; mohon dicocokkan dengan lambang resmi terbaru.<br>
      <b>Huruf:</b> Fredoka (SIL Open Font License).<br><b>Data provinsi & kabupaten/kota:</b> disusun untuk media ini; mohon diperiksa guru. Isi dapat diubah di folder <code>assets/js/</code>.<br>
      <b>Gambar & suara:</b> daftar nama file ada di <code>assets/js/config.js</code> dan <code>DAFTAR-ASET.md</code>.</div>`]
  };
  LAYAR.guru = (r, tab) => {
    tab = tab || 'tujuan'; const S = A.S;
    r.innerHTML = latar('polos', G.latarMenu, .45) + bar('Panduan Guru', { ikon: 'guru' }) +
      Object.entries(TAB_GURU).map(([k, v], i) => `<button class="btn ${k === tab ? '' : 'putih'} abs" data-ke="guru" data-arg="${k}" style="${pos(60, 150 + i * 135, 470, 110)};justify-content:flex-start;font-size:32px">${I(v[0], 40)} ${v[1]}</button>`).join('') +
      `<div class="abs panel" id="isi-guru" style="${pos(580, 150, 1280, 890)};padding:44px 54px;overflow:hidden"></div>`;
    const el = $('#isi-guru', r);
    if (TAB_GURU[tab][2]) el.innerHTML = `<div style="font-size:44px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:14px">${I(TAB_GURU[tab][0], 48)} ${TAB_GURU[tab][1]}</div>` + TAB_GURU[tab][2];
    if (tab === 'alur') {
      const alur = [['Pembuka & Buat Tokoh', 5, '#FFC93C'], ['Petualangan 6 Stasiun', 25, '#FF8A3D'], ['Bengkel', 12, '#22C3C3'], ['Arena', 10, '#8B5CF6'], ['Latihan', 13, '#2F6BFF'], ['Refleksi', 5, '#22B573']];
      el.innerHTML = `<div style="font-size:44px;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:14px">${I('daftar', 48)} Alur 70 Menit (2 JP)</div><div style="display:flex;gap:6px">${alur.map(a => `<div style="flex:${a[1]};background:${a[2]};color:#fff;border-radius:18px;padding:16px 8px;text-align:center;font-size:${a[1] < 8 ? 18 : 24}px;font-weight:600;min-height:150px;display:flex;flex-direction:column;justify-content:center">${a[0]}<b style="font-size:34px">${a[1]}'</b></div>`).join('')}</div>
        <div style="font-size:30px;line-height:1.6;margin-top:30px">• <b>Pertemuan 1:</b> Pembuka, Stasiun 1–6 (bisa dibagi 3 stasiun per pertemuan).<br>• <b>Pertemuan 2:</b> Bengkel Konsep, Arena (Mode Tim), Latihan, Refleksi.<br>
        • <b>Kapan saja:</b> Jelajah Nusantara untuk pembuka, selingan, atau tugas eksplorasi (“Temukan kabupaten/kotamu!”).<br>• Setiap stasiun berisi: Dialog → Wawancara → Aktivitas → Teka-teki → Stempel.</div>`;
    }
    if (tab === 'guru') {
      el.innerHTML = `<div style="font-size:44px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:14px">${I('kunci', 48)} Mode Guru</div>
        <div style="font-size:30px;line-height:1.5">Mode Guru membuka semua stasiun dan bagian sehingga guru bisa langsung melompat ke materi mana pun.</div>
        <div style="display:flex;align-items:center;gap:30px;margin-top:30px"><button class="btn ${S.guru ? 'hijau' : 'oranye'}" id="b-guru" style="width:560px;position:relative;overflow:hidden"><span id="isi-tahan" style="position:absolute;left:0;top:0;bottom:0;width:0;background:rgba(255,255,255,.35)"></span>${S.guru ? I('centang', 40, 3.2) + ' Mode Guru AKTIF' : I('kunci', 40) + ' Tahan 2 detik untuk aktifkan'}</button>
        <div style="font-size:26px;color:var(--abu)">${S.guru ? 'Tahan 2 detik untuk menonaktifkan.' : 'Ditahan agar tidak tersentuh murid tanpa sengaja.'}</div></div>
        <div style="font-size:38px;font-weight:700;margin-top:60px;display:flex;align-items:center;gap:12px">${I('ulang', 42)} Reset progres</div><div style="font-size:28px;color:var(--abu)">Menghapus nama, stempel, dan semua jawaban di perangkat ini.</div>
        <button class="btn putih" id="b-reset" style="margin-top:20px;width:480px">Reset progres…</button>`;
      const b = $('#b-guru', el), isiT = $('#isi-tahan', el); let mulai = 0, raf;
      const tahan = () => { const t = (performance.now() - mulai) / 2000; isiT.style.width = Math.min(100, t * 100) + '%'; if (t >= 1) { S.guru = !S.guru; A.simpan(); Suara.efek('buka'); ke('guru', 'guru'); } else raf = requestAnimationFrame(tahan); };
      b.addEventListener('pointerdown', () => { mulai = performance.now(); raf = requestAnimationFrame(tahan); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => b.addEventListener(ev, () => { cancelAnimationFrame(raf); isiT.style.width = 0; }));
      $('#b-reset', el).onclick = konfirmasiReset;
    }
  };
  function konfirmasiReset() {
    const t = jendela(`<div style="text-align:center"><div style="color:var(--oranye)">${I('ulang', 110, 1.8)}</div><h2>Hapus semua progres?</h2><div style="font-size:32px">Nama, stempel, dan jawaban di perangkat ini akan dihapus.</div>
      <div style="display:flex;gap:30px;justify-content:center;margin-top:40px"><button class="btn putih" data-aksi="tutup" style="width:340px">Batal</button><button class="btn oranye" id="b-ya" style="width:340px">Ya, hapus</button></div></div>`, 1000);
    $('#b-ya', t).onclick = () => { A.hapusProgres(); t.remove(); umpan('ok', 'Progres sudah dihapus.'); ke('menu'); };
  }

  /* ======================= PENGATURAN ======================= */
  A.bukaPengaturan = () => {
    const S = A.S;
    const t = jendela(`<h2 style="display:flex;align-items:center;gap:14px">${I('atur', 54)} Pengaturan</h2>
      <div class="kartu-info" style="position:relative;display:flex;align-items:center;gap:20px;font-size:34px;padding:22px 34px;margin-bottom:20px">${I('musik', 40)} Musik latar
        <input type="range" id="v-musik" min="0" max="1" step=".05" value="${ASET.volumeMusik}" style="margin-left:auto;width:300px;height:40px">
        <button class="btn kecil ${S.musik ? 'hijau' : 'putih'}" id="t-musik" style="width:190px">${S.musik ? 'NYALA' : 'MATI'}</button></div>
      <div class="kartu-info" style="position:relative;display:flex;align-items:center;gap:20px;font-size:34px;padding:22px 34px;margin-bottom:20px">${I('suara', 40)} Efek suara
        <input type="range" id="v-efek" min="0" max="1" step=".05" value="${ASET.volumeEfek}" style="margin-left:auto;width:300px;height:40px">
        <button class="btn kecil ${S.efek ? 'hijau' : 'putih'}" id="t-efek" style="width:190px">${S.efek ? 'NYALA' : 'MATI'}</button></div>
      <div class="kartu-info" style="position:relative;display:flex;align-items:center;gap:20px;font-size:34px;padding:22px 34px;margin-bottom:20px"><b style="width:40px;text-align:center">Aa</b> Ukuran teks
        <button class="btn kecil ${S.besar ? 'putih' : ''}" data-besar="0" style="margin-left:auto;width:190px">Normal</button><button class="btn kecil ${S.besar ? '' : 'putih'}" data-besar="1" style="width:190px">Besar</button></div>
      <div style="display:flex;gap:24px;margin-top:30px"><button class="btn putih" id="p-reset">${I('ulang', 38)} Hapus progres</button><button class="btn kuning" data-aksi="tutup" style="margin-left:auto;width:300px">Tutup ${I('tutup', 34, 3)}</button></div>`, 1150);
    $('#t-musik', t).onclick = e => { S.musik = !S.musik; A.simpan(); Suara.setMusik(S.musik); e.target.textContent = S.musik ? 'NYALA' : 'MATI'; e.target.className = 'btn kecil ' + (S.musik ? 'hijau' : 'putih'); const bm = $('.bar [data-aksi="musik"]'); if (bm) { bm.innerHTML = I(S.musik ? 'musik' : 'musikMati', 38); bm.classList.toggle('mati', !S.musik); } };
    $('#t-efek', t).onclick = e => { S.efek = !S.efek; A.simpan(); Suara.setEfek(S.efek); e.target.textContent = S.efek ? 'NYALA' : 'MATI'; e.target.className = 'btn kecil ' + (S.efek ? 'hijau' : 'putih'); };
    $('#v-musik', t).oninput = e => Suara.setVolumeMusik(+e.target.value);
    $('#v-efek', t).oninput = e => Suara.setVolumeEfek(+e.target.value);
    $$('[data-besar]', t).forEach(b => b.onclick = () => { S.besar = b.dataset.besar === '1'; A.simpan(); A.stage.classList.toggle('teks-besar', S.besar); $$('[data-besar]', t).forEach(x => x.className = 'btn kecil ' + (x === b ? '' : 'putih')); });
    $('#p-reset', t).onclick = () => { t.remove(); konfirmasiReset(); };
  };
  A.layarAktif = () => $('#layar > div');
})();
