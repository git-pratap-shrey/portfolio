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

  //Formspree ID
  const FORMSPREE_ID = 'xpqoggpp';
  const btn = document.getElementById('form-submit');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      contactForm.reset();
      formSuccess.textContent = "Thanks! I'll get back to you soon. ✓";
      formSuccess.style.color = '#4ade80';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form. Please check your connection.");
  }).finally(() => {
    btn.textContent = 'Get In Touch →';
    btn.disabled = false;
  });
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

// ===== CUSTOM CURSOR =====
const initCursor = () => {
  if (window.innerWidth <= 1024) return;

  const dotBox = document.createElement('div');
  dotBox.id = 'dot-box';
  dotBox.classList.add('dot-box');

  const dot = document.createElement('div');
  dot.id = 'dot-item';
  dot.classList.add('dot');

  const spanView = document.createElement('span');
  spanView.classList.add('view');
  spanView.textContent = 'VIEW';

  const spanNext = document.createElement('span');
  spanNext.classList.add('next');
  spanNext.textContent = 'NEXT';

  dot.appendChild(spanView);
  dot.appendChild(spanNext);
  dotBox.appendChild(dot);
  document.body.appendChild(dotBox);

  const canvas = document.getElementById("mouse");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let tail;

  const Tail = function (mx, my) {
    this.pList = [];
    this.pLen = 32; // Longer trail for extra smoothness
    this.mx = mx;
    this.my = my;
    this.destX = mx;
    this.destY = my;
    this.speed = 1.45; // Slightly slower follower for a longer trailing effect
    this.updateCrds = function () {
      this.mx += (this.destX - this.mx) / this.speed;
      this.my += (this.destY - this.my) / this.speed;
    };
  };

  function gradient(a, b) {
    return (b.y - a.y) / (b.x - a.x);
  }

  function bzCurve(points, f, t) {
    if (typeof (f) == 'undefined') f = 0.1;
    if (typeof (t) == 'undefined') t = 1.0;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    let m = 0;
    let dx1 = 0;
    let dy1 = 0;
    let dx2 = 0;
    let dy2 = 0;

    let preP = points[0];
    for (let i = 1; i < points.length; i++) {
      let curP = points[i];
      let nexP = points[i + 1];
      if (nexP) {
        m = gradient(preP, nexP);
        dx2 = (nexP.x - curP.x) * -f;
        dy2 = dx2 * m * t;
      } else {
        dx2 = 0;
        dy2 = 0;
      }
      ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
      dx1 = dx2;
      dy1 = dy2;
      preP = curP;
    }
    ctx.stroke();
  }

  // Mouse Movement
  let lastX, lastY;
  let timer;

  document.addEventListener('mousemove', e => {
    // Dot position
    dotBox.style.left = e.clientX + 'px';
    dotBox.style.top = e.clientY + 'px';
    
    // Tail destination
    if (tail) {
      tail.destX = e.clientX;
      tail.destY = e.clientY;
    } else {
      tail = new Tail(e.clientX, e.clientY);
    }

    // Show cursor on move
    canvas.style.opacity = '1';
    dot.classList.add('draw');

    // Idle timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      dot.classList.remove('draw');
      canvas.style.opacity = '0';
    }, 120);
  });

  // Animation Loop
  ctx.strokeStyle = "rgba(0, 0, 0, 0.7)"; // Darker black
  ctx.lineWidth = 2.2; // Thicker tail

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    if (tail) {
      tail.updateCrds();
      tail.pList.push({ x: tail.mx, y: tail.my });

      let points = [];
      for (let i = 0; i < tail.pList.length; i++) {
        points.push({ x: tail.pList[i].x, y: tail.pList[i].y });
      }
      
      if (points.length > 2) {
        bzCurve(points, 0.12, 1.0);
      }

      // Move points slightly for "flow" effect
      for (let i = 0; i < tail.pList.length; i++) {
        tail.pList[i].x -= 1.0;
        tail.pList[i].y += 1.0;
      }

      while (tail.pList.length > tail.pLen) {
        tail.pList.shift();
      }
    }
    requestAnimationFrame(animate);
  };
  animate();

  // Hover Interactions
  const updateHovers = () => {
    // Links and buttons (Scale up)
    document.querySelectorAll('a, button, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => dotBox.classList.add('active'));
      el.addEventListener('mouseleave', () => dotBox.classList.remove('active'));
    });

    // Project cards (Scale up + VIEW text)
    document.querySelectorAll('.proj-card-visual').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dotBox.classList.add('active', 'secondary');
      });
      el.addEventListener('mouseleave', () => {
        dotBox.classList.remove('active', 'secondary');
      });
    });

    // Section colors
    document.querySelectorAll('.dark-section').forEach(section => {
      section.addEventListener('mouseenter', () => {
        dotBox.classList.add('changeColor');
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      });
      section.addEventListener('mouseleave', () => {
        dotBox.classList.remove('changeColor');
        ctx.strokeStyle = "rgba(13, 13, 13, 0.4)";
      });
    });
  };
  updateHovers();

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
};

// Initialize after preloader fades or DOM is ready
if (document.readyState === 'complete') {
  initCursor();
} else {
  window.addEventListener('load', initCursor);
}


