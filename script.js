// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. Preloader Animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            delay: 1, // Let it sit for a second so branding is seen
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                initPageAnimations(); // Trigger page animations ONLY after preloader is gone
            }
        });
    } else {
        initPageAnimations();
    }

    // 3. Navbar Logic (Scroll Effect)
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5');
            navbar.classList.remove('py-5');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5');
            navbar.classList.add('py-5');
            navbar.classList.remove('py-3');
        }

        // Back to Top Visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-btn');
    const closeMobile = document.getElementById('close-mobile');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden'); // Stop background scrolling
    }

    if(mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if(closeMobile) closeMobile.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 5. GSAP Animation Functions
    function initPageAnimations() {
        
        // Hero Text - Only runs on index page if element exists
        if(document.querySelector('.gsap-hero')) {
            gsap.from(".gsap-hero", {
                y: 50,
                autoAlpha: 0, // Handles opacity + visibility
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        // About Section Images
        if(document.querySelector('.gsap-fade-right')) {
            gsap.from(".gsap-fade-right", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                },
                x: -50,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }

        if(document.querySelector('.gsap-fade-left')) {
            gsap.from(".gsap-fade-left", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                },
                x: 50,
                autoAlpha: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out"
            });
        }

        // Fix for Menu Items Not Showing
        // We use autoAlpha: 0 in CSS/JS start, and animate to 1
        const menuItems = document.querySelectorAll(".menu-item-card");
        if(menuItems.length > 0) {
            gsap.to(menuItems, {
                scrollTrigger: {
                    trigger: ".grid", // Trigger when the grid container hits view
                    start: "top 80%",
                },
                y: 0,
                autoAlpha: 1, // Force visibility on
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }
        
        // Menu Page Specific Animations
        const menuSections = document.querySelectorAll(".menu-section");
        if(menuSections.length > 0) {
            gsap.from(menuSections, {
                scrollTrigger: {
                    trigger: "header",
                    start: "bottom 90%",
                },
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    }
});
              
