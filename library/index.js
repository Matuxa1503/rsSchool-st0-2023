// для запрета скролла страницы
const bodyHidden = document.querySelector('body');

// делает opacity body
const bcgOpacity = document.querySelector('.bcgOpacity');
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

// let loginUser;
// if (localStorage.getItem('loginUser') == 'true') {
// 	loginUser = true;
// } else {
// 	loginUser = false;
// }

// 1 этап
function beforeLogin () {
if (!localStorage.getItem('loginUser') || localStorage.getItem('loginUser') == 'false') {

	// Блок с кнопками регистрации и логина в блоке Digital Library Cards
const libraryCardLogin = document.querySelector('.libraryCard__login');
libraryCardLogin.classList.remove('noneDisplay');



// REGISTER USER
	// Modal Register
// Получаем наш элемент(кнопку) в дропменю Register
const registerDropMenu = document.querySelector('.dropMenu__register');

// Модалка с крестиком
const modalRegister = document.querySelector('.modal__register');
const modalRegisterIcon = document.querySelector('.modal__register__icon');

// Кнопка login в register. Прячем modal register, показываем modal login
const loginInRegister = document.querySelector('.modal__register__login>button');
loginInRegister.addEventListener('click', () => {
	showModalRegister()
	showModalLogin()
});

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
			cardNumber += Math.floor(Math.random() * 16).toString(16).toUpperCase();
		}
		// ---------

		let user = new User(name, surname, email, password, cardNumber);
		
		// 7.3 Записываем его в localStorage
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('visits', JSON.stringify(1));
		localStorage.setItem('loginUser', 'true');
		localStorage.setItem('libraryCard', 'false');
		localStorage.setItem('booksCounter', '0');
		localStorage.setItem('booksList', '[]');

		// 7.4 После записи в localStorage чистим наши инпуты
		futureObject.forEach(input => {
			input.value = '';
		});
		showModalRegister()
		location.reload()
		// afterLogin()
	}
});
// end REGISTER USER

// LOGIN USER
	// Modal login
// Получаем наш элемент(кнопку) в дропменю Login
const loginDropMenu = document.querySelector('.dropMenu__login');

// Модалка с крестиком
const modalLogin = document.querySelector('.modal__login');
const modalLoginIcon = document.querySelector('.modal__login__icon');

// Кнопка Sign Up в секции Digital Library Cards
const loginButton = document.querySelector('.login__btn');

// Кнопки buy в favorites
const favoritesButton = document.querySelectorAll('.favorites__book__btn');

// Кнопка register в login. Прячем modal login, показываем modal register
const RegisterInLogin = document.querySelector('.modal__login__register>button');
RegisterInLogin.addEventListener('click', () => {
	showModalLogin()
	showModalRegister()
});

// Клик
loginDropMenu.addEventListener('click', showModalLogin);
loginButton.addEventListener('click', showModalLogin);
favoritesButton.forEach(currentBtn => currentBtn.addEventListener('click', showModalLogin));

// Показывать или прятать модалку, добавлять фон под модалкой или убирать, запрещать скролл или разрешать
function showModalLogin() {
	modalLogin.classList.toggle('noneDisplay');
	bcgOpacity.classList.toggle('activeOpacity');
	bodyHidden.classList.toggle('bodyHiddenModal');
}

// Клик на иконку крестика в модалке переключает классы в функции
modalLoginIcon.addEventListener('click', () => {
	showModalLogin()
});

// Клик за пределами модалки (то есть по bcgOpacity) переключает классы в функции 
bcgOpacity.addEventListener('click', function(e) {
	if (!modalLogin.classList.contains('noneDisplay')) {
		showModalLogin()
	}
});

document.getElementById('modal__login__form').addEventListener('submit', function(e) {
	e.preventDefault();

//2.Вызываем функцию validation и ей передаем нашу форму через this
	if (validation(this) == true) {
		const inputsLogin = document.querySelectorAll('.modal__login__input');
		let res = 0
		inputsLogin.forEach(input => {
			if (input.value == JSON.parse(localStorage.getItem('user')).cardNumber || input.value == JSON.parse(localStorage.getItem('user')).email) {
				res++
			}
			if (input.value == JSON.parse(localStorage.getItem('user')).password) {
				res++
			}
		});
		if (res == 2) {
			localStorage.setItem('loginUser', true);
			localStorage.setItem('visits', JSON.parse(localStorage.getItem('visits')) + 1);
			showModalLogin()
			location.reload()
		}
	}
});

