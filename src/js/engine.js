// ============================================================
// STATE
// ============================================================
let curQ = 0, scores = { dark: 0, empathy: 0, honest: 0, control: 0 };
let tabScareTriggered = false;
let gameStarted = false;
let memQ1 = -1, memQ8 = -1, memQ22 = -1;
let silenceDone = false, silenceWaiting = false, crashDone = false;
let hesitTimer = null, ghostTimer = null, ghostIdx = 0;

const GHOST_MSGS = [
  "you're still here", "it's watching", "don't look away", "we already know",
  "you can't undo this", "something is wrong with you", "it remembers everything",
  "you lied", "almost done", "keep going"
];

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function show(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    setTimeout(() => { if (!s.classList.contains('active')) s.style.visibility = 'hidden'; }, 750);
  });
  const el = document.getElementById(id);
  el.style.visibility = 'visible';
  requestAnimationFrame(() => el.classList.add('active'));
}

// ============================================================
// JUMPSCARE ENGINE
// ============================================================
function jumpscare(cb, sceneIdx) {
  const sc = sceneIdx !== undefined ? sceneIdx : 6;
  const cv = document.getElementById('jsc');
  cv.width = innerWidth; cv.height = innerHeight; cv.style.display = 'block';
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  screech();
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  setTimeout(() => { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); drawGoreScene(ctx, W, H, sc); }, 55);
  setTimeout(() => { ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.fillRect(0, 0, W, H); }, 190);
  setTimeout(() => { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); drawGoreScene(ctx, W, H, sc); }, 265);
  setTimeout(() => { ctx.fillStyle = 'rgba(200,0,0,0.2)'; ctx.fillRect(0, 0, W, H); }, 340);
  setTimeout(() => {
    cv.style.display = 'none';
    document.body.style.animation = 'shake 0.55s ease';
    setTimeout(() => { document.body.style.animation = ''; if (cb) cb(); }, 560);
  }, 420);
}

// ============================================================
// ADAPTIVE COUNTER — lies at high dark score
// ============================================================
function getCounterText(qIdx) {
  if (scores.dark >= 13) {
    const lies = ['∞', QS.length + 4, QS.length + 9, '?', QS.length * 2, '∞'];
    return `Question ${qIdx + 1} of ${lies[qIdx % lies.length]}`;
  }
  return `Question ${qIdx + 1} of ${QS.length}`;
}

// ============================================================
// GHOST MESSAGES
// ============================================================
function showGhost() {
  const el = document.getElementById('ghost-msg');
  if (!el || !gameStarted) return;
  el.textContent = GHOST_MSGS[ghostIdx % GHOST_MSGS.length];
  ghostIdx++;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 4200);
}

function scheduleGhost() {
  if (ghostTimer) clearTimeout(ghostTimer);
  if (!gameStarted || scores.dark < 7) return;
  ghostTimer = setTimeout(() => { showGhost(); scheduleGhost(); }, 16000 + Math.random() * 18000);
}

// ============================================================
// FAKE CRASH
// ============================================================
function fakeCrash() {
  if (crashDone || curQ < 5) return;
  crashDone = true;
  const ov = document.getElementById('crash-ov');
  const pctEl = document.getElementById('cr-pct');
  ov.style.display = 'block';
  let p = 0;
  const iv = setInterval(() => {
    p += Math.floor(Math.random() * 9 + 2);
    if (p >= 100) { p = 100; clearInterval(iv); }
    pctEl.textContent = p;
  }, 160);
  setTimeout(() => { ov.style.display = 'none'; clearInterval(iv); }, 3000);
}

