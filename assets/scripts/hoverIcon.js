function hoverSwapAll() {
    const imgs = document.querySelectorAll("[data-hover]");

    imgs.forEach(img => {
        const original = img.dataset.original;
        const hover = img.dataset.hover;

        img.addEventListener("mouseenter", () => img.src = hover);
        img.addEventListener("mouseleave", () => img.src = original);
    });
}

hoverSwapAll();