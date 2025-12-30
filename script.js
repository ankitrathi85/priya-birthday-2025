/* ============================================
   PRIYA'S BIRTHDAY WEBSITE - SCRIPT.JS
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initConfetti();
    initFloatingHearts();
    initScrollReveal();
    initSmoothScroll();
    initParallaxEffects();
});

/* ============================================
   CONFETTI ANIMATION
   ============================================ */

function initConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#B76E79', '#D4AF37', '#FFE4E6', '#722F37', '#FFF8F0', '#d4a5ab'];
    const shapes = ['square', 'circle', 'rectangle'];
    
    // Create confetti burst
    function createConfettiBurst(count = 100) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createConfettiPiece();
            }, i * 30);
        }
    }
    
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 3;
        const rotation = Math.random() * 360;
        
        // Apply styles
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.width = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    // Initial burst on page load
    setTimeout(() => {
        createConfettiBurst(80);
    }, 500);
    
    // Additional burst after 2 seconds
    setTimeout(() => {
        createConfettiBurst(50);
    }, 2500);
}

/* ============================================
   FLOATING HEARTS
   ============================================ */

function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '🩷'];
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random properties
        const left = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 4 + 5;
        const delay = Math.random() * 2;
        
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}rem`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 800);
    
    // Initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gallery = document.getElementById('gallery');
            if (gallery) {
                gallery.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        scrollIndicator.style.cursor = 'pointer';
    }
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const circles = document.querySelectorAll('.circle');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero ? hero.offsetHeight : 0;
        
        // Parallax for hero circles
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = scrolled * speed;
            circle.style.transform = `translateY(${yPos}px)`;
        });
        
        // Fade hero content on scroll
        if (hero && scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    }
}

/* ============================================
   GALLERY LIGHTBOX (Optional Enhancement)
   ============================================ */

// Create a simple lightbox for gallery images
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img, .cake-item img');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        .lightbox.active {
            display: flex;
        }
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.3s ease;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease;
        }
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            padding: 5px 15px;
            transition: transform 0.2s;
        }
        .lightbox-close:hover {
            transform: scale(1.2);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    
    galleryItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Initialize lightbox after page load
window.addEventListener('load', initLightbox);

/* ============================================
   TYPING EFFECT FOR HERO (Optional)
   ============================================ */

function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '3px solid var(--rose-gold)';
    
    let i = 0;
    const typeSpeed = 100;
    
    function type() {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(type, typeSpeed);
        } else {
            heroName.style.borderRight = 'none';
        }
    }
    
    setTimeout(type, 1500);
}

/* ============================================
   CAKE CAROUSEL SCROLL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const cakesCarousel = document.querySelector('.cakes-carousel');
    
    if (cakesCarousel) {
        // Auto-scroll hint
        let hasScrolled = false;
        
        cakesCarousel.addEventListener('scroll', () => {
            hasScrolled = true;
        });
        
        // Gentle auto-scroll animation to hint at scrolling
        setTimeout(() => {
            if (!hasScrolled) {
                cakesCarousel.scrollTo({
                    left: 100,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    cakesCarousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 800);
            }
        }, 3000);
    }
});

/* ============================================
   BIRTHDAY COUNTDOWN (Bonus Feature)
   ============================================ */

function initCountdown() {
    // Since today is the birthday, show celebration message
    const today = new Date();
    const birthdayMonth = 11; // December (0-indexed)
    const birthdayDay = 30;
    
    if (today.getMonth() === birthdayMonth && today.getDate() === birthdayDay) {
        console.log('🎂 Happy Birthday Priya! Today is your special day! 🎉');
        
        // Add special birthday class to body
        document.body.classList.add('birthday-today');
        
        // Extra confetti burst every 30 seconds
        setInterval(() => {
            const container = document.getElementById('confetti-container');
            if (container) {
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.style.backgroundColor = ['#B76E79', '#D4AF37', '#FFE4E6'][Math.floor(Math.random() * 3)];
                        confetti.style.left = `${Math.random() * 100}%`;
                        confetti.style.width = `${Math.random() * 10 + 5}px`;
                        confetti.style.height = `${Math.random() * 10 + 5}px`;
                        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
                        container.appendChild(confetti);
                        setTimeout(() => confetti.remove(), 5000);
                    }, i * 50);
                }
            }
        }, 30000);
    }
}

// Initialize countdown on load
window.addEventListener('load', initCountdown);

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */

console.log('%c🎂 Happy 39th Birthday, Priya! 🎂', 
    'font-size: 24px; color: #B76E79; font-weight: bold; text-shadow: 2px 2px #D4AF37;');
console.log('%cMade with ❤️ by your loving husband', 
    'font-size: 14px; color: #722F37;');
console.log('%cDecember 30th, 2025', 
    'font-size: 12px; color: #666;');
