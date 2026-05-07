/* ─────────────────────────────────────────────
   PRASHANT KUMAR PORTFOLIO — script.js
   ───────────────────────────────────────────── */

/* ── 1. NAV scroll shadow + burger ── */
const nav      = document.getElementById('nav');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── 2. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 3. SCROLL REVEAL ── */
function addRevealClasses() {
  const selectors = [
    '.fact-card', '.skill-card', '.project-card',
    '.cert-card', '.about__text', '.about__facts',
    '.contact__left', '.contact__form', '.resume__inner',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal--delay-1');
      if (i === 2) el.classList.add('reveal--delay-2');
      if (i === 3) el.classList.add('reveal--delay-3');
      if (i === 4) el.classList.add('reveal--delay-4');
    });
  });
}

function observeReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── 4. SKILL BARS ── */
function animateSkillBars() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
          fill.style.width = fill.getAttribute('data-w') + '%';
        });
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.3 }
  );
  const sec = document.getElementById('skills');
  if (sec) observer.observe(sec);
}

/* ── 5. CONTACT FORM validation ── */
const form        = document.getElementById('contactForm');
const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const msgInput    = document.getElementById('message');
const nameErr     = document.getElementById('nameErr');
const emailErr    = document.getElementById('emailErr');
const msgErr      = document.getElementById('msgErr');
const formSuccess = document.getElementById('formSuccess');

const showErr  = (el, msg) => { el.textContent = msg; };
const clearErr = (el)      => { el.textContent = ''; };
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

nameInput.addEventListener('blur',  () => nameInput.value.trim()  ? clearErr(nameErr)  : showErr(nameErr,  '→ Name is required'));
emailInput.addEventListener('blur', () => {
  if (!emailInput.value.trim())           showErr(emailErr, '→ Email is required');
  else if (!validEmail(emailInput.value)) showErr(emailErr, '→ Enter a valid email');
  else                                    clearErr(emailErr);
});
msgInput.addEventListener('blur',   () => msgInput.value.trim().length < 10 ? showErr(msgErr, '→ At least 10 characters') : clearErr(msgErr));

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;

  if (!nameInput.value.trim())              { showErr(nameErr, '→ Name is required'); ok = false; }  else clearErr(nameErr);
  if (!emailInput.value.trim())             { showErr(emailErr, '→ Email is required'); ok = false; }
  else if (!validEmail(emailInput.value))   { showErr(emailErr, '→ Enter a valid email'); ok = false; }
  else                                        clearErr(emailErr);
  if (msgInput.value.trim().length < 10)    { showErr(msgErr, '→ At least 10 characters'); ok = false; } else clearErr(msgErr);

  if (ok) {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4500);
    }, 1200);
  }
});

/* ── 6. ACTIVE nav highlight ── */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a');
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.style.color = '';
          if (l.getAttribute('href') === '#' + entry.target.id) l.style.color = 'var(--accent)';
        });
      }
    }),
    { threshold: 0.4 }
  );
  sections.forEach(s => observer.observe(s));
}

/* ── 7. TYPING effect on hero label ── */
function typingEffect() {
  const label = document.querySelector('.hero__label');
  if (!label) return;
  const txt = label.textContent;
  label.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    label.textContent += txt[i++];
    if (i >= txt.length) clearInterval(iv);
  }, 45);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  addRevealClasses();
  observeReveal();
  animateSkillBars();
  highlightNav();
  setTimeout(typingEffect, 400);
});