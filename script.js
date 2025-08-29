// Utilities
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Year footer
qs('#year').textContent = new Date().getFullYear();

// Enhance all .glitchy with data-text for hover clone effect
qsa('.glitchy').forEach((el) => { el.setAttribute('data-text', el.textContent.trim()); });

// Parallax for hero
const heroArt = qs('.hero-art');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroArt.style.transform = `translate(${x}px, ${y}px)`;
});

// Intersection reveals
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
qsa('.reveal').forEach((el) => io.observe(el));

// Chaos collage: place random images around hero
const collage = qs('#chaos-collage');
const assetPaths = [
  '/random_img1.svg','/random_img2.svg','/random_img3.svg','/random_img4.svg','/random_img5.svg',
  '/random_img6.svg','/random_img7.svg','/random_img8.svg','/random_img9.svg','/random_img10.svg',
  '/random_img11.svg','/random_img12.svg','/random_img13.svg','/random_img14.svg','/random_img15.svg',
  '/random_img16.svg','/random_img17.svg'
].filter(Boolean);

function random(min, max) { return Math.random() * (max - min) + min; }

function spawnCollage() {
  const count = Math.min(10, assetPaths.length);
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = assetPaths[Math.floor(Math.random() * assetPaths.length)];
    img.alt = '';
    const x = random(5, 95);
    const y = random(5, 95);
    const r = random(-25, 25);
    const s = random(0.6, 1.1);
    img.style.left = `${x}%`;
    img.style.top = `${y}%`;
    img.style.transform = `translate(-50%, -50%) rotate(${r}deg) scale(${s})`;
    img.style.transition = 'transform 0.6s ease, filter 0.6s ease, opacity 0.6s';
    collage.appendChild(img);
  }
}
spawnCollage();

// Toggle brainrot intensity
let brainrot = true;
qs('#chaosToggle').addEventListener('click', () => {
  brainrot = !brainrot;
  document.body.style.filter = brainrot ? 'saturate(130%) contrast(105%) hue-rotate(0deg)' : 'saturate(100%) contrast(100%)';
  qsa('#floaters img').forEach((el) => { el.style.animationPlayState = brainrot ? 'running' : 'paused'; });
});

// Floating / raining Solana and Illuminati icons
const floaters = qs('#floaters');
const floaterAssets = ['/solana_coin.svg','/illuminati_icon1.png','/illuminati_icon2.svg','/illuminati_icon3.svg'];

function spawnFloater() {
  const img = document.createElement('img');
  img.className = 'floater';
  img.src = floaterAssets[Math.floor(Math.random() * floaterAssets.length)];
  img.alt = '';
  const startX = random(-10, 110);
  const duration = random(9, 18);
  const delay = random(-duration, 0);
  img.style.left = `${startX}vw`;
  img.style.animationDuration = `${duration}s`;
  img.style.animationDelay = `${delay}s`;
  img.style.transform = `translateY(-20vh) rotate(${random(-30,30)}deg)`;
  floaters.appendChild(img);

  // Clean up after it falls
  img.addEventListener('animationend', () => img.remove());
}

// Maintain a steady rain
setInterval(spawnFloater, 800);
for (let i = 0; i < 8; i++) spawnFloater();

// Public API to set late links and contract
window.ILM = {
  setPumpFun(url) {
    const links = [qs('#pumpLink'), qs('#pumpLink2')];
    links.forEach((a) => { if (!a) return; a.href = url; a.textContent = 'Pump.Fun'; a.classList.remove('disabled'); a.removeAttribute('aria-disabled'); });
  },
  setDexScreener(url) {
    const links = [qs('#dexLink'), qs('#dexLink2')];
    links.forEach((a) => { if (!a) return; a.href = url; a.textContent = 'DexScreener'; a.classList.remove('disabled'); a.removeAttribute('aria-disabled'); });
  },
  setContract(address) {
    const span = qs('#contractValue');
    const btn = qs('#copyContract');
    span.textContent = address;
    btn.disabled = false;
    btn.title = 'Copy contract address';
  }
};

qs('#copyContract').addEventListener('click', async () => {
  const text = qs('#contractValue').textContent.trim();
  if (!text || text === 'TBD') return;
  try {
    await navigator.clipboard.writeText(text);
    const btn = qs('#copyContract');
    const prev = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = prev), 900);
  } catch {
    alert('Copy failed. Please copy manually.');
  }
});


