document.addEventListener("DOMContentLoaded", () => {
   
    const burgerButton = document.querySelector('.burger');
    const closeButton = document.querySelector('.close');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');

    navLinks.classList.remove('active');

    if (burgerButton && closeButton && navLinks && overlay) {
        
        burgerButton.addEventListener('click', () => {
            navLinks.classList.add('active');
            overlay.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close the menu when the window width changes
          window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }
});
