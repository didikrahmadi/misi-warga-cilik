/* ===================== JELAJAH NUSANTARA: peta interaktif ===================== */
(function () {
  const A = window.App, { $, $$, pos, pic, logo, I, bar, umpan, konfeti, jendela, acak, ke, LAYAR } = A;
  const NS = 'http://www.w3.org/2000/svg';

  /* ---------- muat file peta kabupaten (sekali per provinsi) ---------- */
  function muatKab(kode, cb) {
    if (window.PETA_KAB && PETA_KAB[kode]) { cb(PETA_KAB[kode]); return; }
    const s = document.createElement('script'); s.src = `assets/data/peta/kab-${kode}.js`;
    s.onload = () => cb(window.PETA_KAB && PETA_KAB[kode]);
    s.onerror = () => cb(null);
    document.head.appendChild(s);
  }

  /* ---------- geser & zoom (1 jari geser, 2 jari cubit, roda tetikus, tombol) ---------- */
  function geserZoom(svg, box, o = {}) {
    // samakan perbandingan kotak peta dengan wadahnya agar zoom & geser terasa wajar
    if (o.rasio) {
      const [x, y, w, h] = box;
      box = w / h > o.rasio ? [x, y + h / 2 - w / o.rasio / 2, w, w / o.rasio] : [x + w / 2 - h * o.rasio / 2, y, h * o.rasio, h];
    }
    const v = { x: box[0], y: box[1], w: box[2], h: box[3] }, maks = o.maks || 10;
    const terap = () => { svg.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`); o.onZoom && o.onZoom(box[2] / v.w); };
    const keSvg = (cx, cy) => { const p = svg.createSVGPoint(); p.x = cx; p.y = cy; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    function batas() {
      const mx = box[2] * .35, my = box[3] * .35;
      v.x = Math.min(Math.max(v.x, box[0] - mx), box[0] + box[2] - v.w + mx);
      v.y = Math.min(Math.max(v.y, box[1] - my), box[1] + box[3] - v.h + my);
    }
    function zoomDi(f, cx, cy) {
      const z = box[2] / v.w; let nz = Math.min(maks, Math.max(1, z * f)); f = nz / z;
      const p = cx == null ? { x: v.x + v.w / 2, y: v.y + v.h / 2 } : keSvg(cx, cy);
      v.x = p.x - (p.x - v.x) / f; v.y = p.y - (p.y - v.y) / f; v.w /= f; v.h /= f;
      if (nz === 1) { v.x = box[0]; v.y = box[1]; } batas(); terap();
    }
    const jari = new Map(); let awal = null, gerak = false;
    svg.addEventListener('pointerdown', e => {
      try { svg.setPointerCapture(e.pointerId); } catch (_) {}
      jari.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (jari.size === 1) { awal = { x: e.clientX, y: e.clientY, v: { ...v }, t: Date.now(), target: e.target }; gerak = false; }
      if (jari.size === 2) { const [a, b] = [...jari.values()]; awal = { d: Math.hypot(a.x - b.x, a.y - b.y), v: { ...v }, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 }; gerak = true; }
    });
    svg.addEventListener('pointermove', e => {
      if (!jari.has(e.pointerId) || !awal) return;
      jari.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const r = svg.getBoundingClientRect(), k = Math.max(awal.v.w / r.width, awal.v.h / r.height);
      if (jari.size === 1 && awal.d == null) {
        const dx = e.clientX - awal.x, dy = e.clientY - awal.y;
        if (Math.hypot(dx, dy) > 12) gerak = true;
        if (gerak) { v.x = awal.v.x - dx * k; v.y = awal.v.y - dy * k; batas(); terap(); }
      } else if (jari.size === 2) {
        const [a, b] = [...jari.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
        Object.assign(v, awal.v); zoomDi(d / awal.d, awal.mx, awal.my);
      }
    });
    const lepas = e => {
      if (!jari.has(e.pointerId)) return;
      jari.delete(e.pointerId);
      if (jari.size === 0) {
        if (!gerak && awal && Date.now() - awal.t < 700 && o.onTap) { const el = document.elementFromPoint(e.clientX, e.clientY); o.onTap(el && el.closest('[data-kode]')); }
        awal = null;
      } else if (jari.size === 1) { const [p] = [...jari.values()]; awal = { x: p.x, y: p.y, v: { ...v }, t: 0 }; }
    };
    svg.addEventListener('pointerup', lepas); svg.addEventListener('pointercancel', lepas);
    svg.addEventListener('wheel', e => { e.preventDefault(); zoomDi(e.deltaY < 0 ? 1.25 : 0.8, e.clientX, e.clientY); }, { passive: false });
    terap();
    return {
      zoom: f => { Suara.efek('zoom'); zoomDi(f); },
      reset: () => { Object.assign(v, { x: box[0], y: box[1], w: box[2], h: box[3] }); terap(); },
      fokus: (bb, pad = .15) => {
        const asp = box[2] / box[3]; let w = bb.width * (1 + pad * 2), h = bb.height * (1 + pad * 2);
        if (w / h > asp) h = w / asp; else w = h * asp;
        if (w > box[2]) { w = box[2]; h = box[3]; }
        v.w = w; v.h = h; v.x = bb.x + bb.width / 2 - w / 2; v.y = bb.y + bb.height / 2 - h / 2; batas(); terap();
      }
    };
  }
  const tombolZoom = (x, y) => `<div class="zoom-ctl" style="left:${x}px;top:${y}px">
    <button class="btn-ikon" data-z="in" style="width:96px;height:96px">${I('tambah', 46, 3)}</button>
    <button class="btn-ikon" data-z="out" style="width:96px;height:96px">${I('kurang', 46, 3)}</button>
    <button class="btn-ikon" data-z="reset" style="width:96px;height:96px">${I('ulang', 42, 2.6)}</button></div>`;
  function pasangZoom(r, gz) { $$('[data-z]', r).forEach(b => b.onclick = () => b.dataset.z === 'in' ? gz.zoom(1.5) : b.dataset.z === 'out' ? gz.zoom(1 / 1.5) : (Suara.efek('zoom'), gz.reset())); }

  // citra satelit di bawah garis batas (kelas "citra" dipasang hanya bila gambarnya berhasil dimuat)
  const citraSvg = (src, b) => src && b ? `<image class="citra-img" href="${src}" x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" preserveAspectRatio="none" onload="this.closest('.peta-wadah').classList.add('citra')" onerror="this.remove()"/>` : '';
  const warnaCitra = () => `--citra-warna:${(ASET.jelajah || {}).citraWarna ?? .28}`;
  const warnaProv = (kode, i) => { const p = PROVINSI[kode], pl = PULAU.find(x => x.id === p.pulau); return pl.warna[i % 3]; };

  /* ======================= PETA NUSANTARA ======================= */
  LAYAR.nusantara = r => {
    const P = PETA_INDONESIA;
    let tantangan = null;
    r.innerHTML = bar('Jelajah Nusantara', { ikon: 'peta' }) + `
      <div class="peta-wadah" id="wadah" style="${pos(0, 112, 1920, 968)}">
        <svg id="peta" xmlns="${NS}" preserveAspectRatio="xMidYMid meet"></svg></div>
      <div class="abs" style="left:30px;top:140px;display:flex;gap:12px;flex-wrap:wrap;width:1500px;z-index:5">${PULAU.map(p => `<span class="chip" data-pulau="${p.id}" style="border-left:14px solid ${p.warna[0]}">${p.nama}</span>`).join('')}</div>
      ${tombolZoom(1790, 330)}
      <div class="abs panel" id="petunjuk" style="${pos(30, 950, 760, 100)};display:flex;align-items:center;justify-content:center;font-size:30px;z-index:5">${I('lup', 38)}&nbsp; Sentuh provinsi untuk melihat lebih dekat</div>
      <button class="btn kuning abs" id="b-tantang" style="${pos(1340, 950, 550, 100)};z-index:5">${I('target', 42)} Temukan Provinsi!</button>`;
    const svg = $('#peta', r);
    let h = '';
    P.prov.forEach((p, i) => { h += `<path class="wil" data-kode="${p.kode}" d="${p.d}" fill="${warnaProv(p.kode, i)}" stroke-width="1.5"/>`; });
    P.prov.forEach(p => { h += `<text x="${p.lx}" y="${p.ly}" class="lbl" data-for="${p.kode}">${PROVINSI[p.kode].nama}</text>`; });
    const bt = (ASET.jelajah || {}).citraNasionalBatas || [P.ox, P.oy, P.ox + P.w / P.k, P.oy - P.h / P.k];
    svg.innerHTML = citraSvg((ASET.jelajah || {}).citraNasional, [(bt[0] - P.ox) * P.k, (P.oy - bt[1]) * P.k, (bt[2] - bt[0]) * P.k, (bt[1] - bt[3]) * P.k]) + h;
    $('#wadah', r).style.cssText += ';' + warnaCitra();
    const label = $$('text.lbl', svg);
    const gz = geserZoom(svg, [0, 0, P.w, P.h], {
      rasio: 1920 / 968,
      maks: 12,
      onZoom: z => { const fs = 20 / z * (P.w / 1920) * 1.05; label.forEach(t => { t.setAttribute('font-size', fs); t.setAttribute('stroke-width', fs / 5); t.style.opacity = z >= 1.9 ? 1 : 0; }); },
      onTap: el => {
        if (!el) return;
        const kode = el.dataset.kode, nama = PROVINSI[kode].nama;
        if (tantangan) {
          if (kode === tantangan.target) {
            Suara.efek('benar'); konfeti(60); tantangan.skor++;
            el.classList.add('pilih'); umpan('ok', `Tepat! Itu <b>Provinsi ${nama}</b>. Ibu kotanya <b>${PROVINSI[kode].ibukota}</b>.`, 2600);
            setTimeout(() => { el.classList.remove('pilih'); soalBaru(); }, 1800);
          } else {
            Suara.efek('salah'); el.classList.add('redup'); setTimeout(() => el.classList.remove('redup'), 900);
            umpan('no', `Itu <b>Provinsi ${nama}</b>. Coba cari lagi!`, 2200);
          }
          return;
        }
        Suara.efek('pop'); el.classList.add('pilih'); setTimeout(() => ke('provinsi', kode), 250);
      }
    });
    pasangZoom(r, gz);
    $$('[data-pulau]', r).forEach(c => c.onclick = () => {
      const kode = Object.keys(PROVINSI).filter(k => PROVINSI[k].pulau === c.dataset.pulau);
      let bb = null;
      kode.forEach(k => { const b = $(`path[data-kode="${k}"]`, svg).getBBox(); bb = bb ? { x: Math.min(bb.x, b.x), y: Math.min(bb.y, b.y), x2: Math.max(bb.x2, b.x + b.width), y2: Math.max(bb.y2, b.y + b.height) } : { x: b.x, y: b.y, x2: b.x + b.width, y2: b.y + b.height }; });
      $$('[data-pulau]', r).forEach(x => x.classList.toggle('on', x === c)); Suara.efek('zoom');
      gz.fokus({ x: bb.x, y: bb.y, width: bb.x2 - bb.x, height: bb.y2 - bb.y }, .08);
    });
    function soalBaru() {
      const sisa = Object.keys(PROVINSI).filter(k => !tantangan.sudah.includes(k));
      if (!sisa.length) { tantangan.sudah = []; }
      const t = acak(sisa.length ? sisa : Object.keys(PROVINSI))[0]; tantangan.target = t; tantangan.sudah.push(t);
      $('#petunjuk', r).innerHTML = `${logo(t, 'width:62px;height:70px')}&nbsp;Temukan <b>&nbsp;Provinsi ${PROVINSI[t].nama}&nbsp;</b> · <span class="bintang-teks">★</span> ${tantangan.skor}`;
      $('#petunjuk', r).style.background = '#FFF4CC';
    }
    $('#b-tantang', r).onclick = e => {
      if (tantangan) { tantangan = null; e.currentTarget.innerHTML = I('target', 42) + ' Temukan Provinsi!'; $('#petunjuk', r).innerHTML = I('lup', 38) + '&nbsp; Sentuh provinsi untuk melihat lebih dekat'; $('#petunjuk', r).style.background = '#fff'; return; }
      tantangan = { skor: 0, sudah: [] }; e.currentTarget.innerHTML = I('tutup', 38, 3) + ' Selesai bermain'; Suara.efek('buka'); soalBaru();
    };
  };

  /* ======================= PETA PROVINSI ======================= */
  const WARNA_KAB = ['#7ED957', '#5CC96B', '#A3E37E', '#49B86A', '#8FD96A'];
  const WARNA_KOTA = ['#FF9F43', '#FFB86B', '#F7882F'];
  const isKota = nama => /^Kota /.test(nama);

  LAYAR.provinsi = (r, kode) => {
    const p = A.infoProv(kode), J = ASET.jelajah || {};
    // Buku Atlas aktif bila gambar meja-atlas tersedia (posisi halaman diatur di config.js)
    const atlas = !!(window.TAMPILAN && TAMPILAN.ada.mejaAtlas);
    const [kx, ky, kw, kh] = atlas ? J.halamanKiri : [0, 112, 1200, 968];
    const kartuPos = atlas ? J.halamanKanan : [1215, 128, 690, 935];
    const mh = kh - 96;                       // tinggi peta (sisanya untuk keterangan)
    r.classList.toggle('atlas', atlas);
    r.innerHTML = (atlas ? `<div class="latar"><img class="lapis" src="${J.mejaAtlas}" alt=""></div>` : '') + bar(`Provinsi ${p.nama}`, { ikon: 'peta', kembali: ['Peta Indonesia', 'nusantara'] }) + `
      <div class="peta-wadah" id="wadah" style="${pos(kx, ky, kw, mh)}"><svg id="peta" xmlns="${NS}" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="abs" id="memuat" style="inset:0;display:flex;align-items:center;justify-content:center;font-size:40px;color:#fff">Memuat peta…</div></div>
      <div class="hiasan-kompas" style="left:${kx + 14}px;top:${ky + 10}px"></div>
      ${tombolZoom(kx + kw - 116, ky + 150)}
      <div class="abs panel" style="${pos(kx + 12, ky + kh - 86, kw - 24, 76)};display:flex;align-items:center;gap:22px;padding:0 24px;font-size:24px;z-index:5;white-space:nowrap;overflow:hidden">
        <span><span style="display:inline-block;width:30px;height:30px;border-radius:8px;background:${WARNA_KAB[0]};vertical-align:middle"></span> Kabupaten</span>
        <span><span style="display:inline-block;width:30px;height:30px;border-radius:8px;background:${WARNA_KOTA[0]};vertical-align:middle"></span> Kota</span>
        <span>${pinKecil()} Ibu kota provinsi</span>${kw >= 1000 ? '<span style="color:var(--abu);font-size:21px">Perbesar untuk melihat nama</span>' : ''}</div>
      <div class="kartu-info" id="kartu-prov" style="${pos(...kartuPos)}"></div>`;
    r.dataset.kiri = JSON.stringify([kx, ky, kw, kh]);
    kartuProvinsi(r, p, 'ikon');
    muatKab(kode, data => {
      const svg = $('#peta', r); $('#memuat', r).remove();
      if (!data) { svg.parentNode.insertAdjacentHTML('beforeend', '<div class="abs" style="inset:0;display:flex;align-items:center;justify-content:center;font-size:36px;color:#fff">Peta belum tersedia.</div>'); return; }
      let h = '', ik = 0, io = 0;
      data.kab.forEach(k => { h += `<path class="wil${isKota(k.nama) ? ' kota' : ''}" data-kode="${k.kode}" d="${k.d}" fill="${isKota(k.nama) ? WARNA_KOTA[io++ % 3] : WARNA_KAB[ik++ % 5]}" stroke-width="2"/>`; });
      data.kab.forEach(k => { h += `<text class="lbl" x="${k.lx}" y="${k.ly}">${k.nama.replace(/^(Kabupaten|Kota)( Administrasi)? /, '')}</text>`; });
      const ib = data.kab.find(k => k.kode === p.kodeIbukota);
      const pinGambar = window.TAMPILAN && TAMPILAN.ada.pinIbukota;
      let pcx = 0, pcy = 0;
      if (ib) {
        pcx = ib.cx != null ? ib.cx : ib.lx; pcy = ib.cy != null ? ib.cy : ib.ly;
        h += pinGambar ? `<image class="bintang pin" href="${J.pinIbukota}" x="${pcx}" y="${pcy}"/>` : `<text class="bintang" x="${pcx}" y="${pcy}" style="fill:#FFD400;stroke:#7A5A00;paint-order:stroke">★</text>`;
      }
      const J2 = ASET.jelajah || {};
      svg.innerHTML = citraSvg(J2.citraProvinsi && J2.citraProvinsi.replace('{kode}', kode), window.CITRA_PROV && CITRA_PROV[kode]) + h;
      $('#wadah', r).style.cssText += ';' + warnaCitra();
      const unit = Math.max(data.box[2] / kw, data.box[3] / mh);
      const label = $$('text.lbl', svg), bintang = $('.bintang', svg);
      const banyak = data.kab.length;
      const gz = geserZoom(svg, data.box, {
        rasio: kw / mh,
        maks: 8,
        onZoom: z => {
          const fs = 19 * unit / z; label.forEach(t => { t.setAttribute('font-size', fs); t.setAttribute('stroke-width', fs / 5); t.style.opacity = (z >= 1.7 || banyak <= 8) ? 1 : 0; });
          if (bintang && pinGambar) { const w = 64 * unit / z, h = w * 1.25; bintang.setAttribute('width', w); bintang.setAttribute('height', h); bintang.setAttribute('x', pcx - w / 2); bintang.setAttribute('y', pcy - h); }
          else if (bintang) { bintang.setAttribute('font-size', 54 * unit / z); bintang.setAttribute('stroke-width', 6 * unit / z); bintang.setAttribute('dy', 18 * unit / z); }
        },
        onTap: el => { if (!el) return; Suara.efek('pop'); $$('path.wil', svg).forEach(x => x.classList.toggle('pilih', x === el)); kartuKab(r, p, el.dataset.kode, () => $$('path.wil', svg).forEach(x => x.classList.remove('pilih'))); }
      });
      pasangZoom(r, gz);
      // DKI Jakarta: Kepulauan Seribu membentang jauh ke utara, jadi awali dengan daratan Jakarta
      if (kode === '31') {
        const bb = $$('path.wil', svg).filter(x => x.dataset.kode !== '31.01').map(x => x.getBBox())
          .reduce((a, b) => ({ x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), x2: Math.max(a.x2, b.x + b.width), y2: Math.max(a.y2, b.y + b.height) }), { x: 1e9, y: 1e9, x2: -1e9, y2: -1e9 });
        gz.fokus({ x: bb.x, y: bb.y, width: bb.x2 - bb.x, height: bb.y2 - bb.y }, .1);
        umpan('ok', 'Kepulauan Seribu ada di utara. Tekan tombol putar di kanan untuk melihat seluruh wilayah Jakarta.', 4000);
      }
    });
  };

  function kartuProvinsi(r, p, tab) {
    const el = $('#kartu-prov', r);
    const baris = (ik, t) => t ? `<div class="baris"><span class="ik">${I(ik, 36, 2.2)}</span><span>${t}</span></div>` : '';
    let isiTab = '';
    if (tab === 'ikon') isiTab = p.ikon ? `<div class="baris" style="align-items:center"><span style="color:var(--biru)">${I('kantor', 72, 1.8)}</span><span><b>Ikon daerah:</b><br>${p.ikon}</span></div>` : '';
    if (tab === 'budaya') isiTab = baris('rumah', p.rumahAdat && `<b>Rumah adat:</b> ${p.rumahAdat}`) + baris('bintang', p.tarian && `<b>Tarian:</b> ${p.tarian}`) + baris('pohon', p.makanan && `<b>Makanan khas:</b> ${p.makanan}`) || '<div class="baris">Data budaya sedang dilengkapi.</div>';
    if (tab === 'fakta') isiTab = baris('lampu', p.fakta || 'Fakta unik sedang dilengkapi.');
    const pl = PULAU.find(x => x.id === p.pulau);
    el.innerHTML = `<div style="display:flex;gap:26px;align-items:center;margin-bottom:12px">${logo(p.kode, 'width:160px;height:180px')}
        <div><span class="label-jenis" style="background:${pl.warna[2]}">PROVINSI · ${pl.nama.toUpperCase()}</span><h3 style="margin-top:10px">${p.nama}</h3><div style="font-size:24px;color:var(--abu)">${I('perisai', 24)} Lambang Provinsi ${p.nama}</div></div></div>
      ${baris('orang', `Dipimpin oleh <b>Gubernur</b> dan Wakil Gubernur`)}
      ${baris('bintang', `Ibu kota: <b>${p.ibukota}</b>`)}
      ${baris('peta', `Terdiri dari <b>${p.jmlKab} kabupaten</b> dan <b>${p.jmlKota} kota</b>`)}
      <div style="display:flex;gap:14px;margin:22px 0 10px">${[['ikon', 'Ikon Daerah'], ['budaya', 'Budaya'], ['fakta', 'Fakta Unik']].map(([k, n]) => `<button class="btn kecil ${k === tab ? '' : 'putih'}" data-tab="${k}" style="flex:1;padding:0 10px">${n}</button>`).join('')}</div>
      <div style="min-height:190px">${isiTab}</div>
      <button class="btn kuning kecil" id="b-daftar" style="width:100%;margin-top:6px">${I('daftar', 36)} Daftar ${p.jmlKab + p.jmlKota} kabupaten/kota</button>`;
    $$('[data-tab]', el).forEach(b => b.onclick = () => kartuProvinsi(r, p, b.dataset.tab));
    $('#b-daftar', el).onclick = () => {
      const t = jendela(`<h2>${I('daftar', 48)} Kabupaten & Kota di ${p.nama}</h2><div class="gulir" style="height:640px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-content:start;padding-right:14px">
        ${p.daftar.map(([k, v]) => `<button class="btn putih kecil" data-k="${k}" style="font-size:23px;justify-content:flex-start;text-align:left;min-height:96px;padding:0 14px;border-left:14px solid ${isKota(v.nama) ? WARNA_KOTA[0] : WARNA_KAB[0]}">${logo(k, 'width:54px;height:62px')}${v.nama}${k === p.kodeIbukota ? ' ' + pinKecil() : ''}</button>`).join('')}</div>
        <button class="btn kuning kecil abs" data-aksi="tutup" style="right:40px;top:34px">Tutup ${I('tutup', 30, 3)}</button>`, 1640);
      $$('[data-k]', t).forEach(b => b.onclick = () => { t.remove(); const path = $(`path[data-kode="${b.dataset.k}"]`, r); $$('path.wil', r).forEach(x => x.classList.toggle('pilih', x === path)); kartuKab(r, p, b.dataset.k, () => $$('path.wil', r).forEach(x => x.classList.remove('pilih'))); });
    };
  }

  // penanda ibu kota kecil untuk keterangan & daftar
  const pinKecil = () => (window.TAMPILAN && TAMPILAN.ada.pinIbukota) ? `<img src="${ASET.jelajah.pinIbukota}" alt="" style="height:30px;vertical-align:middle">` : '<span class="bintang-teks">★</span>';

  // Kartu koleksi kabupaten/kota (bingkai: ASET.jelajah.kartuKoleksi)
  function kartuKab(r, p, kode, tutupCb) {
    $$('.kartu-koleksi', r).forEach(e => e.remove());
    const k = KABKOTA[kode]; if (!k) return;
    const kota = isKota(k.nama), adm = / Administrasi /.test(k.nama);
    const pemimpin = kota ? 'Wali Kota' : 'Bupati';
    const baris = (ik, t) => t ? `<div class="baris"><span class="ik">${I(ik, 30, 2.2)}</span><span>${t}</span></div>` : '';
    const pusat = k.ibukota || (kota ? k.nama.replace(/^Kota (Administrasi )?/, '') : '');
    const [kx, , kw] = JSON.parse(r.dataset.kiri || '[0,112,1200,968]');
    const el = document.createElement('div'); el.className = 'kartu-koleksi';
    el.style.left = Math.max(20, kx + kw / 2 - 320) + 'px'; el.style.top = '150px';
    el.innerHTML = `<div class="pita" style="background:${kota ? '#F7882F' : '#3BAA5C'};box-shadow:0 4px 0 ${kota ? '#C2620F' : '#25763D'}">${kota ? 'KOTA' : 'KABUPATEN'}${adm ? ' ADMINISTRASI' : ''}</div>
      <div class="dalam">
        ${logo(kode, 'width:190px;height:210px;margin-top:6px')}
        <h3>${k.nama}</h3>
        <div style="font-size:21px;color:var(--abu);margin-bottom:10px">${I('perisai', 22)} Lambang ${k.nama}</div>
        ${baris('orang', adm ? `Dipimpin <b>${pemimpin}</b>, diangkat oleh Gubernur DKI Jakarta` : `Dipimpin <b>${pemimpin}</b> dan Wakil ${pemimpin}, dipilih melalui Pilkada`)}
        ${baris('peta', `Provinsi <b>${p.nama}</b>`)}
        ${baris('kantor', pusat && `Pusat pemerintahan: <b>${pusat}</b>`)}
        ${baris('bintang', kode === p.kodeIbukota && `<b>Ibu kota provinsi</b> (${p.ibukota}) ada di sini`)}
        ${baris('lampu', k.ciri && `Ciri khas: ${k.ciri}`)}
        <button class="btn putih kecil" data-ke="bengkelItem" data-arg="kabkota" style="margin-top:auto;font-size:24px;min-height:70px">${I('ulang', 28)} Kabupaten atau Kota?</button>
      </div>
      <button class="btn-ikon" id="b-tutup" style="position:absolute;right:-22px;top:-22px;width:84px;height:84px;border-radius:50%">${I('tutup', 40, 3)}</button>`;
    r.appendChild(el);
    $('#b-tutup', el).onclick = () => { Suara.efek('klik'); el.remove(); tutupCb && tutupCb(); };
  }
})();
