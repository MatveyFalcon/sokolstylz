const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const headerLinks = document.querySelector(".header__links");
const mobileActions = document.querySelector(".nav__mobile-actions");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    if (burger.classList.contains("active")) {
        mobileActions.innerHTML = "";

        const mobileLinks = headerLinks.cloneNode(true);

        mobileLinks.classList.remove("header__links");
        mobileLinks.classList.add("mobile-links");

        mobileActions.appendChild(mobileLinks);
    } else {
        mobileActions.innerHTML = "";
    }
});

const navLinks = document.querySelectorAll(".nav__link, .logo-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");
    });
});

const logo = document.querySelector(".logo-link");
const logoImg = document.querySelector(".logo-link__group img");

logo.addEventListener("click", () => {
    // Если анимация уже идет — перезапускаем
    logoImg.classList.remove("rotate");

    // Форсируем перерасчет стилей
    void logoImg.offsetWidth;

    logoImg.classList.add("rotate");
});

logoImg.addEventListener("transitionend", () => {
    logoImg.classList.remove("rotate");
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