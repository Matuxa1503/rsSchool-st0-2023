// для запрета скролла страницы
const bodyHidden = document.querySelector('body');


// Drop Menu
const headerIcon = document.querySelector('.header__icon');
const headerDropMenu = document.querySelector('.header__dropMenu');

headerIcon.addEventListener('click', () => {
	headerDropMenu.classList.toggle('noneDisplay');
});

window.addEventListener('click', function(e) {
	if (!headerIcon.contains(e.target) && !headerDropMenu.contains(e.target)) {
		headerDropMenu.classList.add('noneDisplay');
	}
});
// end Drop Menu


// REGISTER USER

	// Modal Register
// делает opacity body
const bcgOpacity = document.querySelector('.bcgOpacity');

// Получаем наш элемент(кнопку) в дропменю Register
const registerDropMenu = document.querySelector('.dropMenu__register');

// Модалка с крестиком
const modalRegister = document.querySelector('.modal__register');
const modalRegisterIcon = document.querySelector('.modal__register__icon');

// Кнопка Sign Up в секции Digital Library Cards
const registerButton = document.querySelector('.register__btn');

// Клик
registerDropMenu.addEventListener('click', showModalRegister);
registerButton.addEventListener('click', showModalRegister);

// Показывать или прятать модалку, добавлять фон под модалкой или убирать, запрещать скролл или разрешать
function showModalRegister() {
	modalRegister.classList.toggle('noneDisplay');
	bcgOpacity.classList.toggle('activeOpacity');
	bodyHidden.classList.toggle('bodyHiddenModal');
}

// Клик на иконку крестика в модалке переключает классы в функции
modalRegisterIcon.addEventListener('click', () => {
	showModalRegister()
});

// Клик за пределами модалки (то есть по bcgOpacity) переключает классы в функции 
bcgOpacity.addEventListener('click', function(e) {
	if (!modalRegister.classList.contains('noneDisplay')) {
		showModalRegister()
	}
});


	// Проверка формы на валидность

	// 3. После вызова validation cоздаем переменную let result = true и ниже начинаем проверять каждый input на валидность
function validation(form) {

	// 5. Удаление ошибок. Получаем input.parentNode (то есть родителя нашего инпута, а это .modal__register__content в html) и если у него есть класс ошибки
	// errorInput тогда удаляем наш label в котором написана причина ошибки и сам errorInput
	function removeError(input) {
		const parent = input.parentNode;
		
		if (parent.classList.contains('errorInput')) {
			parent.querySelector('.errorLabelModal').remove();
			parent.classList.remove('errorInput');
		}
	}

	// 5. Создание ошибок. Передаем инпут и название ошибки, создаем label, ему добавляем класс errorLabelModal(и присваиваем ему текст ошибки)
	function createError(input, text) {
		const errorLabel = document.createElement('label');
		errorLabel.classList.add('errorLabelModal');
		errorLabel.textContent = text;

		//получаем родителя инпута и красим границу инпута в красный, добавляем как ребенка под инпутом наш label c ошибкой
		const parent = input.parentNode;
		parent.classList.add('errorInput');
		parent.append(errorLabel);
	}

	let result = true;

	// 4. Удаляем если были изначально ошибки 
	form.querySelectorAll('input').forEach(input => {
		removeError(input);

		//4.1 Проверка имени и фамилии через дата атрибут в html
		if (input.dataset.required) {
			//4.2 Удаляем если были изначально ошибки и проверяем если инпут не соответсвует условию, тогда создаем для него ошибку createError() и присваем result = false
			removeError(input);
			if (input.value == '') {
				createError(input, 'Поле не заполнено')
				result = false;
			}
		}

			// Проверка почты через дата атрибут в html
		if (input.dataset.checkEmail) {
			removeError(input);
			if (!input.value.includes(input.dataset.checkEmail) && input.value.length < 2) {
				createError(input, `Неккоректный адрес электронной почты`)
				result = false;
			}
		}

			// Проверка для пароля через дата атрибут в html
		if (input.dataset.passwordLength) {
			removeError(input);
			if (input.value.length < input.dataset.passwordLength) {
				createError(input, `Пароль должен быть не короче ${input.dataset.passwordLength} символов`)
				result = false;
			}
		}

	});
	// 6.Возвращаем result
	return result
}

