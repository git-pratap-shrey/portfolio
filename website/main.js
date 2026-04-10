// ============================================
// SHREY PRATAP — PORTFOLIO SCRIPTS
// ============================================

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== SCROLL REVEAL — SKILL CARDS =====
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(card => skillObserver.observe(card));

// ===== SCROLL REVEAL — PROJECT ITEMS =====
const projectItems = document.querySelectorAll('.project-item');

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectItems.forEach(item => projectObserver.observe(item));

// ===== SCROLL REVEAL — GENERIC .reveal ELEMENTS =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], nav');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    // Shake invalid inputs
    [document.getElementById('form-name'), document.getElementById('form-email'), document.getElementById('form-message')].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#FF5F57';
        field.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.animation = '';
        }, 600);
      }
    });
    return;
  }

  // Simulate submission
  const btn = document.getElementById('form-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Get In Touch →';
    btn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// ===== SHAKE ANIMATION =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ===== SMOOTH CURSOR GLOW (optional enhancement) =====
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transition: transform 0.15s ease;
  top: -150px;
  left: -150px;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ===== TYPING EFFECT ON HERO NAME =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  // Add a subtle blinking bar initial effect
  // (Animation already handled by CSS)
}

console.log('%c✦ Shrey Pratap — Portfolio', 'font-size:16px; font-weight:bold; color:#F5C518;');
console.log('%cAI Engineer | GenAI Systems | Backend Developer', 'font-size:12px; color:#888;');

// ===== PRELOADER LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // The longest animation delay is 2.9s + 0.75s animation time = 3.65s
    // Give it a little buffer before fading out
    setTimeout(() => {
      preloader.classList.add('fade-out');
      
      // Remove from DOM after fade out completes
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000); 
    }, 3800); 
  }
});
