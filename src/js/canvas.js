// ============================================================
// BLOOD CANVAS — background atmosphere
// ============================================================
(function () {
  const cv = document.getElementById('bgc'), cx = cv.getContext('2d');
  let W, H, drips = [], splats = [];

  function rsz() { W = cv.width = innerWidth; H = cv.height = innerHeight; mk(); }

  function mk() {
    splats = [];
    for (let i = 0; i < 30; i++)
      splats.push({ x: Math.random() * W, y: Math.random() * H * 0.95, rx: 3 + Math.random() * 65, ry: 2 + Math.random() * 30, a: 0.03 + Math.random() * 0.28, rot: Math.random() * Math.PI, c: Math.random() > 0.55 ? '#1a0000' : '#380000' });
    drips = [];
    for (let i = 0; i < 20; i++)
      drips.push({ x: Math.random() * W, y: -50 - Math.random() * H * 0.25, len: 8, spd: 0.08 + Math.random() * 0.32, w: 0.5 + Math.random() * 3.2, a: 0.28 + Math.random() * 0.55, maxL: 60 + Math.random() * H * 0.75, done: false });
  }

  let fv = 1, ft = 1, ftm = 0;

  function draw() {
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = '#030102';
    cx.fillRect(0, 0, W, H);
    ftm--;
    if (ftm <= 0) { ft = 0.75 + Math.random() * 0.25; ftm = 50 + Math.random() * 150; }
    fv += (ft - fv) * 0.05;
    cx.fillStyle = `rgba(0,0,0,${0.25 * (1 - fv)})`;
    cx.fillRect(0, 0, W, H);
    splats.forEach(s => {
      cx.save(); cx.translate(s.x, s.y); cx.rotate(s.rot);
      cx.globalAlpha = s.a * fv; cx.fillStyle = s.c;
      cx.beginPath(); cx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2); cx.fill(); cx.restore();
    });
    drips.forEach(d => {
      if (!d.done) { d.len = Math.min(d.len + d.spd, d.maxL); if (d.len >= d.maxL) d.done = true; }
      cx.globalAlpha = d.a * fv; cx.strokeStyle = '#5a0000'; cx.lineWidth = d.w;
      cx.beginPath(); cx.moveTo(d.x, d.y); cx.lineTo(d.x, d.y + d.len); cx.stroke();
      cx.fillStyle = '#8a0000'; cx.globalAlpha = d.a * 0.72 * fv;
      cx.beginPath(); cx.arc(d.x, d.y + d.len, d.w * 1.7, 0, Math.PI * 2); cx.fill();
    });
    cx.globalAlpha = 1;
    // Face pareidolia — faint at high dark score
    if (typeof scores !== 'undefined' && scores.dark >= 14) {
      const fa = Math.min((scores.dark - 14) / 8, 1) * 0.06;
      if (fa > 0) {
        const fx = W * 0.5, fy = H * 0.45, fr = Math.min(W, H) * 0.18;
        cx.globalAlpha = fa;
        cx.fillStyle = '#3a0000';
        cx.beginPath(); cx.ellipse(fx - fr * 0.32, fy - fr * 0.18, fr * 0.09, fr * 0.06, 0, 0, Math.PI * 2); cx.fill();
        cx.beginPath(); cx.ellipse(fx + fr * 0.32, fy - fr * 0.18, fr * 0.09, fr * 0.06, 0, 0, Math.PI * 2); cx.fill();
        cx.strokeStyle = '#3a0000'; cx.lineWidth = fr * 0.04;
        cx.beginPath(); cx.arc(fx, fy + fr * 0.08, fr * 0.28, 0.22, Math.PI - 0.22); cx.stroke();
        cx.globalAlpha = 1;
      }
    }
    requestAnimationFrame(draw);
  }

  rsz(); draw(); addEventListener('resize', rsz);
})();

