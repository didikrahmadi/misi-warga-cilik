/* ===================== SUARA: musik latar, efek, narasi =====================
   Memakai file dari config.js. Bila file belum ada, memakai bunyi buatan
   browser (Web Audio) sebagai cadangan. */
window.Suara = (function () {
  let ctx = null, musikEl = null, musikCadangan = null, siap = false;
  const st = { musik: true, efek: true };
  const efekEl = {}, efekGagal = {};

  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // muat efek dari file (sekali)
  function muatEfek() {
    Object.entries(ASET.efek).forEach(([k, src]) => {
      const a = new Audio(); a.preload = 'auto'; a.src = src;
      a.addEventListener('error', () => { efekGagal[k] = true; });
      a.addEventListener('canplaythrough', () => { efekEl[k] = a; }, { once: true });
    });
  }

  // ---------- bunyi cadangan ----------
  function nada(f, t0, dur, tipe = 'sine', vol = .25, f2) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = tipe; o.frequency.setValueAtTime(f, c.currentTime + t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, c.currentTime + t0 + dur);
    g.gain.setValueAtTime(0, c.currentTime + t0);
    g.gain.linearRampToValueAtTime(vol * ASET.volumeEfek, c.currentTime + t0 + .015);
    g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + t0 + dur);
    o.connect(g).connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + .05);
  }
  function derau(t0, dur, vol = .3, frek = 800) {
    const c = ac(); if (!c) return;
    const n = c.sampleRate * dur, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'lowpass'; f.frequency.value = frek; g.gain.value = vol * ASET.volumeEfek;
    s.buffer = buf; s.connect(f).connect(g).connect(c.destination); s.start(c.currentTime + t0);
  }
  const cadangan = {
    klik: () => nada(880, 0, .07, 'triangle', .18),
    pop: () => nada(500, 0, .12, 'sine', .22, 900),
    benar: () => { nada(784, 0, .14, 'triangle', .22); nada(1046, .1, .25, 'triangle', .22); },
    salah: () => { nada(330, 0, .16, 'sine', .2, 260); nada(262, .14, .22, 'sine', .18, 220); },
    stempel: () => { nada(140, 0, .25, 'sine', .5, 60); derau(0, .12, .35, 600); },
    konfeti: () => { [0, .07, .14, .21, .28].forEach((t, i) => nada(660 + i * 130, t, .15, 'triangle', .15)); },
    buka: () => { nada(523, 0, .12, 'triangle', .2); nada(659, .1, .12, 'triangle', .2); nada(784, .2, .25, 'triangle', .2); },
    halaman: () => derau(0, .18, .18, 2500),
    seret: () => nada(600, 0, .06, 'sine', .12, 700),
    zoom: () => nada(400, 0, .12, 'sine', .12, 600)
  };

  function efek(k) {
    if (!st.efek) return;
    const a = efekEl[k];
    if (a) { try { const b = a.cloneNode(); b.volume = ASET.volumeEfek; b.play().catch(() => cadangan[k] && cadangan[k]()); return; } catch (e) {} }
    cadangan[k] && cadangan[k]();
  }

  // ---------- musik ----------
  function mulaiMusikCadangan() {
    const c = ac(); if (!c || musikCadangan) return;
    // melodi kotak musik pentatonik, lembut & berulang (ciptaan sendiri)
    const g = c.createGain(); g.gain.value = ASET.volumeMusik * .35; g.connect(c.destination);
    const not = [523, 587, 659, 784, 880, 784, 659, 587, 523, 659, 784, 1046, 880, 784, 659, 587];
    const bas = [131, 131, 165, 165, 147, 147, 196, 196];
    let i = 0;
    function main() {
      if (!musikCadangan) return;
      const t = c.currentTime;
      const o = c.createOscillator(), e = c.createGain();
      o.type = 'triangle'; o.frequency.value = not[i % not.length];
      e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(.5, t + .02); e.gain.exponentialRampToValueAtTime(.001, t + .9);
      o.connect(e).connect(g); o.start(t); o.stop(t + 1);
      if (i % 2 === 0) {
        const ob = c.createOscillator(), eb = c.createGain();
        ob.type = 'sine'; ob.frequency.value = bas[(i / 2) % bas.length];
        eb.gain.setValueAtTime(0, t); eb.gain.linearRampToValueAtTime(.6, t + .03); eb.gain.exponentialRampToValueAtTime(.001, t + 1.2);
        ob.connect(eb).connect(g); ob.start(t); ob.stop(t + 1.3);
      }
      i++;
    }
    musikCadangan = { g, id: setInterval(main, 450) };
  }
  function hentiMusikCadangan() {
    if (musikCadangan) { clearInterval(musikCadangan.id); musikCadangan.g.disconnect(); musikCadangan = null; }
  }
  function mulaiMusik() {
    if (!st.musik) return;
    if (!musikEl) {
      musikEl = new Audio(ASET.musik); musikEl.loop = true; musikEl.volume = ASET.volumeMusik;
      musikEl.addEventListener('error', () => { musikEl.gagal = true; if (st.musik) mulaiMusikCadangan(); });
    }
    if (musikEl.gagal) { mulaiMusikCadangan(); return; }
    musikEl.play().catch(() => {});
  }
  function hentiMusik() { if (musikEl) musikEl.pause(); hentiMusikCadangan(); }

  // ---------- narasi ----------
  let narasiEl = null;
  function cekNarasi(kode, adaCb) {
    if (!kode) return;
    const a = new Audio(); a.preload = 'auto';
    a.addEventListener('canplay', () => adaCb(() => { hentiNarasi(); narasiEl = a; a.currentTime = 0; a.play().catch(() => {}); }), { once: true });
    a.src = ASET.narasi.replace('{kode}', kode);
  }
  function hentiNarasi() { if (narasiEl) { narasiEl.pause(); narasiEl = null; } }

  return {
    buka() { if (siap) { ac(); return; } siap = true; ac(); muatEfek(); mulaiMusik(); },
    efek,
    setMusik(v) { st.musik = v; v ? mulaiMusik() : hentiMusik(); },
    setEfek(v) { st.efek = v; },
    setVolumeMusik(v) { ASET.volumeMusik = v; if (musikEl) musikEl.volume = v; if (musikCadangan) musikCadangan.g.gain.value = v * .35; },
    setVolumeEfek(v) { ASET.volumeEfek = v; },
    cekNarasi, hentiNarasi,
    get st() { return st; }
  };
})();
