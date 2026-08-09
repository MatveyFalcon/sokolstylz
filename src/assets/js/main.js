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

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const navLinksSmooth = document.querySelectorAll('a[href^="#"]');

function smoothScrollTo(targetY, duration = 1400) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function ease(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(
            0,
            startY + distance * ease(progress)
        );

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

navLinksSmooth.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        const offset = Math.min(
            Math.max(window.innerWidth * 0.08, 126),
            160
        );

        const top =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        smoothScrollTo(top);
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