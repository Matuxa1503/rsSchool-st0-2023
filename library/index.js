// Проверка формы на валидность в модалке 
// 3. После вызова validation cоздаем let result = true и проверяется каждый input на валидность
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
		// получаем родителя инпута и красим границу инпута в красный, добавляем как ребенка под инпутом наш label c ошибкой
		const parent = input.parentNode;
		parent.classList.add('errorInput');
		parent.append(errorLabel);
	}

	let result = true;

	// 4. Удаляем если были изначально ошибки 
	form.querySelectorAll('input').forEach(input => {
		removeError(input);

		// 4.1 Проверка имени и фамилии через дата атрибут в html
		if (input.dataset.required) {
			// 4.2 Удаляем если были изначально ошибки и проверяем если инпут не соответсвует условию, тогда создаем для него ошибку createError() и присваем result = false
			removeError(input);
			if (input.value == '') {
				createError(input, 'Поле не заполнено')
				result = false;
			}
		}

		// 4.1 Проверка почты через дата атрибут в html
		if (input.dataset.checkEmail) {
			removeError(input);
			if (!input.value.includes(input.dataset.checkEmail) && input.value.length < 2) {
				createError(input, `Неккоректный адрес электронной почты`)
				result = false;
			}
		}

		// 4.1 Проверка для пароля через дата атрибут в html
		if (input.dataset.passwordLength) {
			removeError(input);
			if (input.value.length < input.dataset.passwordLength) {
				createError(input, `Пароль должен быть не короче ${input.dataset.passwordLength} символов`)
				result = false;
			}
		}

		// Проверка после login (покупка libraryCard)
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

	// 6.Возвращаем result
	return result
} // конец проверки формы на валидность


// для запрета скролла страницы
const bodyHidden = document.querySelector('body');

// делает opacity body
const bcgOpacity = document.querySelector('.bcgOpacity');

// Drop Menu
const headerIcon = document.querySelector('.header__icon');
const headerDropMenu = document.querySelector('.header__dropMenu');

// Клик на иконку открывает Drop Menu,
headerIcon.addEventListener('click', () => {
	headerDropMenu.classList.toggle('noneDisplay');
});
// клик за пределом закрывает его 
window.addEventListener('click', function (e) {
	if (!headerIcon.contains(e.target) && !headerDropMenu.contains(e.target)) {
		headerDropMenu.classList.add('noneDisplay');
	}
});

// Заголовок с радиокнопками в favorites
const favParagraph = document.querySelector('.favorites__paragraph');
const favWrapperBtns = document.querySelector('.favorites__radioButtons');

// Прячем шапку при вызове showModalLogin() или showModalRegister() при клике на кнопку в favorites
function hiddenRadioBtns() {
	favParagraph.classList.toggle('noneDisplay');
	favWrapperBtns.classList.toggle('noneDisplay');
}

// Ф-ция для показа модалок(register, login, profile user, buy card)
function showModal(modal) {
	modal.classList.toggle('noneDisplay');
	bcgOpacity.classList.toggle('activeOpacity');
	bodyHidden.classList.toggle('bodyHiddenModal');
}

// BEFORE LOGIN
function beforeLogin() {
	if (!localStorage.getItem('loginUser') || localStorage.getItem('loginUser') == 'false') {
		// REGISTER USER
		// Блок с кнопками регистрации и логина в блоке Digital Library Cards (показываем)
		document.querySelector('.libraryCard__login').classList.remove('noneDisplay');

		// =========== Modal Register
		// Кнопка Register в дропменю
		const registerDropMenu = document.querySelector('.dropMenu__register');

		// Модалка регистрации с крестиком
		const modalRegister = document.querySelector('.modal__register');
		const modalRegisterIcon = document.querySelector('.modal__register__icon');

		// Кнопка login в register cнизу. Hidden modal register, show modal login
		const loginInRegister = document.querySelector('.modal__register__login>button');

		// Кнопка Sign Up в секции Digital Library Cards
		const registerButton = document.querySelector('.register__btn');

		// Показать или спрятать модалку, добавить задний фон или убирать, запретить скролл или разрешить
		function showModalRegister() {
			showModal(modalRegister);
		}

		// Клик за пределами модалки (по bcgOpacity) вызывает showModalRegister
		bcgOpacity.addEventListener('click', () => {
			if (!modalRegister.classList.contains('noneDisplay')) {
				showModalRegister()
				hiddenRadioBtns()
			}
		});

		loginInRegister.addEventListener('click', () => {
			showModalRegister()
			showModalLogin()
		});

		registerDropMenu.addEventListener('click', showModalRegister);
		registerButton.addEventListener('click', showModalRegister);

		modalRegisterIcon.addEventListener('click', () => {
			showModalRegister()
			hiddenRadioBtns()
		});

		// 1. При submit формы удаляется действие по умолчанию(e.preventDefault())
		document.getElementById('modal__register__form').addEventListener('submit', function (e) {
			e.preventDefault();

			// 2. Вызов ф-ции validation (передается submit форма) 
			if (validation(this) == true) {  // 7. Если result вернул true
				// 7.2 создается User
				function User(input1, input2, input3, input4, card, visits, libraryCard, booksCounter, booksList) {
					this.name = input1;
					this.surname = input2;
					this.email = input3;
					this.password = input4;
					this.cardNumber = card;
					this.visits = visits;
					this.libraryCard = libraryCard;
					this.booksCounter = booksCounter;
					this.booksList = booksList;
				}

				// 7.1 Получаем инпуты с данными введенные в форме и записываем в переменные
				const futureObject = this.querySelectorAll('input');
				let name = futureObject[0].value,
					surname = futureObject[1].value,
					email = futureObject[2].value,
					password = futureObject[3].value,
					cardNumber = '',
					visits = 1,
					libraryCard = false,
					booksCounter = 0,
					booksList = [];
				while (cardNumber.length < 9) {
					cardNumber += Math.floor(Math.random() * 16).toString(16).toUpperCase();
				}

				let user = new User(name, surname, email, password, cardNumber, visits, libraryCard, booksCounter, booksList);// user создан

				// Массив для local Storage
				let arrLocalStorage = [];

				if (localStorage.getItem('users')) {
					arrLocalStorage = JSON.parse(localStorage.getItem('users')).map(item => item);
					arrLocalStorage.push(user);
				} else {
					arrLocalStorage.push(user);
				}

				// 7.2 Записываем его в localStorage
				localStorage.setItem('users', JSON.stringify(arrLocalStorage));
				localStorage.setItem('loginUser', 'true');
				localStorage.setItem('currentUser', JSON.stringify(user));

				// 7.3 После записи в localStorage чистим наши инпуты
				futureObject.forEach(input => {
					input.value = '';
				});
				showModalRegister() // прячем модалку регистрации
				location.reload() // перезагрузка страницы
			}
		});
		// END REGISTER USER and modal register

		// LOGIN USER
		// ========= Modal login
		// Кнопка Login в дропменю 
		const loginDropMenu = document.querySelector('.dropMenu__login');
		// Модалка с крестиком
		const modalLogin = document.querySelector('.modal__login');
		const modalLoginIcon = document.querySelector('.modal__login__icon');
		// Кнопка Sign Up в секции Digital Library Cards
		const loginButton = document.querySelector('.login__btn');
		// Кнопки buy в favorites
		const favoritesButton = document.querySelectorAll('.favorites__book__btn');
		// Кнопка register в login cнизу. Hidden modal login, show modal register
		const RegisterInLogin = document.querySelector('.modal__login__register>button');

		// Показать или спрятать модалку, добавить задний фон или убирать, запретить скролл или разрешить
		function showModalLogin() {
			showModal(modalLogin);
		}

		RegisterInLogin.addEventListener('click', () => {
			showModalLogin()
			showModalRegister()
		});

		// Прячем шапку при вызове showModalLogin() или showModalRegister() при клике на кнопку в favorites
		function hiddenRadioBtns() {
			favParagraph.classList.toggle('noneDisplay');
			favWrapperBtns.classList.toggle('noneDisplay');
		}

		loginDropMenu.addEventListener('click', showModalLogin);
		loginButton.addEventListener('click', showModalLogin);

		favoritesButton.forEach(currentBtn => {
			currentBtn.addEventListener('click', showModalLogin);
			currentBtn.addEventListener('click', hiddenRadioBtns);
		});

		modalLoginIcon.addEventListener('click', () => {
			showModalLogin()
			hiddenRadioBtns()
		});

		// Клик за пределами модалки (по bcgOpacity) 
		bcgOpacity.addEventListener('click', function (e) {
			if (!modalLogin.classList.contains('noneDisplay')) {
				showModalLogin()
				hiddenRadioBtns()
			}
		});

		// Проверка формы на валидность и получаем текущего user который записываем в local storage (currentUser)
		document.getElementById('modal__login__form').addEventListener('submit', function (e) {
			e.preventDefault();
			if (validation(this) == true) {
				const inputsLogin = document.querySelectorAll('.modal__login__input');
				let res = 0;
				let curObj;
				inputsLogin.forEach(input => {
					JSON.parse(localStorage.getItem('users')).forEach(item => {
						if (item.cardNumber == input.value || item.email == input.value) {
							res++
						}
						if (res > 0) {
							if (item.password == input.value) {
								curObj = item;
								res++;
							}
						}
					});
				});

				if (res == 2) {
					curObj.visits += 1;
					localStorage.setItem('currentUser', JSON.stringify(curObj));
					localStorage.setItem('loginUser', true);
					showModalLogin()// прячем
					location.reload()// перезагрузка
				}
			}
		});
		// end Modal Login

		// Клик на Check The Card, если user существует отображаем его данные
		document.getElementById('libraryCard__form').addEventListener('submit', function (e) {
			e.preventDefault();
			let res = 0;
			let curObj;
			// Если имя и номер карты user соответствует
			const inputsLibraryCard = this.querySelectorAll('.libraryCard__form-input');
			inputsLibraryCard.forEach(input => {
				JSON.parse(localStorage.getItem('users')).forEach(item => {
					if (item.name == input.value) {
						res++
					}
					if (res > 0) {
						if (item.cardNumber == input.value) {
							curObj = item;
							res++;
						}
					}
				});
			});
			// показываем его данные в libraryCard (кол-во книг, посещений сайта) на 10 сек
			if (res == 2) {
				const profileCounter = document.querySelectorAll('.visits__counter');
				const profileBooksCounter = document.querySelectorAll('.books__counter');
				document.querySelector('.libraryCard__form-btn').classList.add('noneDisplay');
				document.querySelector('.libraryCard__info__wrapper').classList.remove('noneDisplay');

				profileCounter.forEach(visitsCounter => {
					visitsCounter.innerHTML = curObj.visits;
				});
				profileBooksCounter.forEach(counterBooks => {
					counterBooks.innerHTML = curObj.booksCounter;
				});

				setTimeout(() => {
					document.querySelector('.libraryCard__info__wrapper').classList.add('noneDisplay');
					document.querySelector('.libraryCard__form-btn').classList.remove('noneDisplay');
					inputsLibraryCard.forEach(input => input.value = '');
				}, '10000');
			}
		});
	} // end LOGIN USER
} // end BEFORE LOGIN
beforeLogin()


// USER AFTER LOGIN
function afterLogin() {
	if (localStorage.getItem('loginUser') == 'true') {
		const CURRENT__USER = JSON.parse(localStorage.getItem('currentUser'));

		// Блок с кнопками регистрации и логина в блоке Digital Library Cards (прячем)
		document.querySelector('.libraryCard__login').classList.add('noneDisplay');

		//  ======= Drop Menu User
		// Блок с кнопкой profile в блоке Digital Library Cards
		const libraryCardAfterLogin = document.querySelector('.libraryCard__afterLogin');
		libraryCardAfterLogin.classList.remove('noneDisplay');

		// Клик по иконке залогиненного user
		const headerIconUser = document.querySelector('.header__iconUser');
		const headerDropMenuUser = document.querySelector('.header__dropMenuUser');

		headerIconUser.addEventListener('click', () => {
			headerDropMenuUser.classList.toggle('noneDisplay');
		});

		window.addEventListener('click', function (e) {
			if (!headerIconUser.contains(e.target) && !headerDropMenuUser.contains(e.target)) {
				headerDropMenuUser.classList.add('noneDisplay');
			}
		});

		// Номер cardNumber в drop menu user
		const headerDropMenuUserTitle = document.querySelector('.header__dropMenuUser__title');
		headerDropMenuUserTitle.innerHTML = CURRENT__USER.cardNumber;

		// Записываем в атрибуте title name и surname
		let nameAndSurname = CURRENT__USER.name + " " + CURRENT__USER.surname;
		headerIconUser.setAttribute('title', nameAndSurname);

		// 7.5 Получаем 2 буквы для записи их в иконку user
		function createName() {
			let p = document.createElement('p');
			p.innerHTML = CURRENT__USER.name[0].toUpperCase() + CURRENT__USER.surname[0].toUpperCase();
			return p
		}

		// прячем headerIcon и показываем headerIconUser
		headerIconUser.append(createName());
		headerIcon.classList.add('noneDisplay');
		headerIconUser.classList.remove('noneDisplay');
		// end Drop Menu User

		// =========  library Card
		// заполняем данными usera
		const libraryCardInputName = document.querySelector('.libraryCard__input-name');
		const libraryCardInputCard = document.querySelector('.libraryCard__input-card');
		const libraryFormBtn = document.querySelector('.libraryCard__form-btn');
		const libraryCardInfo = document.querySelector('.libraryCard__info__wrapper');
		libraryCardInputName.value = CURRENT__USER.name;
		libraryCardInputCard.value = CURRENT__USER.cardNumber;
		libraryFormBtn.classList.toggle('noneDisplay');
		libraryCardInfo.classList.toggle('noneDisplay');
		// end library Card

		// ========= Log Out
		const logoutDropMenuUser = document.querySelector('.dropMenuUser__logOut');
		logoutDropMenuUser.addEventListener('click', () => {
			localStorage.setItem('loginUser', false);
			headerIcon.classList.remove('noneDisplay');
			headerIconUser.classList.add('noneDisplay');
			headerDropMenuUser.classList.add('noneDisplay');
			libraryCardAfterLogin.classList.add('noneDisplay');

			// library Card чистим инпуты
			libraryCardInputName.value = '';
			libraryCardInputCard.value = '';
			libraryFormBtn.classList.toggle('noneDisplay');
			libraryCardInfo.classList.toggle('noneDisplay');

			// записываем нашего измененного юзера в local storage users
			let curUser = JSON.parse(localStorage.getItem('currentUser'));
			arrLocalStorage = JSON.parse(localStorage.getItem('users')).filter(item => item.cardNumber !== curUser.cardNumber)
			arrLocalStorage.push(curUser);
			localStorage.setItem('currentUser', JSON.stringify(''));
			localStorage.setItem('users', JSON.stringify(arrLocalStorage));
			location.reload()
		});
		// end Log Out

		// ========= modal Profile
		const profileUser = document.querySelector('.dropMenuUser__profile');
		const dropMenuProfile = document.querySelector('.modal__profile');
		const modalIconProfile = document.querySelector('.modal__profile__icon');
		const profileCounter = document.querySelectorAll('.visits__counter');
		const profileBtn = document.querySelector('.profile__btn');

		// Показать или спрятать модалку, добавить задний фон или убирать, запретить скролл или разрешить
		function showProfileUser() {
			showModal(dropMenuProfile)
		}

		profileUser.addEventListener('click', showProfileUser)
		profileBtn.addEventListener('click', showProfileUser)

		modalIconProfile.addEventListener('click', () => showProfileUser())

		bcgOpacity.addEventListener('click', function (e) {
			if (!dropMenuProfile.contains(e.target) && !dropMenuProfile.classList.contains('noneDisplay')) {
				showProfileUser()
			}
		});

		// Счетчик входов
		profileCounter.forEach(visitsCounter => {
			visitsCounter.innerHTML = CURRENT__USER.visits;
		});

		// Заносим данные внутрь Modal Profile
		const profileIconUser = document.querySelector('.profile__left__icon');
		const profileIconName = document.querySelector('.profile__left__name');
		const profileCardNum = document.querySelector('.profile__cardNumber');
		const clipboardProfile = document.querySelector('.clipboard');

		profileIconUser.append(createName());
		let p = document.createElement('p');
		p.innerHTML = CURRENT__USER.name + " " + CURRENT__USER.surname;
		profileIconName.append(p);
		profileCardNum.append(CURRENT__USER.cardNumber);

		clipboardProfile.addEventListener('click', () => {
			navigator.clipboard.writeText(CURRENT__USER.cardNumber)
		});


		// Добавление выбранной книги в rented books в modal profile
		const favoritesBooks = document.querySelectorAll('.favorites__book__title');
		const favoritesBookBtns = document.querySelectorAll('.favorites__book__btn');
		const rentedBooks = document.querySelector('.profile__rented__books');
		const profileBooksCounter = document.querySelectorAll('.books__counter');

		favoritesBookBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				if (CURRENT__USER.libraryCard) {
					function createLiForRented(currentBook, id) {
						// добавляем книгу в rented book и изменяем счетчик
						let li = document.createElement('li');
						let liText = currentBook.textContent;
						let liTextNew = liText.replace(/by/i, ',');
						li.innerHTML = liTextNew;
						rentedBooks.append(li);

						// cчетчик книг
						CURRENT__USER.booksCounter += 1;
						profileBooksCounter.forEach(counterBooks => {
							counterBooks.innerHTML = CURRENT__USER.booksCounter;
						});

						// записываем название книг в массив localStorage
						let curUserBooks = CURRENT__USER.booksList;
						function BookIntoLocalStorage(text, id) {
							this.bookTitle = text;
							this.idBook = id;
						}
						let book = new BookIntoLocalStorage(liTextNew, id);
						curUserBooks.push(book);
						CURRENT__USER.booksList = curUserBooks;
						localStorage.setItem('currentUser', JSON.stringify(CURRENT__USER));
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
					showModalBuyCard();
				}
			});
		});

		if (CURRENT__USER.booksList.length != 0) {
			profileBooksCounter.forEach(counterBooks => {
				counterBooks.innerHTML = CURRENT__USER.booksCounter;
			});

			CURRENT__USER.booksList.forEach(currentBook => {
				function createRentedLi(nameTitle) {
					let li = document.createElement('li');
					li.innerHTML = nameTitle;
					rentedBooks.append(li);
				}
				createRentedLi(currentBook.bookTitle);

				favoritesBookBtns.forEach(btn => {
					if (currentBook.idBook == btn.id) {
						btn.disabled = true;
						btn.innerHTML = 'Own'
					}
				});
			})
		}
		// end modal profile

		// ========= modal Buy Card
		const modalBuyCard = document.querySelector('.modal__buyCard');
		const modalBuyCardIcon = document.querySelector('.modal__buyCard__icon');

		function showModalBuyCard() {
			showModal(modalBuyCard)
		}

		modalBuyCardIcon.addEventListener('click', () => {
			showModalBuyCard()
		})

		bcgOpacity.addEventListener('click', function (e) {
			if (!modalBuyCard.classList.contains('noneDisplay') && !modalBuyCard.contains(e.target)) {
				showModalBuyCard()
			}
		});

		document.getElementById('modal__buyCard__inputs').addEventListener('submit', function (e) {
			e.preventDefault();
			//Вызываем функцию validation и ей передаем нашу форму через this
			if (validation(this) == true) {
				CURRENT__USER.libraryCard = true;
				localStorage.setItem('currentUser', JSON.stringify(CURRENT__USER));
				showModalBuyCard()
				location.reload()
			}
		});
		// end modal Buy Card
	}
}  // end USER AFTER LOGIN
afterLogin()


