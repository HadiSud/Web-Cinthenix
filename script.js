document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        const toggleMenu = (open) => {
            const isOpen = typeof open === 'boolean' ? open : !hamburger.classList.contains('active');
            hamburger.classList.toggle('active', isOpen);
            navMenu.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        };

        hamburger.addEventListener('click', () => toggleMenu());

        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // --- 2. Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 3. Intersection Observer (Active Link & Scroll Reveal) ---
    const sections = document.querySelectorAll('section, footer');
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    reveals.forEach(reveal => observer.observe(reveal));

    // --- 4. Lightbox Modal Prestasi ---
    const prestasiItems = document.querySelectorAll('.kartu-prestasi img');
    
    if (prestasiItems.length > 0) {
        const modal = document.createElement('div');
        modal.className = 'img-modal';
        
        const modalImg = document.createElement('img');
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'modal-close';

        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        const closeModal = () => modal.classList.remove('show');

        prestasiItems.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('show');
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // --- 5. Carousel Slider (Pengurus & Pembina) ---
    const container = document.querySelector('.carousel-track-container');
    const track = id('memberTrack');
    const prevBtn = id('slidePrev');
    const nextBtn = id('slideNext');

    function id(str) { return document.getElementById(str); }

    if (container && track && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const firstCard = track.querySelector('.kartu-member');
            if (!firstCard) return 280;
            const gap = parseInt(window.getComputedStyle(track).gap) || 16;
            return firstCard.offsetWidth + gap;
        };

        nextBtn.addEventListener('click', () => {
            const step = getScrollStep();
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScrollLeft - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: step, behavior: 'smooth' });
            }
        });

        prevBtn.addEventListener('click', () => {
            const step = getScrollStep();
            if (container.scrollLeft <= 10) {
                container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -step, behavior: 'smooth' });
            }
        });
    }

    // --- 6. Gallery Filter (Prestasi) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const prestasiCards = document.querySelectorAll('.kartu-prestasi');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            prestasiCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

});