// ============================================================
// FAKE LOADING SCREEN
// ============================================================
function showFakeLoad(cb) {
  show('fake-load');
  const bar = document.getElementById('fl-bar');
  const sub = document.getElementById('fl-sub');
  const steps = [
    { p: 18, d: 700, m: 'Mapping responses\u2026' },
    { p: 43, d: 900, m: 'Cross-referencing patterns\u2026' },
    { p: 39, d: 550, m: 'Something is wrong.' },
    { p: 67, d: 800, m: 'Recalculating\u2026' },
    { p: 91, d: 650, m: 'Almost done\u2026' },
    { p: 100, d: 350, m: '' }
  ];
  let i = 0;
  function step() {
    if (i >= steps.length) { setTimeout(() => cb(), 500); return; }
    const s = steps[i++];
    bar.style.width = s.p + '%';
    sub.textContent = s.m;
    setTimeout(step, s.d);
  }
  setTimeout(step, 400);
}

// ============================================================
// TYPEWRITER EFFECTS
// ============================================================
function typeResultWord(word, el, cb) {
  el.textContent = ''; el.style.opacity = '1'; el.style.animation = 'none';
  let i = 0;
  const iv = setInterval(() => {
    if (i < word.length) { el.textContent += word[i++]; }
    else { clearInterval(iv); if (cb) cb(); }
  }, 120);
}

function typeWithErrors(text, el, onDone) {
  const typoAt = Math.floor(text.length * 0.42);
  let i = 0, typed = '', errored = false;
  function next() {
    if (i === typoAt && !errored) {
      errored = true; typed += 'x'; el.textContent = typed + '|';
      setTimeout(() => { typed = typed.slice(0, -1); el.textContent = typed + '|'; setTimeout(next, 160); }, 420);
      return;
    }
    if (i < text.length) { typed += text[i++]; el.textContent = typed + '|'; setTimeout(next, 22 + Math.random() * 28); }
    else { el.textContent = text; if (onDone) onDone(); }
  }
  el.classList.add('show'); el.textContent = '|'; next();
}

// ============================================================
// GAME FLOW
// ============================================================
function agePass() { show('intro'); }

function startGame() {
  initAudio();
  curQ = 0; scores = { dark: 0, empathy: 0, honest: 0, control: 0 };
  memQ1 = -1; memQ8 = -1; memQ22 = -1; gameStarted = true;
  silenceDone = false; silenceWaiting = false; crashDone = false; ghostIdx = 0;
  if (ghostTimer) { clearTimeout(ghostTimer); ghostTimer = null; }
  document.body.classList.remove('breathing');
  document.documentElement.style.setProperty('--vg', '18%');
  show('qs'); renderQ();
}

function renderQ() {
  const q = QS[curQ];
  const ctrEl = document.getElementById('qctr');
  ctrEl.textContent = getCounterText(curQ);
  ctrEl.classList.toggle('lying', scores.dark >= 13);

  const fill = document.getElementById('pfill');
  fill.style.width = `${(curQ / QS.length) * 100}%`;
  fill.classList.toggle('pulse', scores.dark >= 12);
  fill.classList.toggle('bleed', scores.dark >= 12);
  setMood(q.mood || 2);

  const qtxt = document.getElementById('qtext');
  const qopts = document.getElementById('qopts');
  const rx = document.getElementById('reaction');
  const hesit = document.getElementById('hesit');

  qtxt.classList.remove('show', 'glitch');
  if (window._glitchTimer) { clearTimeout(window._glitchTimer); window._glitchTimer = null; }
  if (hesitTimer) { clearTimeout(hesitTimer); hesitTimer = null; }
  rx.classList.remove('show'); rx.textContent = '';
  hesit.style.opacity = '0'; hesit.textContent = '';
  qopts.innerHTML = '';

  setTimeout(() => {
    if (curQ === 12) {
      typeWithErrors(q.text, qtxt, () => {});
    } else {
      qtxt.textContent = q.text; qtxt.classList.add('show');
    }

    if (scores.dark >= 10) {
      if (window._glitchTimer) clearTimeout(window._glitchTimer);
      const scheduleGlitch = () => {
        const delay = 3000 + Math.random() * 4000;
        window._glitchTimer = setTimeout(() => {
          const el = document.getElementById('qtext');
          if (!el || !el.classList.contains('show')) return;
          el.classList.remove('glitch'); void el.offsetHeight; el.classList.add('glitch');
          setTimeout(() => el.classList.remove('glitch'), 380);
          scheduleGlitch();
        }, delay);
      };
      setTimeout(scheduleGlitch, 800);
    }

    const hesitMsgs = [
      "you already know the answer", "still thinking?", "it can wait", "take your time",
      "you've been here before", "this one is harder to admit"
    ];
    hesitTimer = setTimeout(() => {
      hesit.textContent = hesitMsgs[Math.floor(Math.random() * hesitMsgs.length)];
      hesit.style.opacity = '1';
      hesitTimer = setTimeout(() => {
        hesit.style.opacity = '0';
        setTimeout(() => { hesit.textContent = "we both know."; hesit.style.opacity = '1'; }, 2000);
      }, 8000);
    }, 8000);
  }, 80);

  ['A', 'B', 'C', 'D'].forEach((ltr, i) => {
    if (!q.opts[i]) return;
    const btn = document.createElement('button');
    btn.className = 'qopt';
    btn.innerHTML = `<span class="okey">${ltr}</span><span class="otxt">${q.opts[i].t}</span>`;
    btn.addEventListener('click', () => pick(i));
    qopts.appendChild(btn);
    setTimeout(() => btn.classList.add('show'), 180 + i * 90);
  });
}

