document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-triggered animations (fade-ins and slide-ups)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenSections = document.querySelectorAll('.hidden-section');
    hiddenSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Gentle parallax scrolling effect for background
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // 3. Magnetic Hover Effect for Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Adjust the multiplier to increase/decrease the magnetic pull
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Carousel pause on hover
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }
});
