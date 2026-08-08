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