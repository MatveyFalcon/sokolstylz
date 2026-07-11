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