function pick(idx) {
  const q = QS[curQ]; const opt = q.opts[idx];
  if (hesitTimer) { clearTimeout(hesitTimer); hesitTimer = null; }
  document.getElementById('hesit').style.opacity = '0';

  const allOpts = document.querySelectorAll('.qopt');
  allOpts.forEach(b => b.style.pointerEvents = 'none');
  allOpts[idx] && allOpts[idx].classList.add('chosen');
  setTimeout(() => { allOpts[idx] && allOpts[idx].classList.remove('chosen'); }, 600);

  playAnswerTone(opt.dark || 0);

  if (curQ === 0) memQ1 = idx;
  if (curQ === 7) memQ8 = idx;
  if (curQ === 21) memQ22 = idx;

  ['dark', 'empathy', 'honest', 'control'].forEach(k => { if (opt[k]) scores[k] += opt[k]; });
  updateAdaptiveAudio();

  if (curQ === 10) triggerSilence();
  if (curQ === 11 && silenceWaiting && audioCtx) {
    silenceWaiting = false;
    masterGain.gain.linearRampToValueAtTime(0.42, audioCtx.currentTime + 0.8);
  }
  if (curQ >= 5 && curQ <= 9 && scores.dark >= 5 && !crashDone && Math.random() < 0.35)
    setTimeout(fakeCrash, 1200);

  let rxText = q.rx[idx];
  if (curQ === 14 && memQ1 === 0) rxText += " You said you've wanted to hurt someone. Whatever this worst thing is — it exists in the same person who had that curiosity.";
  if (curQ === 16 && memQ8 === 3) rxText += " You wanted to erase yourself earlier. And now you wonder if you're good. You see the connection. You've always seen it.";

  const rx = document.getElementById('reaction');
  rx.textContent = rxText;
  setTimeout(() => rx.classList.add('show'), 120);

  const doJS = q.jsOn && q.jsOn.includes(idx);
  const delay = doJS ? 1400 : 1900;
  if (doJS) setTimeout(() => jumpscare(null, q.jsScene || 6), 900);

  setTimeout(() => {
    curQ++;
    if (curQ >= QS.length) { showResult(); return; }
    const prev = QS[curQ - 1];
    if (prev.interlude && prev.interlude.after) {
      showInterlude(prev.interlude.txt, () => {
        const qs = document.getElementById('qs');
        qs.style.opacity = '0';
        setTimeout(() => { qs.style.opacity = '1'; show('qs'); renderQ(); }, 350);
      });
    } else {
      const qs = document.getElementById('qs');
      qs.style.opacity = '0';
      setTimeout(() => { qs.style.opacity = '1'; renderQ(); }, 350);
    }
  }, delay);
}

function showInterlude(txt, cb) {
  document.getElementById('ilu-txt').innerHTML = txt.replace(/\n/g, '<br>');
  show('ilu');
  setTimeout(() => cb(), 3400);
}