// без авторизации клик на check the card
	document.getElementById('libraryCard__form').addEventListener('submit', function(e) {
		e.preventDefault()
		let res = 0;
		const inputsLibraryCard = this.querySelectorAll('.libraryCard__form-input');
		inputsLibraryCard.forEach(input => {
			if (input.value == JSON.parse(localStorage.getItem('user')).name) {
				res++
			}

			if (input.value == JSON.parse(localStorage.getItem('user')).cardNumber) {
				res++
			}
			});

		if (res == 2) {
			document.querySelector('.libraryCard__form-btn').classList.add('noneDisplay');
			document.querySelector('.libraryCard__info__wrapper').classList.remove('noneDisplay');
			const profileCounter = document.querySelectorAll('.visits__counter');
			profileCounter.forEach(visitsCounter => {
				visitsCounter.innerHTML = JSON.parse(localStorage.getItem('visits'));
			});
			const profileBooksCounter = document.querySelectorAll('.books__counter');
			profileBooksCounter.forEach(counterBooks => {
				counterBooks.innerHTML = JSON.parse(localStorage.getItem('booksCounter'));
			});
			setTimeout(() => {
				document.querySelector('.libraryCard__info__wrapper').classList.add('noneDisplay');
				document.querySelector('.libraryCard__form-btn').classList.remove('noneDisplay');
				inputsLibraryCard.forEach(input => input.value = '');
			}, '10000');
		}
	});

}// end LOGIN USER
} // end function beforeLogin
beforeLogin()


