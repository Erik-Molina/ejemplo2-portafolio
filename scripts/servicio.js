document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section-title, #servicio > p, .service-item');

    const checkVisibility = () => {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verifica al cargar la página
});