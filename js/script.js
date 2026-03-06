/* ============================================
   PORTFÓLIO DE FOTOGRAFIA - JAVASCRIPT
   Funcionalidades: Lightbox, Menu Mobile, 
   Lazy Loading, Smooth Scroll, Animações
   ============================================ */

// Esperar pelo carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENU MOBILE ==========
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu ao clicar no botão hamburger
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animar ícones do hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(13px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Resetar ícones do hamburger
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ========== LIGHTBOX ==========

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCurrent = document.getElementById('lightboxCurrent');
    const galeryItems = document.querySelectorAll('.galeria-item');

    let currentPhotoIndex = 0;

    // Abrir lightbox ao clicar em uma foto
    galeryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentPhotoIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        const item = galeryItems[currentPhotoIndex];
        const photo = item.getAttribute('data-photo');
        const title = item.getAttribute('data-title');
        
        lightboxImage.src = photo;
        lightboxCaption.textContent = title;
        lightboxCurrent.textContent = currentPhotoIndex + 1;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navegar para próxima foto
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % galeryItems.length;
        openLightbox();
    }

    // Navegar para foto anterior
    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + galeryItems.length) % galeryItems.length;
        openLightbox();
    }

    // Event listeners do lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextPhoto);
    lightboxPrev.addEventListener('click', prevPhoto);

    // Fechar lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'Escape') closeLightbox();
    });

    // ========== LAZY LOADING ==========

    // Usar Intersection Observer para lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Adicionar classe para fade-in animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                // Simular carregamento (em produção, você pode adicionar um listener para onload)
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observar todas as imagens
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });

    // ========== ANIMAÇÕES AO ROLAR A PÁGINA ==========

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que precisam de animação
    document.querySelectorAll('.galeria-item, .sobre-content, .contato-container').forEach(el => {
        elementObserver.observe(el);
    });

    // ========== SMOOTH SCROLL PERSONALIZADO ==========

    // Melhorar scroll suave para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== EFEITO PARALLAX SUAVE ==========

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                // Efeito parallax leve na hero image
                const heroImage = document.querySelector('.hero-image img');
                if (heroImage && scrolled < window.innerHeight) {
                    heroImage.style.transform = `scale(${1 + scrolled * 0.0001}) translateZ(0)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========== NAVBAR DINÂMICA ==========

    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Adicionar sombra à navbar ao rolar
        if (currentScrollY > 10) {
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // ========== CONTADORES E ESTATÍSTICAS ==========

    // Adicionar interatividade aos botões de contato
    const contactButtons = document.querySelectorAll('.contato-btn');
    
    contactButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========== PRELOAD DE IMAGENS ==========

    // Pré-carregar próximas imagens no lightbox para melhor performance
    function preloadImage(src) {
        const img = new Image();
        img.src = src;
    }

    // Pré-carregar imagem do lightbox ao carregar a página
    galeryItems.forEach(item => {
        const photo = item.getAttribute('data-photo');
        preloadImage(photo);
    });

    // ========== ANALYTICS E TRACKING SIMPLES ==========

    // Registrar cliques em fotos (opcional, para análise)
    function trackGalleryClick(photoIndex) {
        if (window.gtag) {
            gtag('event', 'photo_clicked', {
                'photo_index': photoIndex + 1
            });
        }
    }

    galeryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            trackGalleryClick(index);
        });
    });

    // ========== OTIMIZAÇÕES DE PERFORMANCE ==========

    // Usar requestAnimationFrame para animações suaves
    let animationId;
    
    function optimizeAnimations() {
        // Esta função pode ser expandida com mais otimizações
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(optimizeAnimations);
        }
    }
    
    optimizeAnimations();

    // ========== DETECTAR MODO ESCURO (OPCIONAL) ==========

    // Detectar preferência de tema do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Ouvir mudanças de preferência de tema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

});

// ========== UTILITÁRIOS GLOBAIS ==========

// Função para debounce (útil para eventos de resize)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para throttle (útil para scroll events)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== SERVICE WORKER PARA OFFLINE (OPCIONAL) ==========

// Se você deseja suportar modo offline, descomente e configure:
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
        console.log('ServiceWorker registration failed: ', err);
    });
}
*/