// USER AFTER LOGIN
function afterLogin() {
	if (localStorage.getItem('loginUser') == 'true') {

	const libraryCardLogin = document.querySelector('.libraryCard__login');
	libraryCardLogin.classList.add('noneDisplay');


		// Блок с кнопкой profile в блоке Digital Library Cards
		const libraryCardAfterLogin = document.querySelector('.libraryCard__afterLogin');
		libraryCardAfterLogin.classList.remove('noneDisplay');

	// При авторизации клик по иконке
	const headerIconUser = document.querySelector('.header__iconUser');
	const headerDropMenuUser = document.querySelector('.header__dropMenuUser');
	const headerDropMenuUserTitle = document.querySelector('.header__dropMenuUser__title');

	headerIconUser.addEventListener('click', () => {
		headerDropMenuUser.classList.toggle('noneDisplay');
	});

	window.addEventListener('click', function(e) {
		if (!headerIconUser.contains(e.target) && !headerDropMenuUser.contains(e.target)) {
			headerDropMenuUser.classList.add('noneDisplay');
		}
	});

	headerDropMenuUserTitle.innerHTML = JSON.parse(localStorage.getItem('user')).cardNumber;

	let nameAndSurname = JSON.parse(localStorage.getItem('user')).name + " " + JSON.parse(localStorage.getItem('user')).surname;
	headerIconUser.setAttribute('title', nameAndSurname);

	// 7.5 Получаем 2 буквы для записи их в иконку и иконку по умолчанию прячем
			function createName () {
				let p = document.createElement('p');
				p.innerHTML = JSON.parse(localStorage.getItem('user')).name[0].toUpperCase() + JSON.parse(localStorage.getItem('user')).surname[0].toUpperCase();
				return p
			}
			
			headerIconUser.append(createName());
			headerIcon.classList.add('noneDisplay');
			headerIconUser.classList.remove('noneDisplay');

			// libraryCardForm
			const libraryCardInputName = document.querySelector('.libraryCard__input-name');
			const libraryCardInputCard = document.querySelector('.libraryCard__input-card');
			const libraryFormBtn = document.querySelector('.libraryCard__form-btn');
			const libraryCardInfo = document.querySelector('.libraryCard__info__wrapper');
			libraryCardInputName.value = JSON.parse(localStorage.getItem('user')).name;
			libraryCardInputCard.value = JSON.parse(localStorage.getItem('user')).cardNumber;
			libraryFormBtn.classList.toggle('noneDisplay');
			libraryCardInfo.classList.toggle('noneDisplay');




			// log out
			const logoutDropMenuUser = document.querySelector('.dropMenuUser__logOut');
			logoutDropMenuUser.addEventListener('click', () => {
				localStorage.setItem('loginUser', false);
				headerIcon.classList.remove('noneDisplay');
				headerIconUser.classList.add('noneDisplay');
				headerDropMenuUser.classList.add('noneDisplay');
				libraryCardAfterLogin.classList.add('noneDisplay');

				//libraryCardForm
				libraryCardInputName.value = '';
				libraryCardInputCard.value = '';
				libraryFormBtn.classList.toggle('noneDisplay');
				libraryCardInfo.classList.toggle('noneDisplay');
				location.reload()
			});

			// modalProfile
			const profileUser = document.querySelector('.dropMenuUser__profile');
			const dropMenuProfile = document.querySelector('.modal__profile');
			const modalIconProfile = document.querySelector('.modal__profile__icon');
			const profileCounter = document.querySelectorAll('.visits__counter');
			const profileBtn = document.querySelector('.profile__btn');


			profileCounter.forEach(visitsCounter => {
				visitsCounter.innerHTML = JSON.parse(localStorage.getItem('visits'));
			});
			


			profileUser.addEventListener('click', showProfileUser)
			profileBtn.addEventListener('click', showProfileUser)

			function showProfileUser () {
				dropMenuProfile.classList.toggle('noneDisplay');
				bcgOpacity.classList.toggle('activeOpacity');
				bodyHidden.classList.toggle('bodyHiddenModal');
			}

			modalIconProfile.addEventListener('click', () => showProfileUser())

			bcgOpacity.addEventListener('click', function(e) {
				if (!dropMenuProfile.contains(e.target) && !dropMenuProfile.classList.contains('noneDisplay')) {
					showProfileUser()
				}
			});

			const profileIconUser = document.querySelector('.profile__left__icon');
			const profileIconName = document.querySelector('.profile__left__name');
			const profileCardNum = document.querySelector('.profile__cardNumber');
			const clipboardProfile = document.querySelector('.clipboard');

			profileIconUser.append(createName());
			let p = document.createElement('p');
			p.innerHTML = JSON.parse(localStorage.getItem('user')).name + " " + JSON.parse(localStorage.getItem('user')).surname;
			profileIconName.append(p);
			profileCardNum.append(JSON.parse(localStorage.getItem('user')).cardNumber);

			clipboardProfile.addEventListener('click', () => {
				navigator.clipboard.writeText(JSON.parse(localStorage.getItem('user')).cardNumber)
			});

			const favoritesBooks = document.querySelectorAll('.favorites__book__title');
			const favoritesBookBtns = document.querySelectorAll('.favorites__book__btn');
			const modalBuyCard = document.querySelector('.modal__buyCard');
			const modalBuyCardIcon = document.querySelector('.modal__buyCard__icon');
			const rentedBooks = document.querySelector('.profile__rented__books');
			const profileBooksCounter = document.querySelectorAll('.books__counter');

			function showModalCard() {
				modalBuyCard.classList.toggle('noneDisplay');
				bcgOpacity.classList.toggle('activeOpacity');
				bodyHidden.classList.toggle('bodyHiddenModal');
			}

			favoritesBookBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					if (JSON.parse(localStorage.getItem('libraryCard'))) {
						function createLiForRented (currentBook, id) {
							// добавляем книгу в rented book и изменяем счетчик
							let li = document.createElement('li');
							let liText = currentBook.textContent;
							let liTextNew = liText.replace(/by/i, ',');
							li.innerHTML = liTextNew;
							rentedBooks.append(li);

							// cчетчик книг
							localStorage.setItem('booksCounter', JSON.parse(localStorage.getItem('booksCounter')) + 1);
							profileBooksCounter.forEach(counterBooks => {
								counterBooks.innerHTML = JSON.parse(localStorage.getItem('booksCounter'));
							})

							// записываем название книг в массив localStorage
							let localStorageBook = JSON.parse(localStorage.getItem('booksList'));
							function BookIntoLocalStorage(text, id) {
								this.bookTitle = text;
								this.idBook = id;
							}
							let book = new BookIntoLocalStorage(liTextNew, id);
							localStorageBook.push(book);
							localStorage.setItem('booksList', JSON.stringify(localStorageBook));
						}

						if (btn.id == 'buy1') {
							createLiForRented(favoritesBooks[0], btn.id);
						}
						if (btn.id == 'buy2') {
							createLiForRented(favoritesBooks[1], btn.id);
						}
						if (btn.id == 'buy3') {
							createLiForRented(favoritesBooks[2], btn.id);
						}
						if (btn.id == 'buy4') {
							createLiForRented(favoritesBooks[3], btn.id);
						}
						if (btn.id == 'buy5') {
							createLiForRented(favoritesBooks[4], btn.id);
						}
						if (btn.id == 'buy6') {
							createLiForRented(favoritesBooks[5], btn.id);
						}
						if (btn.id == 'buy7') {
							createLiForRented(favoritesBooks[6], btn.id);
						}
						if (btn.id == 'buy8') {
							createLiForRented(favoritesBooks[7], btn.id);
						}
						if (btn.id == 'buy9') {
							createLiForRented(favoritesBooks[8], btn.id);
						}
						if (btn.id == 'buy10') {
							createLiForRented(favoritesBooks[9], btn.id);
						}
						if (btn.id == 'buy11') {
							createLiForRented(favoritesBooks[10], btn.id);
						}
						if (btn.id == 'buy12') {
							createLiForRented(favoritesBooks[11], btn.id);
						}
						if (btn.id == 'buy13') {
							createLiForRented(favoritesBooks[12], btn.id);
						}
						if (btn.id == 'buy14') {
							createLiForRented(favoritesBooks[13], btn.id);
						}
						if (btn.id == 'buy15') {
							createLiForRented(favoritesBooks[14], btn.id);
						}
						if (btn.id == 'buy16') {
							createLiForRented(favoritesBooks[15], btn.id);
						}
						btn.disabled = true;
						btn.innerHTML = 'Own'
					} else {
						showModalCard()
					}
				});
			});

			if (JSON.parse(localStorage.getItem('booksList')).length != 0) {
				JSON.parse(localStorage.getItem('booksList')).forEach(currentBook => {
					function createRentedLi(nameTitle) {
						let li = document.createElement('li');
						li.innerHTML = nameTitle;
						rentedBooks.append(li);
					}
					createRentedLi(currentBook.bookTitle);

					// cчетчик книг
					profileBooksCounter.forEach(counterBooks => {
						counterBooks.innerHTML = JSON.parse(localStorage.getItem('booksCounter'));
					})

					favoritesBookBtns.forEach(btn => {
						if (currentBook.idBook == btn.id) {
							btn.disabled = true;
							btn.innerHTML = 'Own'
						}
					});
				})
			}

			modalBuyCardIcon.addEventListener('click', () => {
				showModalCard()
			})

			bcgOpacity.addEventListener('click', function(e) {
				if (!modalBuyCard.classList.contains('noneDisplay') && !modalBuyCard.contains(e.target)) {
					showModalCard()
				}
			});


			function validation(form) {

				function removeError(input) {
					const parent = input.parentNode;
					
					if (parent.classList.contains('errorInput')) {
						parent.querySelector('.errorLabelModal').remove();
						parent.classList.remove('errorInput');
					}
				}
				//Создание ошибок. Передаем инпут и название ошибки, создаем label, ему добавляем класс errorLabelModal(и присваиваем ему текст ошибки)
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
				//Удаляем если были изначально ошибки 
				form.querySelectorAll('input').forEach(input => {
					removeError(input);
					//Проверка имени и фамилии через дата атрибут в html
					if (input.dataset.required) {
						//Удаляем если были изначально ошибки и проверяем если инпут не соответсвует условию, тогда создаем для него ошибку createError() и присваем result = false
						removeError(input);
						if (input.value == '') {
							createError(input, 'Поле не заполнено')
							result = false;
						}
					}

					if (input.dataset.numLength) {
						removeError(input);
						if (input.dataset.numLength < 5) {
							if (input.value.length < input.dataset.numLength) {
								createError(input, `Должен содержать ${input.dataset.numLength} символа`)
								result = false;
							}
						} else {
							if (input.value.length < input.dataset.numLength) {
								createError(input, `Должен содержать ${input.dataset.numLength} символов`)
								result = false;
							}
						}
					}
				});
				// Возвращаем result
				return result
			}

			document.getElementById('modal__buyCard__inputs').addEventListener('submit', function(e) {
				e.preventDefault();
			
			//Вызываем функцию validation и ей передаем нашу форму через this
				if (validation(this) == true) {
					localStorage.setItem('libraryCard', true);
					showModalCard()
					location.reload()
				}
			});


		} 
	}  // end function afterLogin
// end USER AFTER LOGIN
afterLogin()



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



