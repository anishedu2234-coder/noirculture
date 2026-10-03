/* ==========================================================================
   NOIR CULTURE SOCIETY — MAIN APPLICATION CORE
   Navigation, Lookbook Scroll, View Modes, Clocks, & Interactive Triggers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initCollectionModes();
  initLookbookScroll();
  initWorldClocks();
  initScrollReveals();
  initContactForm();
  initGrainToggle();
});

/* --------------------------------------------------------------------------
   1. HEADER SCROLL & ACTIVE LINKS
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const mobileDrawer = document.getElementById('mobileNavDrawer');
        if (mobileDrawer) {
          mobileDrawer.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawer = document.getElementById('mobileNavDrawer');

  if (!openBtn || !drawer) return;

  openBtn.addEventListener('click', () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
}

/* --------------------------------------------------------------------------
   3. COLLECTION VIEW MODES (ARTWORK / T-SHIRT / CAMPAIGN)
   -------------------------------------------------------------------------- */
function initCollectionModes() {
  const toggleBtns = document.querySelectorAll('.view-toggle-btn');
  const featuredImg = document.getElementById('featuredStageImg');
  const featuredModeBadge = document.getElementById('featuredModeBadge');

  const modes = {
    artwork: {
      src: 'assets/images/falling_art.jpg',
      label: 'VIEW: SCREENPRINT ARTWORK'
    },
    mockup: {
      src: 'assets/images/falling_art.jpg',
      label: 'VIEW: GARMENT MOCKUP'
    },
    campaign: {
      src: 'assets/images/falling_model.jpg',
      label: 'VIEW: ON-BODY CAMPAIGN'
    }
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const mode = btn.getAttribute('data-mode');
      if (modes[mode] && featuredImg && featuredModeBadge) {
        featuredImg.style.opacity = '0.3';
        setTimeout(() => {
          featuredImg.src = modes[mode].src;
          featuredModeBadge.textContent = modes[mode].label;
          featuredImg.style.opacity = '1';
        }, 200);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. LOOKBOOK HORIZONTAL CAROUSEL & DRAG SCROLL
   -------------------------------------------------------------------------- */
function initLookbookScroll() {
  const viewport = document.getElementById('lookbookViewport');
  const prevBtn = document.getElementById('lookbookPrev');
  const nextBtn = document.getElementById('lookbookNext');

  if (!viewport) return;

  const scrollAmount = 480;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Mouse drag momentum
  let isDown = false;
  let startX;
  let scrollLeft;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });
}

/* --------------------------------------------------------------------------
   5. REAL-TIME WORLD CLOCKS (LONDON · TOKYO · PARIS)
   -------------------------------------------------------------------------- */
function initWorldClocks() {
  const updateClocks = () => {
    const now = new Date();

    const formatCityTime = (timeZone) => {
      try {
        return new Intl.DateTimeFormat('en-GB', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
      } catch (e) {
        return now.toTimeString().substring(0, 8);
      }
    };

    const tokyoEl = document.getElementById('clockTokyo');
    const londonEl = document.getElementById('clockLondon');
    const parisEl = document.getElementById('clockParis');

    if (tokyoEl) tokyoEl.textContent = formatCityTime('Asia/Tokyo');
    if (londonEl) londonEl.textContent = formatCityTime('Europe/London');
    if (parisEl) parisEl.textContent = formatCityTime('Europe/Paris');
  };

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* --------------------------------------------------------------------------
   6. SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. CONTACT / INQUIRY FORM SUBMISSION SIMULATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>TRANSMITTING DISPATCH...</span>`;

    setTimeout(() => {
      submitBtn.innerHTML = `<span>DISPATCH RECEIVED // STUDIO LOGGED</span>`;
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 4000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   8. GRAIN OVERLAY TOGGLE
   -------------------------------------------------------------------------- */
function initGrainToggle() {
  const toggleBtn = document.getElementById('grainToggleBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isOff = document.body.classList.toggle('grain-disabled');
    toggleBtn.textContent = isOff ? 'FILM GRAIN: OFF' : 'FILM GRAIN: ON';
  });
}
