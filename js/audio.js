// ============================================================
// ADAPTIVE AUDIO ENGINE
// ============================================================
let audioCtx, masterGain, droneOsc1, droneOsc2, droneFilter, droneGain, hbInt;
let whisperGain, tensionGain, tensionOsc;
let audioInited = false;
let hbInterval = 880;

function initAudio() {
  if (audioInited) return;
  audioInited = true;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);

    // Drone layer with heavy distortion
    droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 280;
    droneFilter.Q.value = 4;
    droneFilter.connect(masterGain);

    const dist = audioCtx.createWaveShaper();
    const cv = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = i * 2 / 256 - 1;
      cv[i] = (Math.PI + 220) * x / (Math.PI + 220 * Math.abs(x));
    }
    dist.curve = cv;
    dist.oversample = '4x';
    dist.connect(droneFilter);

    droneGain = audioCtx.createGain();
    droneGain.gain.value = 0.32;
    droneGain.connect(dist);

    droneOsc1 = audioCtx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.value = 82;
    droneOsc1.connect(droneGain);
    droneOsc1.start();

    droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type = 'sawtooth';
    droneOsc2.frequency.value = 85.5;
    droneOsc2.connect(droneGain);
    droneOsc2.start();

    // Whisper/breath noise layer
    const bsz = audioCtx.sampleRate * 4;
    const nbuf = audioCtx.createBuffer(1, bsz, audioCtx.sampleRate);
    const nd = nbuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bsz; i++) {
      last = 0.997 * last + (0.003 * (Math.random() * 2 - 1));
      nd[i] = last * 6;
    }
    const ns = audioCtx.createBufferSource();
    ns.buffer = nbuf;
    ns.loop = true;
    const nf = audioCtx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = 550;
    nf.Q.value = 0.6;
    whisperGain = audioCtx.createGain();
    whisperGain.gain.value = 0;
    ns.connect(nf);
    nf.connect(whisperGain);
    whisperGain.connect(masterGain);
    ns.start();

    // Tension pad
    tensionOsc = audioCtx.createOscillator();
    tensionOsc.type = 'sine';
    tensionOsc.frequency.value = 110;
    const tf = audioCtx.createBiquadFilter();
    tf.type = 'lowpass';
    tf.frequency.value = 300;
    tensionGain = audioCtx.createGain();
    tensionGain.gain.value = 0;
    tensionOsc.connect(tf);
    tf.connect(tensionGain);
    tensionGain.connect(masterGain);
    tensionOsc.start();

    masterGain.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 4);
    startHB();
  } catch (e) {
    console.log('Audio init failed:', e);
  }
}

function startHB() {
  if (!audioCtx) return;
  function beat() {
    const t = audioCtx.currentTime;
    [0, 0.18].forEach((off, i) => {
      const g = audioCtx.createGain();
      g.connect(masterGain);
      const o = audioCtx.createOscillator();
      o.type = 'sine';
      o.frequency.value = i ? 50 : 58;
      o.connect(g);
      const v = i ? 0.45 : 0.55;
      g.gain.setValueAtTime(0, t + off);
      g.gain.linearRampToValueAtTime(v, t + off + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + off + 0.3);
      o.start(t + off);
      o.stop(t + off + 0.35);
    });
  }
  hbInt = setInterval(beat, hbInterval);
}

function setMood(lv) {
  if (!audioCtx) return;
  const fq = [82, 80, 76, 70, 62, 52];
  const fl = [280, 420, 620, 840, 1100, 1400];
  const gv = [0.32, 0.38, 0.45, 0.52, 0.62, 0.72];
  const f = Math.min(lv, 5), t = audioCtx.currentTime;
  droneOsc1.frequency.linearRampToValueAtTime(fq[f], t + 4);
  droneOsc2.frequency.linearRampToValueAtTime(fq[f] + 3.5, t + 4);
  droneFilter.frequency.linearRampToValueAtTime(fl[f], t + 4);
  droneGain.gain.linearRampToValueAtTime(gv[f], t + 2);
}

