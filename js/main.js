/**
 * Main JavaScript for Creative Resume Website
 * Handles navigation, animations, and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
   
    // ===========================
    // MOBILE MENU TOGGLE
    // ===========================
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
   
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
       
        // Close menu when clicking on a link
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
       
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
   
    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.getElementById('navbar');
   
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
   
    // ===========================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
   
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
           
            // Skip if it's just '#'
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
           
            const target = document.querySelector(href);
           
            if (target) {
                e.preventDefault();
               
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
               
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
               
                // Update active nav link
                updateActiveNavLink(href);
            }
        });
    });
   
    // ===========================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ===========================
    function updateActiveNavLink(activeHref) {
        const navLinks = document.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }
   
    // Update active link based on scroll position
    const sections = document.querySelectorAll('section[id]');
   
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 100;
           
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
               
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveNavLink(`#${sectionId}`);
                }
            });
        });
    }
   
    // ===========================
    // ANIMATION ON SCROLL
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
   
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
   
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
   
    // ===========================
    // SKILL BAR ANIMATION
    // ===========================
    const skillBars = document.querySelectorAll('.skill-progress');
   
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
       
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
   
    // ===========================
    // LAZY LOADING FOR IMAGES
    // ===========================
    const lazyImages = document.querySelectorAll('img[data-src]');
   
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
       
        lazyImages.forEach(img => imageObserver.observe(img));
    }
   
    // ===========================
    // TYPING ANIMATION (Optional for Hero)
    // ===========================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
       
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
       
        type();
    }
   
    // Uncomment to enable typing animation
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
   
    // ===========================
    // BACK TO TOP BUTTON (Optional)
    // ===========================
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--color-primary-gradient);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
        `;
       
        document.body.appendChild(button);
       
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
       
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
       
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
       
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
   
    // Uncomment to enable back to top button
    // createBackToTopButton();
   
    // ===========================
    // CONSOLE MESSAGE
    // ===========================
    console.log('%cHello there!', 'font-size: 20px; font-weight: bold; color: #9333ea;');
    console.log('%cThanks for checking out my website!', 'font-size: 14px; color: #a1a1aa;');
    console.log('%cFeel free to reach out if you want to connect.', 'font-size: 14px; color: #a1a1aa;');
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Debounce function to limit rate of function execution
 */
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

/**
 * Throttle function to limit rate of function execution
 */
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

// Export functions if using modules
// export { debounce, throttle };
