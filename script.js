/* ============================================
   Avanza SST - Main Script
   ============================================ */

   document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll behavior ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
  
    function handleNavbarScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }
  
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  
    // --- Mobile menu toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });
  
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a, .mobile-menu a');
  
    function highlightNavLink() {
      const scrollY = window.scrollY + 200;
  
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
  
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }
  
    window.addEventListener('scroll', highlightNavLink, { passive: true });
  
    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return; // FIX 1: Evita que URLs externas rompan el scroll
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault(); // Solo prevenimos el click si el destino existe internamente
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 100;
  
      revealElements.forEach(function (element) {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
  
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;
  
    function animateCounters() {
      if (countersAnimated) return;
  
      const statsSection = document.querySelector('.stats-banner');
      if (!statsSection) return;
  
      const sectionTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (sectionTop < windowHeight - 100) {
        countersAnimated = true;
  
        counters.forEach(function (counter) {
          const target = parseInt(counter.getAttribute('data-count'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();
  
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);
  
            counter.textContent = currentValue + suffix;
  
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          }
  
          requestAnimationFrame(updateCounter);
        });
      }
    }
  
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
  
    const btnWs = document.getElementById('whatsappBtn');
    const tooltipWs = document.getElementById('whatsappTooltip');
    const phone = '524491500376';
    const wsSections = [
        { selector: '.contact', message: 'Hola, me gustaría recibir información.' }
    ];
  
    function updateWhatsApp() {
        if (!btnWs) return;
        let msg = 'Hola, me gustaría recibir información.';
        wsSections.forEach(s => {
            const el = document.querySelector(s.selector);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                    msg = s.message;
                }
            }
        });
        btnWs.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        if (tooltipWs) tooltipWs.textContent = msg;
    }
    window.addEventListener('scroll', updateWhatsApp, { passive: true });
    updateWhatsApp();
  
  });
  
  // ===== Navegación mobil =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  
  navDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
      nav.classList.remove('active');
      mobileToggle?.classList.remove('active');
    }
  });
  
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
  
  // ===== FAQ  =====
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        const parentCategory = item.closest('.faq-category');
        if (parentCategory) {
          parentCategory.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
          });
        }
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#' && targetId.startsWith('#')) { 
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = header?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          nav.classList.remove('active');
          mobileToggle?.classList.remove('active');
        }
      }
    });
  });
  
  // ===== Animación al hacer scroll =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.service-card, .large-card, .small-card, .mvv-card, .client-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // CSS para animaciónes
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    };
    
    updateCounter();
  }
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.hero-stat-number, .about-image-badge-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.hero-stats, .about-image-badge').forEach(el => {
    statsObserver.observe(el);
  });
  
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    
    document.querySelectorAll('.nav-dropdown-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
        link.closest('.nav-dropdown')?.querySelector('.nav-link')?.classList.add('active');
      }
    });
  }
  
  setActiveNavLink();
  
  // ===== Carga de imagen dinamica=====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
  
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ===== Validaciones =====
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
  }
  
  window.validateEmail = validateEmail;
  window.validatePhone = validatePhone;
  
  document.querySelectorAll('.faq-category').forEach(category => {
    let header = category.querySelector('.faq-category-header');
    const title = category.querySelector('.faq-category-title') || category.querySelector('h2, h3, h4');
    if (!header && title) {
      header = document.createElement('div');
      header.className = 'faq-category-header';
      header.appendChild(title);
      const icon = document.createElement('span');
      icon.className = 'category-icon';
      icon.textContent = '▼';
      header.appendChild(icon);
      category.insertBefore(header, category.firstChild);
    }
  
    let content = category.querySelector('.faq-category-content');
    const directItems = Array.from(category.querySelectorAll(':scope > .faq-item'));
    if (!content && directItems.length) {
      content = document.createElement('div');
      content.className = 'faq-category-content';
      directItems.forEach(it => content.appendChild(it));
      const after = category.querySelector('.faq-category-header')?.nextSibling || null;
      category.insertBefore(content, after);
    }
  
    category.querySelectorAll('.faq-item').forEach((item, idx) => {
      item.style.setProperty('--i', idx);
    });
  });
  
  document.querySelectorAll('.faq-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const category = header.closest('.faq-category');
      if (!category) return;
  
      const isOpen = category.classList.contains('section-active');
  
      document.querySelectorAll('.faq-category.section-active').forEach(openCat => {
        if (openCat !== category) openCat.classList.remove('section-active');
      });
  
      if (isOpen) {
        category.classList.remove('section-active');
      } else {
        category.querySelectorAll('.faq-item').forEach((item, idx) => {
          item.style.setProperty('--i', idx);
        });
        category.classList.add('section-active');
  
        const items = Array.from(category.querySelectorAll('.faq-item'));
        items.forEach((it, i) => {
          it.style.opacity = '0';
          it.style.transform = 'translateY(10px)';
  
          it.offsetHeight;
          setTimeout(() => {
            it.style.opacity = '';
            it.style.transform = '';
          }, i * 80 + 60);
        });
      }
    });
  });
  
  // ==========================================
  // CONTACTO 
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      emailjs.sendForm(
        "service_2gahwtr",
        "template_6fzx6xg",
        contactForm
      ).then(
        function () {
          showNotification("Mensaje enviado correctamente ");
          contactForm.reset();
        },
        function (error) {
          console.error("Error:", error);
          showNotification("Error al enviar el mensaje ", true);
        }
      );
    });
  }
  
  function showNotification(message, isError = false) {
    let notify = document.getElementById("notify");
  
    if (!notify) {
      notify = document.createElement('div');
      notify.id = 'notify';
      notify.className = 'notify';
      notify.setAttribute('role', 'status');
      notify.setAttribute('aria-live', 'polite');
      notify.setAttribute('aria-atomic', 'true');
      notify.innerHTML = `<span class="notify-icon">✓</span><p class="notify-text"></p><button class="notify-close" aria-label="Cerrar notificación">&times;</button>`;
      document.body.appendChild(notify);
  
      const closeBtn = notify.querySelector('.notify-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          notify.classList.remove('show');
        });
      }
    }
  
    const textEl = notify.querySelector('.notify-text');
    const iconEl = notify.querySelector('.notify-icon');
    if (textEl) textEl.textContent = message;
    if (iconEl) iconEl.textContent = isError ? '!' : '✓';
  
    notify.classList.remove('error');
    if (isError) notify.classList.add('error');
  
    notify.classList.add('show');
  
    clearTimeout(notify._hideTimeout);
    notify._hideTimeout = setTimeout(() => {
      notify.classList.remove('show');
    }, 3500);
  }

  function incluirHTML() {
  const cargarSeccion = (url, idContenedor) => {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar: " + url);
        return response.text();
      })
      .then(data => {
        document.getElementById(idContenedor).innerHTML = data;
      })
      .catch(error => console.error(error));
  };

  cargarSeccion('header.html', 'header-placeholder');
  cargarSeccion('footer.html', 'footer-placeholder');
}

document.addEventListener("DOMContentLoaded", incluirHTML);


document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('normasGrid');
    const items = gridContainer.querySelectorAll('.norma-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const isExpanded = item.classList.contains('expanded');

            items.forEach(otherItem => {
                otherItem.classList.remove('expanded');
            });

            if (!isExpanded) {
                item.classList.add('expanded');
            }
        });
    });
});