// 1.При событии submit удаляем действие по умолчанию(e.preventDefault()) и делаем следующее
document.getElementById('modal__register__form').addEventListener('submit', function(e) {
	e.preventDefault();

//2.Вызываем функцию validation и ей передаем нашу форму через this 
	if (validation(this) == true) {
		// 7. Если result вернул true
		// 7.2 создаем наш объект и возвращаем его неявно
		function User(input1, input2, input3, input4, card) {
			this.name = input1;
			this.surname = input2;
			this.email = input3;
			this.password = input4;
			this.cardNumber = card;
		}

		// 7.1 Получаем наши инпуты с данными и записываем в переменные, создаем рандомный Card number и передаем все данные в new User
		const futureObject = this.querySelectorAll('input');
		let name = futureObject[0].value;
		let surname = futureObject[1].value;
		let email = futureObject[2].value;
		let password = futureObject[3].value;

		// Card number
		let cardNumber = '';
		while (cardNumber.length < 9) {
		cardNumber += Math.floor(Math.random() * 16).toString(16)
		}
		// ---------

		let user = new User(name, surname, email, password, cardNumber);
		
		// 7.3 Записываем его в localStorage
		localStorage.setItem('user', JSON.stringify(user));

		// 7.4 После записи в localStorage чистим наши инпуты
		futureObject.forEach(input => {
			input.value = '';
		});

		// 7.5 Получаем 2 буквы для записи их в иконку и иконку по умолчанию прячем
		const headerIconUser = document.querySelector('.header__iconUser');
		let p = document.createElement('p');
		p.innerHTML = `${name[0]}${surname[0]}`
		headerIconUser.append(p);
		headerIcon.classList.add('noneDisplay');
		headerIconUser.classList.remove('noneDisplay');
	}
});
// end REGISTER USER


// Burger menu
const iconMenu = document.querySelector('.header__burger-icon');
const navList = document.querySelector('.nav__list');
const navMenu = document.querySelector('.nav');

if (iconMenu) {
	iconMenu.addEventListener('click', function(e) {
		iconMenu.classList.toggle('activeIcon');
		navMenu.classList.toggle('activeMenu');
		bodyHidden.classList.toggle('bodyHidden');
	});
	headerDropMenu.classList.add('noneDisplay');
};

if (navList) {
	navList.addEventListener('click', function(e) {
		iconMenu.classList.remove('activeIcon');
		navMenu.classList.remove('activeMenu');
		bodyHidden.classList.remove('bodyHidden');
	});
};

window.addEventListener('click', function(e) {
	if (!iconMenu.contains(e.target) && !navMenu.contains(e.target)) {
		navMenu.classList.remove('activeMenu');
		iconMenu.classList.remove('activeIcon');
		bodyHidden.classList.remove('bodyHidden');
	}
});
// end burger menu


// Slider About
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



// Slider Favorites
const radioBtns = document.querySelectorAll('.favorites__btn');
const favBooks = document.querySelectorAll('.favorites__books');
const favParagraph = document.querySelector('.favorites__paragraph');
const favWrapperBtns = document.querySelector('.favorites__radioButtons');
const favTitle = document.querySelector('.favorites__title');


window.addEventListener('scroll', () => {
	if (window.innerWidth < 945) {
		if (window.scrollY > 1775 && window.scrollY < 4100) {
			favTitle.style.marginBottom = 180 + 'px';
			favParagraph.style.position = 'fixed';
			favParagraph.style.paddingTop = 15 + 'px';
			favParagraph.style.paddingBottom = 25 + 'px';

			favWrapperBtns.style.position = 'fixed';
			favWrapperBtns.style.top = 55 + 'px';
			favWrapperBtns.style.paddingBottom = 15 + 'px';
		} else {
			favTitle.style.marginBottom = 0 + 'px';
			favParagraph.style.position = 'relative';
			favParagraph.style.padding = 0 + 'px';

			favWrapperBtns.style.position = 'relative';
			favWrapperBtns.style.top = 0 + 'px';
			favWrapperBtns.style.padding = 0 + 'px';
		}
	}
});

radioBtns.forEach(radio => {
	radio.addEventListener('click', () => {

		favBooks.forEach(books => {

			function animFavBlock (allBooks, currentBooks) {
				allBooks.classList.add('transition-fade');

				allBooks.addEventListener('animationend', animationEvent => {
					if (animationEvent.animationName == 'fade') {
						for (books of favBooks) {
							books.classList.remove('transition-fade');
							books.classList.add('noneDisplay');
						}
						currentBooks.classList.remove('noneDisplay');
						currentBooks.classList.add('transition-appearance');
					}
				});
				
				currentBooks.addEventListener('animationend', () => {
					for (books of favBooks) {
						books.classList.remove('transition-appearance');
					}
				});
			}

			if (radio.id == 'winterBtn' && !radio.children[0].checked) {
				animFavBlock(books, favBooks[0]);
			}

			if (radio.id == 'springBtn' && !radio.children[0].checked) {
				animFavBlock(books, favBooks[1]);
			}

			if (radio.id == 'summerBtn' && !radio.children[0].checked) {
				animFavBlock(books, favBooks[2]);
			}

			if (radio.id == 'autumnBtn' && !radio.children[0].checked) {
				animFavBlock(books, favBooks[3]);
			}

		});  // radionBtns.forEach
	});  // radio.addEventListener
});  // favBooks.forEach
//end Slider Favorites