// ============================================================
// RESULT
// ============================================================
function getProfile() {
  const { dark, empathy, honest, control } = scores;
  const total = dark + empathy + honest + control;
  if (memQ1 === 1 && memQ8 === 3 && memQ22 === 2) return PROFILES.mirror;
  if (total < 6) return PROFILES.absence;
  if (dark >= 12 && empathy < 2) return PROFILES.predator;
  if (dark >= 8 && honest >= 7) return PROFILES.shadow;
  if (empathy >= 6 && dark < 4) return PROFILES.saint;
  if (honest >= 10) return PROFILES.fracture;
  if (control >= 7 && dark >= 5 && dark < 12) return PROFILES.architect;
  if (empathy >= 4 && dark >= 6 && honest >= 5) return PROFILES.fracturedSaint;
  if (total < 10) return PROFILES.hollow;
  return PROFILES.survivor;
}

function showResult() {
  if (audioCtx) { masterGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 4); if (hbInt) clearInterval(hbInt); }
  if (ghostTimer) { clearTimeout(ghostTimer); ghostTimer = null; }
  showFakeLoad(() => {
    addReversedSting();
    jumpscare(() => {
      const p = getProfile();
      const rword = document.getElementById('rword');
      document.getElementById('rtitle').textContent = p.title;
      document.getElementById('rdesc').innerHTML = p.desc;
      document.getElementById('rwarning').textContent = p.warning || '';
      const tr = document.getElementById('rtraits'); tr.innerHTML = '';
      p.traits.forEach(t => { const sp = document.createElement('span'); sp.className = 'rtrait'; sp.textContent = t; tr.appendChild(sp); });
      document.querySelectorAll('#res .rlabel,#res .rtitle,#res .rhr,#res .rdesc,#res .rtraits,#res .rwarning,#res .ragain').forEach(el => { el.style.animation = 'none'; void el.offsetHeight; el.style.animation = ''; });
      show('res');
      setTimeout(() => typeResultWord(p.word, rword, null), 600);
    }, 6);
  });
}

function resetGame() {
  if (hesitTimer) { clearTimeout(hesitTimer); hesitTimer = null; }
  if (ghostTimer) { clearTimeout(ghostTimer); ghostTimer = null; }
  const qtxt = document.getElementById('qtext');
  const qopts = document.getElementById('qopts');
  const rx = document.getElementById('reaction');
  const hesit = document.getElementById('hesit');
  show('qs');
  qopts.innerHTML = ''; rx.textContent = ''; rx.classList.remove('show');
  hesit.style.opacity = '0'; hesit.textContent = '';
  qtxt.classList.remove('glitch');
  qtxt.textContent = 'You already know you\'ll do this again.';
  qtxt.classList.add('show');
  setTimeout(() => {
    qtxt.classList.remove('show');
    setTimeout(() => {
      curQ = 0; scores = { dark: 0, empathy: 0, honest: 0, control: 0 };
      memQ1 = -1; memQ8 = -1; memQ22 = -1; hbInterval = 880;
      gameStarted = false; silenceDone = false; silenceWaiting = false; crashDone = false; ghostIdx = 0;
      document.body.classList.remove('breathing');
      document.documentElement.style.setProperty('--vg', '18%');
      if (audioCtx) { masterGain.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 2); startHB(); }
      show('intro');
    }, 450);
  }, 1900);
}

// ============================================================
// TAB / MOUSE LEAVE SCARE
// ============================================================
document.addEventListener('mouseleave', function (e) {
  if (e.clientY <= 0 && gameStarted && !tabScareTriggered && curQ > 3) {
    tabScareTriggered = true;
    jumpscare(null, 5);
  }
});

document.addEventListener('visibilitychange', function () {
  if (document.hidden && gameStarted && curQ > 5 && !tabScareTriggered) {
    tabScareTriggered = true;
    document.addEventListener('visibilitychange', function once() {
      if (!document.hidden) {
        setTimeout(() => jumpscare(null, 6), 700);
        document.removeEventListener('visibilitychange', once);
      }
    });
  }
});