// ============================================================
// GORE SCENES — 8 unique canvas-drawn images
// ============================================================
function drawGoreScene(ctx, W, H, scene) {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  switch (scene) {

    case 0: { // Lacerated hand
      const hw = W * 0.18, hh = H * 0.40;
      ctx.fillStyle = '#1a0906'; ctx.strokeStyle = '#440000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, cy + hh * 0.08, hw, hh * 0.9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      [-0.56, -0.28, 0, 0.28, 0.52].forEach((off, i) => {
        ctx.fillStyle = '#1a0906'; ctx.beginPath();
        ctx.ellipse(cx + off * hw * 1.65, cy - hh * 0.38, hw * 0.13, hh * 0.28 + i * H * 0.005, off * 0.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      });
      for (let i = 0; i < 6; i++) {
        const y = cy - hh * 0.18 + i * hh * 0.09;
        ctx.strokeStyle = `rgba(${160 + i * 8},0,0,${0.65 + i * 0.05})`; ctx.lineWidth = 1.5 + i * 0.4;
        ctx.beginPath(); ctx.moveTo(cx - hw * 0.75, y);
        for (let x = cx - hw * 0.75; x < cx + hw * 0.75; x += 7) ctx.lineTo(x + (Math.random() - 0.5) * 5, y + (Math.random() - 0.5) * 4);
        ctx.stroke();
        for (let d = 0; d < 4; d++) {
          const bx = cx - hw * 0.65 + d * (hw * 1.3 / 3);
          ctx.fillStyle = `rgba(180,0,0,0.8)`;
          ctx.beginPath(); ctx.moveTo(bx, y);
          ctx.lineTo(bx - 4, y + H * 0.025 * (0.6 + Math.random() * 0.6));
          ctx.lineTo(bx + 4, y + H * 0.025 * (0.6 + Math.random() * 0.6));
          ctx.closePath(); ctx.fill();
        }
      }
      ctx.fillStyle = '#2a0000'; ctx.beginPath(); ctx.ellipse(cx, cy + hh * 0.04, hw * 0.22, hh * 0.08, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#770000'; ctx.beginPath(); ctx.ellipse(cx, cy + hh * 0.04, hw * 0.1, hh * 0.035, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }

    case 1: { // Hemorrhaging eye
      const er = Math.min(W, H) * 0.29;
      ctx.fillStyle = '#e0ccb4'; ctx.strokeStyle = '#330000'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(cx, cy, er, er * 0.57, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      for (let v = 0; v < 22; v++) {
        const a = Math.random() * Math.PI * 2, sr = er * 0.3;
        ctx.strokeStyle = `rgba(${130 + Math.floor(Math.random() * 90)},0,0,${0.35 + Math.random() * 0.55})`; ctx.lineWidth = 0.5 + Math.random() * 1.8;
        ctx.beginPath(); let px = cx + Math.cos(a) * sr, py = cy + Math.sin(a) * sr * 0.55; ctx.moveTo(px, py);
        for (let s = 0; s < 5; s++) { px += Math.cos(a + (Math.random() - 0.5) * 0.8) * er * 0.11; py += Math.sin(a + (Math.random() - 0.5) * 0.8) * er * 0.065; px = Math.min(cx + er * 0.88, Math.max(cx - er * 0.88, px)); py = Math.min(cy + er * 0.5, Math.max(cy - er * 0.5, py)); ctx.lineTo(px, py); }
        ctx.stroke();
      }
      const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, er * 0.35);
      gr.addColorStop(0, '#000'); gr.addColorStop(0.6, '#1a0000'); gr.addColorStop(1, '#280410');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, er * 0.35, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, er * 0.24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(140,0,0,0.85)'; ctx.beginPath(); ctx.ellipse(cx, cy + er * 0.4, er * 0.52, er * 0.13, 0, 0, Math.PI * 2); ctx.fill();
      for (let t = 0; t < 6; t++) {
        const tx = cx - er * 0.35 + t * er * 0.14;
        ctx.strokeStyle = '#bb0000'; ctx.lineWidth = 1.5 + Math.random();
        ctx.beginPath(); ctx.moveTo(tx, cy + er * 0.56);
        for (let s = 0; s < 5; s++) ctx.lineTo(tx + (Math.random() - 0.5) * 7, cy + er * 0.56 + s * H * 0.038);
        ctx.stroke();
      }
      ctx.strokeStyle = '#1a0000'; ctx.lineWidth = 1.5;
      for (let l = -7; l <= 7; l++) {
        const lx = cx + l * (er * 0.12);
        if (Math.abs(lx - cx) > er * 0.88) continue;
        const topY = cy - Math.sqrt(Math.max(0, 1 - Math.pow((lx - cx) / er, 2))) * er * 0.55;
        ctx.beginPath(); ctx.moveTo(lx, topY); ctx.lineTo(lx + l * 2, topY - H * 0.022); ctx.stroke();
      }
      break;
    }

    case 2: { // Stitched mouth
      const mw = W * 0.34, mh = H * 0.12;
      ctx.fillStyle = '#350808'; ctx.strokeStyle = '#500000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - mw, cy); ctx.bezierCurveTo(cx - mw * 0.5, cy - mh * 1.3, cx - mw * 0.1, cy - mh * 0.9, cx, cy - mh * 0.35);
      ctx.bezierCurveTo(cx + mw * 0.1, cy - mh * 0.9, cx + mw * 0.5, cy - mh * 1.3, cx + mw, cy); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - mw, cy); ctx.bezierCurveTo(cx - mw * 0.65, cy + mh * 1.6, cx, cy + mh * 2, cx + mw, cy); ctx.fill(); ctx.stroke();
      const ns = 10;
      for (let i = 0; i < ns; i++) {
        const sx = cx - mw * 0.88 + (i / ns) * mw * 1.76;
        const sy1 = cy - mh * 0.45, sy2 = cy + mh * 0.95;
        ctx.strokeStyle = '#180000'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(sx, sy1); ctx.lineTo(sx, sy2); ctx.stroke();
        ctx.strokeStyle = '#250000'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(sx - 8, sy1 + mh * 0.1); ctx.lineTo(sx + 8, sy1 + mh * 0.65); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx - 8, sy2 - mh * 0.1); ctx.lineTo(sx + 8, sy2 - mh * 0.55); ctx.stroke();
        ctx.fillStyle = 'rgba(170,0,0,0.75)';
        ctx.beginPath(); ctx.arc(sx, sy1, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy2, 3.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = 'rgba(100,0,0,0.45)';
      for (let b = 0; b < 14; b++) {
        const bx = cx - mw * 0.9 + Math.random() * mw * 1.8;
        const by = cy + mh * 0.5 + Math.random() * mh * 1.5;
        ctx.beginPath(); ctx.ellipse(bx, by, 3 + Math.random() * 12, 2 + Math.random() * 5, Math.random() * Math.PI, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }

    case 3: { // Cracked skull
      const sr = Math.min(W, H) * 0.32;
      ctx.fillStyle = '#d4c9b0'; ctx.strokeStyle = '#3a0000'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - sr);
      ctx.bezierCurveTo(cx + sr * 0.9, cy - sr * 0.8, cx + sr * 0.95, cy + sr * 0.1, cx + sr * 0.55, cy + sr * 0.55);
      ctx.lineTo(cx - sr * 0.55, cy + sr * 0.55);
      ctx.bezierCurveTo(cx - sr * 0.95, cy + sr * 0.1, cx - sr * 0.9, cy - sr * 0.8, cx, cy - sr);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.moveTo(cx, cy + sr * 0.12); ctx.lineTo(cx - sr * 0.09, cy + sr * 0.3); ctx.lineTo(cx + sr * 0.09, cy + sr * 0.3); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#500000'; ctx.lineWidth = 4.5;
      ctx.beginPath(); let cpx = cx + sr * 0.08, cpy = cy - sr * 0.9; ctx.moveTo(cpx, cpy);
      for (let s = 0; s < 9; s++) { cpx += (Math.random() - 0.4) * sr * 0.22; cpy += sr * 0.14; ctx.lineTo(cpx, cpy); }
      ctx.stroke();
      for (let c = 0; c < 6; c++) {
        ctx.strokeStyle = `rgba(70,0,0,${0.35 + c * 0.08})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); let px = cpx + (Math.random() - 0.5) * sr * 0.35, py = cpy - Math.random() * sr * 0.35; ctx.moveTo(px, py);
        for (let s = 0; s < 4; s++) { px += (Math.random() - 0.5) * sr * 0.22; py += Math.random() * sr * 0.12; ctx.lineTo(px, py); }
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(15,0,0,0.85)';
      ctx.beginPath(); ctx.moveTo(cpx - sr * 0.14, cpy); ctx.bezierCurveTo(cpx - sr * 0.08, cpy + sr * 0.16, cpx + sr * 0.08, cpy + sr * 0.16, cpx + sr * 0.14, cpy); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#770000';
      for (let d = 0; d < 5; d++) { const dx = cpx - sr * 0.1 + d * sr * 0.05; ctx.beginPath(); ctx.moveTo(dx, cpy + sr * 0.05); ctx.lineTo(dx - 3, cpy + sr * 0.05 + H * 0.035 * (0.8 + Math.random())); ctx.lineTo(dx + 4, cpy + sr * 0.05 + H * 0.035 * (0.8 + Math.random())); ctx.closePath(); ctx.fill(); }
      break;
    }

    case 4: { // Dissolving figure
      const fh = H * 0.58, fw = W * 0.15;
      ctx.strokeStyle = 'rgba(175,35,35,0.9)'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.arc(cx, cy - fh * 0.44, fw * 0.29, 0, Math.PI * 2); ctx.stroke();
      [[cx, cy - fh * 0.32, cx, cy + fh * 0.06], [cx, cy - fh * 0.22, cx - fw * 0.75, cy - fh * 0.04], [cx, cy - fh * 0.22, cx + fw * 0.85, cy + fh * 0.04], [cx, cy + fh * 0.06, cx - fw * 0.52, cy + fh * 0.46], [cx, cy + fh * 0.06, cx + fw * 0.52, cy + fh * 0.46]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      });
      for (let p = 0; p < 240; p++) {
        const dist = Math.random(), angle = Math.random() * Math.PI * 2, r = fw * 0.55 + dist * W * 0.38;
        const px = cx + Math.cos(angle) * r, py = cy + Math.sin(angle) * r * 0.72 + (dist * H * 0.18);
        const sz = Math.max(1, 4.5 * (1 - dist)), al = 1 - dist;
        ctx.fillStyle = `rgba(${100 + Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 15)},${Math.floor(Math.random() * 15)},${al})`;
        ctx.fillRect(px, py, sz, sz);
      }
      const hg = ctx.createRadialGradient(cx, cy + fh * 0.52, 0, cx, cy + fh * 0.52, fw * 1.8);
      hg.addColorStop(0, 'rgba(0,0,0,0.92)'); hg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.ellipse(cx, cy + fh * 0.52, fw * 1.8, fw * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }

    case 5: { // Hands covering face
      const hw = W * 0.4, hh = H * 0.48;
      ctx.fillStyle = 'rgba(28,8,4,0.9)'; ctx.beginPath(); ctx.ellipse(cx, cy, hw * 0.56, hh * 0.62, 0, 0, Math.PI * 2); ctx.fill();
      [-1, 1].forEach(s => {
        ctx.fillStyle = 'rgba(180,155,130,0.22)'; ctx.beginPath(); ctx.ellipse(cx + s * hw * 0.22, cy - hh * 0.05, hw * 0.1, hh * 0.042, 0, 0, Math.PI * 2); ctx.fill();
      });
      [-1, 1].forEach(s => {
        const hx = cx + s * hw * 0.08;
        ctx.fillStyle = '#190705'; ctx.strokeStyle = '#360000'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(hx, cy + hh * 0.04, hw * 0.36, hh * 0.44, s * 0.18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        [-0.46, -0.22, 0.04, 0.3].forEach((off, fi) => {
          ctx.fillStyle = '#190705'; ctx.beginPath();
          ctx.ellipse(hx + off * hw * 0.62, cy - hh * 0.26 - fi * hh * 0.03, hw * 0.075, hh * 0.21, off * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        });
        [-0.42, -0.18, 0.08, 0.34].forEach(off => {
          ctx.strokeStyle = `rgba(${160 + Math.floor(Math.random() * 40)},0,0,0.82)`; ctx.lineWidth = 2 + Math.random();
          ctx.beginPath(); ctx.moveTo(hx + off * hw * 0.55, cy - hh * 0.23);
          for (let seg = 0; seg < 4; seg++) ctx.lineTo(hx + off * hw * 0.55 + (Math.random() - 0.5) * 11, cy - hh * 0.23 + seg * hh * 0.092);
          ctx.stroke();
        });
      });
      const bg = ctx.createRadialGradient(cx, cy + hh * 0.52, 0, cx, cy + hh * 0.52, hw * 0.85);
      bg.addColorStop(0, 'rgba(110,0,0,0.72)'); bg.addColorStop(1, 'rgba(70,0,0,0)');
      ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(cx, cy + hh * 0.52, hw * 0.85, hh * 0.2, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }

    case 6: { // Distorted face
      ctx.fillStyle = '#07000a'; ctx.fillRect(0, 0, W, H);
      const r = Math.min(W, H) * 0.43;
      ctx.strokeStyle = 'rgba(110,0,0,0.6)'; ctx.lineWidth = 1.5;
      [[0, 0], [W, 0], [0, H], [W, H]].forEach(([ox, oy]) => {
        for (let c = 0; c < 4; c++) {
          ctx.beginPath(); ctx.moveTo(ox, oy); let px = ox, py = oy;
          for (let i = 0; i < 9; i++) { px += (cx - ox) / 10 + (Math.random() - 0.5) * 80; py += (cy - oy) / 10 + (Math.random() - 0.5) * 80; ctx.lineTo(px, py); }
          ctx.stroke();
        }
      });
      ctx.strokeStyle = '#c80000'; ctx.lineWidth = 3.5; ctx.fillStyle = '#0c0005';
      ctx.beginPath();
      for (let a = 0, first = true; a <= Math.PI * 2 + 0.1; a += 0.04) {
        const dr = r + Math.sin(a * 7) * r * 0.07 + Math.sin(a * 13) * r * 0.04 + Math.sin(a * 23) * r * 0.015;
        const x = cx + Math.cos(a) * dr, y = cy + Math.sin(a) * dr;
        first ? (ctx.moveTo(x, y), first = false) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();
      for (let v = 0; v < 8; v++) {
        ctx.strokeStyle = `rgba(90,0,0,${0.1 + v * 0.025})`; ctx.lineWidth = 0.8;
        ctx.beginPath(); const vx = cx - r * 0.75 + Math.random() * r * 1.5, vy = cy - r * 0.75 + Math.random() * r * 1.5; ctx.moveTo(vx, vy);
        for (let s = 0; s < 5; s++) ctx.lineTo(vx + (Math.random() - 0.5) * r * 0.32, vy + (Math.random() - 0.5) * r * 0.32);
        ctx.stroke();
      }
      [-1, 1].forEach((s, i) => {
        const ex = cx + s * r * (0.29 + i * 0.05), ey = cy - r * 0.13 + (i * r * 0.07), er2 = r * (0.19 + i * 0.04);
        ctx.fillStyle = 'rgba(195,155,125,0.9)'; ctx.beginPath(); ctx.ellipse(ex, ey, er2, er2 * 0.7, s * 0.28, 0, Math.PI * 2); ctx.fill();
        for (let v = 0; v < 10; v++) {
          const va = Math.random() * Math.PI * 2;
          ctx.strokeStyle = `rgba(190,0,0,${0.4 + Math.random() * 0.5})`; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(ex + Math.cos(va) * er2 * 0.28, ey + Math.sin(va) * er2 * 0.2);
          ctx.lineTo(ex + Math.cos(va) * er2 * 0.88, ey + Math.sin(va) * er2 * 0.62); ctx.stroke();
        }
        ctx.fillStyle = '#5a0000'; ctx.beginPath(); ctx.arc(ex, ey, er2 * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(ex, ey, er2 * 0.09, er2 * 0.32, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#aa0000'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(ex, ey + er2 * 0.7);
        for (let sg = 0; sg < 5; sg++) ctx.lineTo(ex + (Math.random() - 0.5) * 8, ey + er2 * 0.7 + sg * r * 0.085);
        ctx.stroke();
      });
      ctx.fillStyle = '#180000';
      ctx.beginPath(); ctx.moveTo(cx, cy + r * 0.09); ctx.lineTo(cx - r * 0.11, cy + r * 0.3); ctx.lineTo(cx + r * 0.11, cy + r * 0.3); ctx.closePath(); ctx.fill();
      const mL = cx - r * 0.54, mR = cx + r * 0.54, mY = cy + r * 0.33;
      ctx.strokeStyle = '#e00000'; ctx.lineWidth = 3.2;
      ctx.beginPath(); ctx.moveTo(mL, mY);
      for (let i = 0; i <= 22; i++) ctx.lineTo(mL + (i / 22) * (mR - mL), mY + (i % 2 === 0 ? r * 0.15 : -r * 0.13) + Math.sin(i * 1.3) * r * 0.025);
      ctx.stroke();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(mL, mY);
      for (let i = 0; i <= 22; i++) ctx.lineTo(mL + (i / 22) * (mR - mL), mY + (i % 2 === 0 ? r * 0.15 : -r * 0.13));
      ctx.lineTo(mR, mY + r * 0.12); ctx.lineTo(mL, mY + r * 0.12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(215,195,160,0.82)';
      for (let t = 0; t < 14; t++) {
        const tx = mL + r * 0.04 + t * (mR - mL - r * 0.08) / 13;
        const jag = mY + (t % 2 === 0 ? r * 0.15 : -r * 0.13) * 0.88;
        ctx.beginPath(); ctx.moveTo(tx, jag); ctx.lineTo(tx - 7, jag + r * 0.08); ctx.lineTo(tx + 7, jag + r * 0.08); ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = 'rgba(130,0,0,0.38)'; ctx.font = `${Math.floor(r * 0.065)}px monospace`;
      ctx.fillText('01110110 01101111 01101001 01100100', cx - r * 0.62, cy + r * 0.74);
      break;
    }

    case 7: { // Exposed spine
      const sh = H * 0.66, sw = W * 0.16;
      ctx.fillStyle = '#190707'; ctx.strokeStyle = '#360000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, cy, sw * 1.1, sh * 0.52, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      const nv = 13;
      for (let v = 0; v < nv; v++) {
        const vy = cy - sh * 0.42 + (v / nv) * sh * 0.84;
        ctx.fillStyle = 'rgba(215,195,165,0.82)'; ctx.strokeStyle = '#500000'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.rect(cx - sw * 0.24, vy - H * 0.018, sw * 0.48, H * 0.03); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(195,175,145,0.62)'; ctx.beginPath(); ctx.arc(cx, vy, sw * 0.1, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = '#c80000'; ctx.lineWidth = 3.5;
      ctx.beginPath(); let wy = cy - sh * 0.4; ctx.moveTo(cx + sw * 0.38, wy);
      while (wy < cy + sh * 0.4) { ctx.lineTo(cx + sw * 0.38 + (Math.random() - 0.5) * sw * 0.35, wy); wy += H * 0.028; }
      ctx.stroke();
      ctx.fillStyle = 'rgba(95,18,8,0.55)'; ctx.beginPath();
      ctx.moveTo(cx + sw * 0.38, cy - sh * 0.32); ctx.bezierCurveTo(cx + sw * 0.85, cy - sh * 0.12, cx + sw * 0.95, cy + sh * 0.12, cx + sw * 0.38, cy + sh * 0.32); ctx.fill();
      ctx.fillStyle = 'rgba(155,0,0,0.62)';
      for (let d = 0; d < 10; d++) {
        const dx = cx + sw * 0.28 + Math.random() * sw * 0.35, dy = cy - sh * 0.22 + Math.random() * sh * 0.44;
        ctx.beginPath(); ctx.ellipse(dx, dy, 2 + Math.random() * 9, 1.5 + Math.random() * 4, Math.random() * Math.PI, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
  }
}