// Burger menu
const iconMenu = document.querySelector('.header__burger-icon');
const navList = document.querySelector('.nav__list');
const navMenu = document.querySelector('.nav');

if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		iconMenu.classList.toggle('activeIcon');
		navMenu.classList.toggle('activeMenu');
		bodyHidden.classList.toggle('bodyHidden');
	});
	headerDropMenu.classList.add('noneDisplay');
};

if (navList) {
	navList.addEventListener('click', function (e) {
		iconMenu.classList.remove('activeIcon');
		navMenu.classList.remove('activeMenu');
		bodyHidden.classList.remove('bodyHidden');
	});
};

window.addEventListener('click', function (e) {
	if (!iconMenu.contains(e.target) && !navMenu.contains(e.target)) {
		navMenu.classList.remove('activeMenu');
		iconMenu.classList.remove('activeIcon');
		bodyHidden.classList.remove('bodyHidden');
	}
});
// end burger menu


// ======= Slider About
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

// 3. Получаем 2 стрелки и в зависимости от нажатой делаем смещение вправо или влево
arrowIcons.forEach(icon => {
	icon.addEventListener('click', scrollImg);

	function scrollImg() {
		carousel.scrollLeft += icon.id == 'arrowLeft' ? -firstImgWidth : firstImgWidth;
	}

	//3.1 Защита от дурака во время выполнения скролла
	carousel.addEventListener('scroll', () => {
		icon.removeEventListener('click', scrollImg);
	});

	//3.2 Отключение защиты в конце скролла и вызов функции которая проверяет если скролл минимальный или максимальный делает нашу стрелку disabled и добавляет opacity
	carousel.addEventListener('scrollend', () => {
		icon.addEventListener('click', scrollImg);
		opacityArrow()
	});

	// 3.3 вместе с нажатием на стрелку меняется и стиль наших круглых кнопок
	function opacityArrow() {
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

// ======= Slider Favorites
const radioBtns = document.querySelectorAll('.favorites__btn');
const favBooks = document.querySelectorAll('.favorites__books');
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

			function animFavBlock(allBooks, currentBooks) {
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