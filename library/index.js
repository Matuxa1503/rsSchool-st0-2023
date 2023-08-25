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
// end burger menu


// Slider
// 1. Получаем наш слайдер 
const carousel = document.querySelector('.about__slider-line');
// стрелки
const arrowIcons = document.querySelectorAll('.about__arrowBtn');
const ARROW__LEFT = document.getElementById('arrowLeft');
const ARROW__RIGHT = document.getElementById('arrowRight');
// ширину одной картинки
const firstImg = document.querySelectorAll('.about__slider__img')[0];
let firstImgWidth = firstImg.clientWidth;
// и круглые кнопки
const btns = document.querySelectorAll('.about__pagination-content');
const btnsContent = document.querySelectorAll('.about__pagination-circle');

//2. В зависимости от нажатой icon кнопки делаем смещение и перекрашиваем активную кнопку в updateColor()
	btns.forEach((icon, i) => {
	icon.addEventListener('click', () => {
		updateColor(i)

		//2.1 проверяем по id нажатую кнопку на совпадение с id и в зависимости от кнопки делаем смещение при помощи scrollLeft
		if (icon.id == 'circle1') {
			carousel.scrollLeft = 0;
		}

		if (icon.id == 'circle2') {
			// условие в зависимости от ширины экрана
			if (window.innerWidth < 945) {
				carousel.scrollLeft = firstImgWidth;
			} else {
				carousel.scrollLeft = firstImgWidth + 30;
			}
		}

		if (icon.id == 'circle3') {
			if (window.innerWidth < 945) {
				carousel.scrollLeft = firstImgWidth * 2;
			} else {
			carousel.scrollLeft = (firstImgWidth + 30) * 2;
			}
		}

		if (icon.id == 'circle4') {
			if (window.innerWidth < 945) {
				carousel.scrollLeft = firstImgWidth * 3;
			} else {
			carousel.scrollLeft = (firstImgWidth + 30) * 3;
			}
		}

		if (icon.id == 'circle5') {
			if (window.innerWidth < 945) {
				carousel.scrollLeft = firstImgWidth * 4;
			} else {
			carousel.scrollLeft = (firstImgWidth + 30) * 4;
			}
		}
	});
});

// ф-ция обновление кнопки на активную и добавление активной кнопки disabled
function updateColor(index) {
	btnsContent.forEach(btn => {
		btn.classList.remove('active');
	})
	btns.forEach(btn => {
		btn.disabled = false;
	})

	btnsContent[index].classList.add('active');
	btns[index].disabled = true;
}

//3 Получаем 2 стрелки и в зависимости от нажатой делаем смещение вправо или влево
arrowIcons.forEach(icon => {
	icon.addEventListener('click', scrollImg);

	function scrollImg () {
		carousel.scrollLeft += icon.id == 'arrowLeft' ? -firstImgWidth : firstImgWidth;
	}

	//3.1 Защита от дурака во время выполнения скролла
	carousel.addEventListener('scroll',  () => {
		icon.removeEventListener('click', scrollImg);
	});

	//3.2 Отключение защиты в конце скролла и вызов функции которая проверяет если скролл минимальный или максимальный делает нашу стрелку disabled и добавляет opacity
	carousel.addEventListener('scrollend', () => {
		icon.addEventListener('click', scrollImg);
		opacityArrow()
	});

	// 3.3 вместе с нажатием на стрелку меняется и стиль наших круглых кнопок
	function opacityArrow () {
		if (carousel.scrollLeft == 0) {
			ARROW__LEFT.disabled = true;
			ARROW__LEFT.style.opacity = '0.3';
			updateColor(0);
		} else {
			ARROW__LEFT.style.opacity = '1'
			ARROW__LEFT.disabled = false;
		}

		if (Math.round(carousel.scrollLeft) > 440 && Math.round(carousel.scrollLeft) < 455) {
			updateColor(1);
		} else if (Math.round(carousel.scrollLeft) > 890 && Math.round(carousel.scrollLeft) < 905) {
			updateColor(2);
		} else if (Math.round(carousel.scrollLeft) > 1340 && Math.round(carousel.scrollLeft) < 1355) {
			updateColor(3);
		}

		if (Math.round(carousel.scrollLeft) > 1790 && Math.round(carousel.scrollLeft) < 1800) {
			ARROW__RIGHT.disabled = true;
			ARROW__RIGHT.style.opacity = '0.3';
			updateColor(4);
		} else {
			ARROW__RIGHT.style.opacity = '1'
			ARROW__RIGHT.disabled = false;
		}
	}
});
// end Slider