function screech() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [[900, 0.85], [380, 0.5], [1900, 0.22]].forEach(([freq, vol], i) => {
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    const o = audioCtx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    o.connect(g);
    g.gain.setValueAtTime(0, t + i * 0.025);
    g.gain.linearRampToValueAtTime(vol, t + i * 0.025 + 0.04);
    g.gain.linearRampToValueAtTime(vol * 0.55, t + 0.14);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.62);
    o.frequency.linearRampToValueAtTime(freq * 0.15, t + 0.62);
    o.start(t + i * 0.025);
    o.stop(t + 0.68);
  });
  // Body thud
  const tg = audioCtx.createGain();
  tg.connect(audioCtx.destination);
  const to = audioCtx.createOscillator();
  to.type = 'sine';
  to.frequency.value = 75;
  to.connect(tg);
  tg.gain.setValueAtTime(0.95, t);
  tg.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  to.start(t);
  to.stop(t + 0.3);
}

function playAnswerTone(darkScore) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  if (darkScore >= 2) {
    [[370, 0.07], [392, 0.05]].forEach(([f, v], i) => {
      const g = audioCtx.createGain();
      g.connect(masterGain);
      const o = audioCtx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(g);
      g.gain.setValueAtTime(0, t + i * 0.012);
      g.gain.linearRampToValueAtTime(v, t + i * 0.012 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      o.start(t + i * 0.012);
      o.stop(t + 0.42);
    });
  } else {
    const g = audioCtx.createGain();
    g.connect(masterGain);
    const o = audioCtx.createOscillator();
    o.type = 'sine';
    o.frequency.value = 310;
    o.connect(g);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.038, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    o.start(t);
    o.stop(t + 0.16);
  }
}

function triggerSilence() {
  if (!audioCtx || silenceDone) return;
  silenceDone = true;
  const t = audioCtx.currentTime;
  masterGain.gain.linearRampToValueAtTime(0, t + 1.8);
  setTimeout(() => {
    if (!audioCtx) return;
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    silenceWaiting = true;
  }, 2400);
}

function addReversedSting() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [[35, 950, 0.55], [180, 1900, 0.28]].forEach(([fS, fE, vol]) => {
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    const o = audioCtx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(fS, t);
    o.frequency.linearRampToValueAtTime(fE, t + 0.48);
    o.connect(g);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.44);
    g.gain.linearRampToValueAtTime(0, t + 0.5);
    o.start(t);
    o.stop(t + 0.55);
  });
}

function updateAdaptiveAudio() {
  if (!audioCtx) return;
  const dark = scores.dark, t = audioCtx.currentTime;
  whisperGain.gain.linearRampToValueAtTime(Math.min(dark / 18, 0.2), t + 3);
  tensionGain.gain.linearRampToValueAtTime(Math.min(dark / 22, 0.14), t + 5);
  if (dark >= 6) {
    const newInterval = Math.max(580, 880 - (dark - 5) * 50);
    if (Math.abs(newInterval - hbInterval) > 30) {
      hbInterval = newInterval;
      clearInterval(hbInt);
      startHB();
    }
  }
  if (dark >= 10) {
    droneOsc1.frequency.linearRampToValueAtTime(52, t + 10);
    droneOsc2.frequency.linearRampToValueAtTime(55.2, t + 10);
  }
  if (dark >= 15 && Math.random() < 0.25) {
    const gg = audioCtx.createGain();
    gg.connect(audioCtx.destination);
    const go = audioCtx.createOscillator();
    go.type = 'square';
    go.frequency.value = 150 + Math.random() * 1000;
    go.connect(gg);
    gg.gain.setValueAtTime(0, t);
    gg.gain.linearRampToValueAtTime(0.035, t + 0.015);
    gg.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    go.start(t);
    go.stop(t + 0.1);
  }
  // Vignette tightening
  const vgPct = Math.max(4, 18 - dark * 1.1);
  document.documentElement.style.setProperty('--vg', vgPct.toFixed(1) + '%');
  // Screen breathing
  if (dark >= 5) {
    const scale = 1 + dark * 0.00035;
    const spd = Math.max(2.5, 5 - dark * 0.15);
    document.documentElement.style.setProperty('--breath', scale.toFixed(4));
    document.documentElement.style.setProperty('--breath-spd', spd.toFixed(1) + 's');
    document.body.classList.add('breathing');
  }
  // Ghost messages start at dark >= 7
  if (dark >= 7 && !ghostTimer) scheduleGhost();
}
