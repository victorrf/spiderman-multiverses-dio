let lastTappedCard = null;

function handleMouseEnter() {
    this.classList.add('s-card--hovered');
    document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
    this.classList.remove('s-card--hovered');
    document.body.id = '';
}

function handleTouchStart(e) {

    if (lastTappedCard === this) {
        lastTappedCard = null;
        return;
    }

    e.preventDefault();

    const allCards = document.querySelectorAll('.s-card');
    allCards.forEach(c => c.classList.remove('s-card--hovered'));
    document.body.id = "";

    this.classList.add('s-card--hovered');
    document.body.id = `${this.id}-hovered`;

    lastTappedCard = this;
}

function addEventListenersToCards() {
    const cards = document.querySelectorAll('.s-card');

    cards.forEach(card => {

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);


        card.addEventListener('touchstart', handleTouchStart, { passive: false });
    });
}

document.addEventListener("DOMContentLoaded", addEventListenersToCards);

function selectCarouselItem(selectedButtonElement) {
    const selectedItem = selectedButtonElement.id;
    const carousel = document.querySelector('.s-cards-carousel');
    const transform = carousel.style.transform;
    const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);
    const rotateYDeg = -90 * (Number(selectedItem) - 1);
    const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);

    carousel.style.transform = newTransform;

    const activeButtonElement = document.querySelector('.s-controller__button--active');
    activeButtonElement.classList.remove('s-controller__button--active');
    selectedButtonElement.classList.add('s-controller__button--active');
}

// === SUPORTE A SWIPE NO CELULAR === //

let touchStartX = 0;
let touchEndX = 0;

const swipeThreshold = 50;
const controllerButtons = document.querySelectorAll('.s-controller__button');


document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
});


document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) < swipeThreshold) return; 

    const activeButton = document.querySelector('.s-controller__button--active');
    let currentIndex = Number(activeButton.id);

    if (deltaX < 0) {
        
        currentIndex++;
        if (currentIndex > controllerButtons.length) currentIndex = 1;
    } else {
        
        currentIndex--;
        if (currentIndex < 1) currentIndex = controllerButtons.length;
    }

    
    const newButton = document.getElementById(String(currentIndex));
    selectCarouselItem(newButton);
}