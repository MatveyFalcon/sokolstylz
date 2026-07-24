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