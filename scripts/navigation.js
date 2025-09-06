// navigation.js - Handles responsive menu functionality

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    function toggleMenu() {
        nav.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isOpen = nav.classList.contains('show');
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    // Close menu when clicking outside
    function closeMenuOutside(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    }

    // Close menu when nav link is clicked (mobile)
    function closeMenuOnLink() {
        if (window.innerWidth < 768) {
            nav.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 768) {
            // Desktop view - ensure menu is always visible
            nav.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    }

    // Set active navigation based on current page
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.setAttribute('aria-expanded', false);
    }

    document.addEventListener('click', closeMenuOutside);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLink);
    });

    window.addEventListener('resize', handleResize);

    // Set initial active navigation
    setActiveNav();

    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            nav.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
});