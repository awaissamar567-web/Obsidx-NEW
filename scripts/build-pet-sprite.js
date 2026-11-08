// Slices the 4x4 pet sheet, removes the white background, aligns every frame on the cat's feet,
// and writes one horizontal sprite strip.
// Usage: node scripts/build-pet-sprite.js <sheet> public/pet/obi-sprite.webp <preview.png>
const [, , src, outPng, outPreview] = process.argv;
const sharp = require("sharp");
const TARGET_CAT_H = 128; // output cat height in px (shown at ~half size for retina)
(async () => {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const at = (k) => k * 4;
  const whiteish = (k, minV = 222, sat = 28) => { const i = at(k); if (data[i+3] < 20) return true; const r=data[i],g=data[i+1],b=data[i+2]; const mn=Math.min(r,g,b), mx=Math.max(r,g,b); return mn > minV && mx - mn < sat; };
  const bg = new Uint8Array(N);
  const flood = (seeds, test) => { const st = seeds; while (st.length) { const k = st.pop(); if (bg[k] || !test(k)) continue; bg[k] = 1; const x = k % W, y = (k / W) | 0; if (x > 0) st.push(k-1); if (x < W-1) st.push(k+1); if (y > 0) st.push(k-W); if (y < H-1) st.push(k+W); } };
  const border = []; for (let x=0;x<W;x++) border.push(x, (H-1)*W + x); for (let y=0;y<H;y++) border.push(y*W, y*W + W-1);
  flood(border, (k) => whiteish(k));
  // Note: white areas fully enclosed by the character (eye whites, muzzle) are kept on purpose.
  // Only white connected to the sheet's outer edge is treated as background.
  // Defringe: light, unsaturated antialias pixels touching the background.
  for (let pass = 0; pass < 3; pass++) {
    const kill = [];
    for (let k = 0; k < N; k++) { if (bg[k]) continue; const x=k%W, y=(k/W)|0;
      const touches = (x>0&&bg[k-1])||(x<W-1&&bg[k+1])||(y>0&&bg[k-W])||(y<H-1&&bg[k+W]);
      if (touches && whiteish(k, 150 + pass * 10, 45)) kill.push(k); }
    for (const k of kill) bg[k] = 1;
  }
  for (let k = 0; k < N; k++) if (bg[k]) data[at(k)+3] = 0;

  // Components per cell.
  const lab = new Int32Array(N).fill(-1); const comps = [];
  for (let k = 0; k < N; k++) { if (bg[k] || lab[k] >= 0) continue;
    const c = { n:0, minX:1e9, maxX:-1, minY:1e9, maxY:-1, sx:0 }; const id = comps.length; comps.push(c); const st=[k]; lab[k]=id;
    while (st.length) { const q = st.pop(); const x=q%W, y=(q/W)|0; c.n++; c.sx+=x; c.minX=Math.min(c.minX,x); c.maxX=Math.max(c.maxX,x); c.minY=Math.min(c.minY,y); c.maxY=Math.max(c.maxY,y);
      for (let dy=-1;dy<=1;dy++) for (let dx=-1;dx<=1;dx++) { const nx=x+dx, ny=y+dy; if (nx<0||ny<0||nx>=W||ny>=H) continue; const nk=ny*W+nx; if (bg[nk]||lab[nk]>=0) continue; lab[nk]=id; st.push(nk); } } }
  const cells = Array.from({ length: 16 }, () => []);
  for (const c of comps) { if (c.n < 8) { /* speck: drop */ continue; } const col=Math.min(3,Math.floor(((c.minX+c.maxX)/2)/(W/4))), row=Math.min(3,Math.floor(((c.minY+c.maxY)/2)/(H/4))); cells[row*4+col].push(c); }
  // Erase specks.
  comps.forEach((c, id) => { if (c.n < 8) for (let y=c.minY;y<=c.maxY;y++) for (let x=c.minX;x<=c.maxX;x++) { const k=y*W+x; if (lab[k]===id) data[at(k)+3]=0; } });

  const frames = cells.map((cs) => { cs.sort((a,b)=>b.n-a.n); const cat = cs[0];
    const box = cs.reduce((b,c)=>({minX:Math.min(b.minX,c.minX),minY:Math.min(b.minY,c.minY),maxX:Math.max(b.maxX,c.maxX),maxY:Math.max(b.maxY,c.maxY)}), {minX:1e9,minY:1e9,maxX:-1,maxY:-1});
    return { box, ax: cat.sx / cat.n, ay: cat.maxY, catH: cat.maxY - cat.minY + 1 }; });
  const medianCatH = frames.map(f=>f.catH).sort((a,b)=>a-b)[8];
  const s = TARGET_CAT_H / medianCatH;
  let L=0,R=0,U=0,D=0;
  for (const f of frames) { L=Math.max(L,(f.ax-f.box.minX)*s); R=Math.max(R,(f.box.maxX-f.ax)*s); U=Math.max(U,(f.ay-f.box.minY)*s); D=Math.max(D,(f.box.maxY-f.ay)*s); }
  const pad = 4; const half = Math.ceil(Math.max(L,R)) + pad;
  const FW = half * 2, FH = Math.ceil(U + D) + pad * 2; const AX = half, AY = Math.ceil(U) + pad;
  const full = sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } });
  const layers = [];
  for (let i = 0; i < 16; i++) { const f = frames[i]; const w=f.box.maxX-f.box.minX+1, h=f.box.maxY-f.box.minY+1;
    const sw = Math.max(1, Math.round(w*s)), sh = Math.max(1, Math.round(h*s));
    const buf = await full.clone().extract({ left:f.box.minX, top:f.box.minY, width:w, height:h }).resize(sw, sh, { kernel: 'lanczos3' }).png().toBuffer();
    layers.push({ input: buf, left: i*FW + Math.round(AX - (f.ax - f.box.minX)*s), top: Math.round(AY - (f.ay - f.box.minY)*s) }); }
  const strip = sharp({ create: { width: FW*16, height: FH, channels: 4, background: { r:0,g:0,b:0,alpha:0 } } }).composite(layers);
  // Output format follows the file extension (.webp is what the site uses).
  await (outPng.endsWith('.webp') ? strip.webp({ quality: 90, alphaQuality: 100, effort: 6 }) : strip.png({ compressionLevel: 9 })).toFile(outPng);
  await sharp({ create: { width: FW*16, height: FH, channels: 4, background: { r:15,g:15,b:15,alpha:1 } } }).composite([{ input: outPng }]).png().toFile(outPreview);
  console.log(JSON.stringify({ frameWidth: FW, frameHeight: FH, anchorX: AX, anchorY: AY, frames: 16, scale: +s.toFixed(4) }));
})();
