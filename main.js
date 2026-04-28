/* ============================================
   THE CONA CLONE - Main JS
   ============================================ */

(function() {
  'use strict';

  // --- Mobile Menu ---
  const menuTrigger = document.querySelector('.menu-trigger');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const overlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuTrigger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach((el, i) => {
      // Stagger items in the same parent
      if (!el.style.getPropertyValue('--delay')) {
        el.style.setProperty('--delay', `${i * 60}ms`);
      }
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // --- Project filter ---
  const filterBtns = document.querySelectorAll('.project-filter button');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectItems.forEach((item) => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // --- Form submit feedback (Formspree style) ---
  const forms = document.querySelectorAll('form[data-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      // If the form has a data-fake attribute, prevent and show success
      // (For demo before Formspree is wired up)
      if (form.dataset.fake === 'true') {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const original = btn?.textContent;
        if (btn) {
          btn.textContent = '전송 완료';
          btn.disabled = true;
          setTimeout(() => {
            if (btn) {
              btn.textContent = original;
              btn.disabled = false;
            }
            form.reset();
          }, 2400);
        }
      }
    });
  });

  // --- Auto-close drawer on resize to desktop ---
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        closeDrawer();
      }
    }, 100);
  });
})();
