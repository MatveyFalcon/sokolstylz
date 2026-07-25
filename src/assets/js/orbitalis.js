const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const experienceItems = document.querySelectorAll(".works__item");

experienceItems.forEach((item) => {
    const button = item.querySelector(".works__button");

    button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        experienceItems.forEach((el) => {
            el.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }
    });
});

const slider = document.querySelector(".slider");

if (slider) {
    const image = slider.querySelector(".slider__image");
    const prevButton = slider.querySelector(".slider__button--prev");
    const nextButton = slider.querySelector(".slider__button--next");

    const current = slider.querySelector(".slider__current");
    const total = slider.querySelector(".slider__total");

    const images = [
        new URL("../images/orbitalis-slider/screen-01.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-02.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-03.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-04.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-05.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-06.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-07.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-08.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-09.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-10.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-11.webp", import.meta.url).href,
        new URL("../images/orbitalis-slider/screen-12.webp", import.meta.url).href,
    ];

    console.log(images);

    let currentIndex = 0;
    let animationId = 0;

    image.src = images[0];

    total.textContent = String(images.length).padStart(2, "0");
    updateCounter();
    preloadImages();

    function updateCounter() {
        current.textContent = String(currentIndex + 1).padStart(2, "0");
    }

    function preloadImages() {
        const nextIndex = (currentIndex + 1) % images.length;
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        const next = new Image();
        next.src = images[nextIndex];

        const prev = new Image();
        prev.src = images[prevIndex];
    }

    function changeSlide(direction) {
        animationId++;

        const currentAnimation = animationId;

        image.classList.remove("fade-in");
        image.classList.add("fade-out");

        setTimeout(() => {
            if (currentAnimation !== animationId) return;

            currentIndex =
                (currentIndex + direction + images.length) % images.length;

            image.src = images[currentIndex];

            updateCounter();
            preloadImages();

            image.classList.remove("fade-out");
            image.classList.add("fade-in");

            setTimeout(() => {
                if (currentAnimation !== animationId) return;

                image.classList.remove("fade-in");
            }, 200);

        }, 100);
    }

    prevButton.addEventListener("click", () => changeSlide(-1));
    nextButton.addEventListener("click", () => changeSlide(1));

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            changeSlide(-1);
        }

        if (event.key === "ArrowRight") {
            changeSlide(1);
        }
    });

    let startX = 0;
    let currentX = 0;

    let isDragging = false;
    let isPointerDown = false;

    const DRAG_DISTANCE = 90;

    function pointerDown(x) {
        startX = x;
        currentX = x;

        isPointerDown = true;
        isDragging = false;
    }

    function pointerMove(x) {
        if (!isPointerDown) return;

        currentX = x;

        const delta = currentX - startX;

        if (Math.abs(delta) > 12) {
            isDragging = true;
        }
    }

    function pointerUp() {
        if (!isPointerDown) return;

        const delta = currentX - startX;

        if (isDragging && Math.abs(delta) > DRAG_DISTANCE) {
            changeSlide(delta < 0 ? 1 : -1);
        }

        isPointerDown = false;
        isDragging = false;
    }

    image.addEventListener("mousedown", (event) => {
        event.preventDefault();
        pointerDown(event.clientX);
    });

    window.addEventListener("mousemove", (event) => {
        pointerMove(event.clientX);
    });

    window.addEventListener("mouseup", () => {
        pointerUp();
    });

    image.addEventListener(
        "touchstart",
        (event) => {
            if (event.touches.length !== 1 || window.visualViewport.scale > 1) return;;

            pointerDown(event.touches[0].clientX);
        },
        { passive: true }
    );

    image.addEventListener(
        "touchmove",
        (event) => {
            if (event.touches.length !== 1 || window.visualViewport.scale > 1) return;;

            pointerMove(event.touches[0].clientX);
        },
        { passive: true }
    );

    image.addEventListener(
        "touchend",
        () => {
            pointerUp();
        },
        { passive: true }
    );
}

const footer = document.querySelector(".footer");

// Только устройства с сенсорным экраном (iPhone, Android, iPad)
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (footer && isTouchDevice) {
    function updateBackground() {
        const rect = footer.getBoundingClientRect();

        // Если верх футера находится в пределах экрана,
        // делаем фон body черным.
        const isFooterVisible = rect.top < window.innerHeight;

        document.body.classList.toggle(
            "footer-visible",
            isFooterVisible
        );
    }

    window.addEventListener("scroll", updateBackground, {
        passive: true,
    });

    window.addEventListener("resize", updateBackground);

    updateBackground();
}