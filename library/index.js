// Burger menu
const bodyHidden = document.querySelector("body");
const iconMenu = document.querySelector(".header__burger-icon");
const navList = document.querySelector(".nav__list");
const navMenu = document.querySelector(".nav");

if (iconMenu) {
	iconMenu.addEventListener("click", function(e) {
		iconMenu.classList.toggle("activeIcon");
		navMenu.classList.toggle("activeMenu");
		bodyHidden.classList.toggle("bodyHidden");
	});
};

if (navList) {
	navList.addEventListener("click", function(e) {
		iconMenu.classList.remove("activeIcon");
		navMenu.classList.remove("activeMenu");
		bodyHidden.classList.remove("bodyHidden");
	});
};

window.addEventListener('click', function(e) {
	if (!iconMenu.contains(e.target) && !navMenu.contains(e.target)) {
		navMenu.classList.remove("activeMenu");
		iconMenu.classList.remove("activeIcon");
		bodyHidden.classList.remove("bodyHidden");
	}
});