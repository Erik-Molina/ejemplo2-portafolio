// menu.js
document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.querySelector('.mobile-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    mobileBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnButton = mobileBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
});