// =============================================
//  NAYMON NAFI SUPTO — PORTFOLIO JAVASCRIPT
// =============================================

// --- LOADING SCREEN ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.body.style.overflow = 'auto';
    initAnimations();
  }, 2000);
});

document.body.style.overflow = 'hidden';

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-tag, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorRing.style.width = '50px';
    cursorRing.style.height = '50px';
    cursorRing.style.borderColor = 'rgba(0, 212, 255, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.borderColor = 'rgba(0, 212, 255, 0.5)';
  });
});

// --- PARTICLE CANVAS BACKGROUND ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const PARTICLE_COUNT = 80;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  update(time) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset));
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${this.currentOpacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

// Draw connection lines
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const opacity = (1 - dist / 130) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

let animTime = 0;
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animTime++;
  particles.forEach(p => {
    p.update(animTime);
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- NAVBAR ---
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link based on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}

// --- TYPING ANIMATION ---
const typingTexts = [
  'Problem Solver',
  'C Programmer',
  'Future Full-Stack Dev',
  'Math Teacher',
  'Lifelong Learner',
  'Software Engineer'
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeEffect() {
  const current = typingTexts[typingIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typingTexts.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 2200);

// --- SCROLL REVEAL ANIMATIONS ---
function initAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach((el, i) => {
    if (!el.dataset.delay) {
      el.dataset.delay = (i % 4) * 80;
    }
    observer.observe(el);
  });

  // Progress bars
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const progressSection = document.querySelector('.currently-learning');
  if (progressSection) progressObserver.observe(progressSection);
}

// --- COUNTER ANIMATION ---
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const duration = 1500;
  const steps = 50;
  const increment = target / steps;
  const interval = duration / steps;

  const timer = setInterval(() => {
    count = Math.min(count + increment, target);
    el.textContent = Math.round(count) + suffix;
    if (count >= target) clearInterval(timer);
  }, interval);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const suffix = stat.dataset.suffix || '';
        animateCounter(stat, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// --- CONTACT FORM ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
