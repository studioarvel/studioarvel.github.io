// ========================================
// AOS - Initialize outside DOMContentLoaded
// (Script is at bottom of body, so DOM is ready)
// ========================================
AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
});

window.addEventListener('load', function() {
  AOS.refresh();
});

// ========================================
// Main Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initMobileMenu();
  initHomepageCarousel();
  initLightbox();
});

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
  var body = document.body;
  var mobileMenuBody = document.querySelector('.site-mobile-menu-body');

  if (!mobileMenuBody) return;

  // Clone navigation
  var navsToClone = document.querySelectorAll('.js-clone-nav');
  navsToClone.forEach(function(nav) {
    var clonedNav = nav.cloneNode(true);
    clonedNav.className = 'site-nav-wrap';
    mobileMenuBody.appendChild(clonedNav);
  });

  // Setup dropdowns for mobile after cloning
  setTimeout(function() {
    setupMobileDropdowns();
  }, 100);

  // Toggle menu
  document.querySelectorAll('.js-menu-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      body.classList.toggle('offcanvas-menu');
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    var mobileMenu = document.querySelector('.site-mobile-menu');
    if (body.classList.contains('offcanvas-menu') &&
        mobileMenu &&
        !mobileMenu.contains(e.target) &&
        !e.target.closest('.js-menu-toggle')) {
      body.classList.remove('offcanvas-menu');
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && body.classList.contains('offcanvas-menu')) {
      body.classList.remove('offcanvas-menu');
    }
  });
}

function setupMobileDropdowns() {
  var counter = 0;
  document.querySelectorAll('.site-mobile-menu .has-children').forEach(function(item) {
    var arrow = document.createElement('span');
    arrow.className = 'arrow-collapse collapsed';
    arrow.setAttribute('data-bs-toggle', 'collapse');
    arrow.setAttribute('data-bs-target', '#collapseItem' + counter);
    item.insertBefore(arrow, item.firstChild);

    var submenu = item.querySelector('ul');
    if (submenu) {
      submenu.className = 'collapse';
      submenu.id = 'collapseItem' + counter;
    }

    arrow.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    });

    counter++;
  });
}

// ========================================
// Homepage Carousel (Swiper 11)
// ========================================
function initHomepageCarousel() {
  var container = document.querySelector('.images-carousel');
  if (!container) return;

  new Swiper('.images-carousel', {
    slidesPerView: 3,
    spaceBetween: 20,
    freeMode: true,
    mousewheel: {
      invert: false,
      forceToAxis: true,
      releaseOnEdges: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      668: { slidesPerView: 1, spaceBetween: 15 },
      1024: { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });
}

// ========================================
// Lightbox (LightGallery)
// ========================================
function initLightbox() {
  if (typeof lightGallery === 'undefined') return;

  var gallery = document.getElementById('gallery');
  if (!gallery) return;

  lightGallery(gallery, {
    selector: 'a',
    plugins: [lgZoom, lgThumbnail],
    speed: 500,
    loop: true,
    download: false,
    mobileSettings: {
      controls: true,
      showCloseIcon: true
    }
  });
}
