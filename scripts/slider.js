document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isAnimating = false; // Para evitar clics durante la animación

    function showSlide(index) {
        if (isAnimating) return; // Evita cambios durante la animación
        isAnimating = true;

        // Quita la clase 'active' del slide actual para que salga
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].querySelector('.slide-content').classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Actualiza el índice del slide actual
        currentSlide = index;

        // Añade la clase 'active' al nuevo slide para que entre
        slides[currentSlide].classList.add('active');
        slides[currentSlide].querySelector('.slide-content').classList.add('active');
        indicators[currentSlide].classList.add('active');

        // Permite una nueva animación después de que termine la actual
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Coincide con la duración de la transición
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Eventos de los botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Eventos de los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentSlide) {
                showSlide(index);
            }
        });
    });

    // Cambio automático (opcional, cada 5 segundos)
    setInterval(nextSlide, 5000);
});