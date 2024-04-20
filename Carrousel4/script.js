document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carrousel-list');
    const slides = document.querySelector('.carrousel-track');
    const images = document.querySelectorAll('.carrusel');

    let currentIndex = 0;
    let interval;
    let startX = 0;
    let isDragging = false;

    function startSlideShow() {
        interval = setInterval(nextSlide, 3000); // Cambia la imagen cada 3 segundos
    }

    function nextSlide() {
        if (currentIndex < images.length - 9) {
            currentIndex++;
            updateSlide();
        } else {
            clearInterval(interval); // Detiene el intervalo cuando se alcanza la última imagen
        }
    }


    function updateSlide() {
        const slideWidth = carousel.clientWidth;
        slides.style.transition = 'transform 0.5s ease';
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function handleDragStart(e) {
        startX = e.clientX;
        isDragging = true;
    }

    function handleDragEnd(e) {
        const movedX = e.clientX - startX;
        if (movedX < -100 && currentIndex < images.length - 9) {
            currentIndex++;
        } else if (movedX > 100 && currentIndex > 0) {
            currentIndex--;
        }
        isDragging = false;
        updateSlide();
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedIndex = [...images].indexOf(e.target);
        const temp = images[currentIndex];
        images[currentIndex] = images[droppedIndex];
        images[droppedIndex] = temp;
        updateSlide();
    }

    images.forEach(img => {
        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', handleDragStart);
        img.addEventListener('dragend', handleDragEnd);
    });

    carousel.addEventListener('mouseenter', () => clearInterval(interval)); // Detiene el carrusel cuando el mouse está sobre él
    carousel.addEventListener('mouseleave', startSlideShow); // Reanuda el carrusel cuando el mouse sale de él
    carousel.addEventListener('dragover', handleDragOver);
    carousel.addEventListener('drop', handleDrop);

    startSlideShow();
});
