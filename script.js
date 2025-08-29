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

// Random mountain behind hero
const mountain = qs('#random-mountain');
const assetPaths = [
  '/random_img1.svg','/random_img2.svg','/random_img3.svg','/random_img4.svg','/random_img5.svg',
  '/random_img6.svg','/random_img7.svg','/random_img8.svg','/random_img9.svg','/random_img10.svg',
  '/random_img11.svg','/random_img12.svg','/random_img13.svg','/random_img14.svg','/random_img15.svg',
  '/random_img16.svg','/random_img17.svg'
].filter(Boolean);

function random(min, max) { return Math.random() * (max - min) + min; }

function buildMountain() {
  // Clear previous
  mountain.innerHTML = '';
  const width = mountain.clientWidth || window.innerWidth;
  const layers = 5; // rows from bottom to top
  let used = 0;
  for (let layer = 0; layer < layers; layer++) {
    const rowCount = Math.ceil(assetPaths.length / layers);
    const yBase = 70 - layer * 10; // percent from top
    for (let i = 0; i < rowCount && used < assetPaths.length; i++, used++) {
      const img = document.createElement('img');
      img.src = assetPaths[used];
      img.alt = '';
      const spread = 80 - layer * 8; // narrower at top
      const left = (width * 0.1) + (i / (rowCount - 1 || 1)) * (width * (spread / 100));
      const top = yBase + random(-4, 4);
      const rot = random(-15, 15);
      const scale = 0.55 + (layer * 0.12) + random(-0.05, 0.08);
      img.style.left = `${(left / width) * 100}%`;
      img.style.top = `${top}%`;
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`;
      mountain.appendChild(img);
    }
  }
}
buildMountain();

// Rebuild mountain on resize for better fit
window.addEventListener('resize', () => { buildMountain(); });

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

// Menu toggle
const menuToggle = qs('#menuToggle');
const menuPanel = qs('#menuPanel');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  if (open) { menuPanel.hidden = true; } else { menuPanel.hidden = false; }
});

// Close menu when clicking outside
document.addEventListener('click', (evt) => {
  const target = evt.target;
  if (!menuPanel.hidden && !menuPanel.contains(target) && !menuToggle.contains(target)) {
    menuPanel.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Header contract copy
qs('#contractBtn').addEventListener('click', async () => {
  const text = qs('#headerContract').textContent.trim();
  if (!text || text === 'TBD') return;
  try {
    await navigator.clipboard.writeText(text);
    const btn = qs('#contractBtn');
    const prev = btn.querySelector('.label').textContent;
    btn.querySelector('.label').textContent = 'Copied!';
    setTimeout(() => (btn.querySelector('.label').textContent = prev), 900);
  } catch {}
});

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
    qs('#headerContract').textContent = address;
  }
};



