document.addEventListener('DOMContentLoaded', () => {
    const dividers = document.querySelectorAll('.divider');

    const checkVisibility = () => {
        dividers.forEach(divider => {
            const rect = divider.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                divider.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verifica al cargar la página
});