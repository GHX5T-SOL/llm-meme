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

// Utility random still needed for floaters
function random(min, max) { return Math.random() * (max - min) + min; }

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



