// Создание поля, добавление игрока и hp
function initPlayer() {
	player.x = gameZone.getBoundingClientRect().width / 2 - 40;
	player.y = gameZone.getBoundingClientRect().height - player.height;
	gameZone.innerHTML += `<div class="player" style="left:${player.x}px;top:${player.y}px;">`;
	player.el = document.querySelector('.player');
};

// Отслеживание нажатия кнопки
function controllers() {
	document.addEventListener('keydown', (e) => {
		if (player.hp !== 0) {
			switch (e.code) {
				case 'ArrowUp':
					player.el.style.backgroundImage = `url(${player.posPlayerImg.top})`;
					player.run = true;
					player.side = 1;
					break;
				case 'ArrowRight':
					player.el.style.backgroundImage = `url(${player.posPlayerImg.right})`;
					player.run = true;
					player.side = 2;
					break;
				case 'ArrowDown':
					player.el.style.backgroundImage = `url(${player.posPlayerImg.bottom})`;
					player.run = true;
					player.side = 3;
					break;
				case 'ArrowLeft':
					player.el.style.backgroundImage = `url(${player.posPlayerImg.left})`;
					player.run = true;
					player.side = 4;
					break;
				case 'Space':
					addedBullet();
					break;
			}
		}
	});

// Отслеживание отжатия кнопки
	document.addEventListener('keyup', (e) => {
		if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.code)) {
			player.run = false;
		}
	});
};

// Добавление пули в зависимости от направления танка
function addedBullet() {
	switch (player.side) {
		case 1:
			gameZone.innerHTML += `<div class="shot" direction="top" style="left:${player.x + (player.width / 2) - 7}px;top:${player.y - 15}px;"></div>`
			break;
		case 2:
			gameZone.innerHTML += `<div class="shot" direction="right" style="left:${player.x + (player.width / 2) + 40}px;top:${player.y + 30}px;"></div>`
			break;
		case 3:
			gameZone.innerHTML += `<div class="shot" direction="bottom" style="left:${player.x + (player.width / 2) - 7}px;top:${player.y + 75}px;"></div>`
			break;
		case 4:
			gameZone.innerHTML += `<div class="shot" direction="left" style="left:${player.x + (player.width / 2) - 45}px;top:${player.y + 30}px;"></div>`
			break;
	}
	// заново обращаемся к player т.к танк перестает двигаться
	player.el = document.querySelector('.player');
};

// интервалы
function intervals() {
	// интервал движения игрока
	inter.run = setInterval(() => {
		if (player.run) {
			switch (player.side) {
				// top
				case 1:
					if (player.y >= 10) {
						player.y -= player.step;
						player.el.style.top = `${player.y}px`;
					}
					break;
				// right
				case 2:
					if (player.x < gameZone.getBoundingClientRect().right - player.width - 10) {
						player.x += player.step;
						player.el.style.left = `${player.x}px`;
					}
					break;
				// bottom
				case 3:
					if(player.y < gameZone.getBoundingClientRect().bottom - player.width - 10) {
						player.y += player.step;
						player.el.style.top = `${player.y}px`;
					}
					break;
				// left
				case 4:
					if (player.x >= 10) {
						player.x -= player.step;
						player.el.style.left = `${player.x}px`;
					}
					break;
			}
		}
	}, fps);

	// интервал полета пули игрока
	inter.bullet = setInterval(() => {
		let bullets = document.querySelectorAll('.shot');
		bullets.forEach (bullet => {
			let flightDirectionAttrib = bullet.getAttribute('direction');

			switch(flightDirectionAttrib) {
				case 'top':
				if (bullet.getBoundingClientRect().top < 0) {
					bullet.parentNode.removeChild(bullet);
				} else {
					bullet.style.top = bullet.getBoundingClientRect().top - bulletFly.speed + 'px'
				}
					break;
				case 'right':
					if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.left = bullet.getBoundingClientRect().left + bulletFly.speed + 'px'
					}
					break;
				case 'bottom':
					if (bullet.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.top = bullet.getBoundingClientRect().top + bulletFly.speed + 'px'
					}
					break;
				case 'left':
					if (bullet.getBoundingClientRect().left < 0) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.left = bullet.getBoundingClientRect().left - bulletFly.speed + 'px'
					}
					break;
			}
		})
	}, fps);
	
	// интервал полета пули противника
	inter.bulletEnemy = setInterval(() => {
		let bullets = document.querySelectorAll('.shotEnemy');
		bullets.forEach (bullet => {
			let flightDirectionAttrib = bullet.getAttribute('direction');

			switch(flightDirectionAttrib) {
				case 'top':
				if (bullet.getBoundingClientRect().top < 0) {
					bullet.parentNode.removeChild(bullet);
				} else {
					bullet.style.top = bullet.getBoundingClientRect().top - bulletFly.speed + 'px'
				}
					break;
				case 'right':
					if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.left = bullet.getBoundingClientRect().left + bulletFly.speed + 'px'
					}
					break;
				case 'bottom':
					if (bullet.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.top = bullet.getBoundingClientRect().top + bulletFly.speed + 'px'
					}
					break;
				case 'left':
					if (bullet.getBoundingClientRect().left < 0) {
						bullet.parentNode.removeChild(bullet);
					} else {
						bullet.style.left = bullet.getBoundingClientRect().left - bulletFly.speed + 'px'
					}
					break;
			}
		})
	}, fps);

	// интервал для движения противника, стороны появления и если в него попасть он умирает
	inter.enemy = setInterval(() => {
		let enemyTank = document.querySelectorAll('.enemy');
		enemyTank.forEach(curPosEnemy => {
			// направление движения противника и движение до края экрана
			let direction = curPosEnemy.getAttribute('direction');
			
			// координаты противника
			const enemyPosTop = curPosEnemy.getBoundingClientRect().top,
			enemyPosRight = curPosEnemy.getBoundingClientRect().right,
			enemyPosBottom = curPosEnemy.getBoundingClientRect().bottom,
			enemyPosLeft = curPosEnemy.getBoundingClientRect().left;
			
			switch (direction) {
				case 'top':
					if (enemyPosTop >= gameZone.getBoundingClientRect().height) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.top = enemyPosTop - 2 + 'px';
					}
					break;
				case 'right':
					if (enemyPosRight >= gameZone.getBoundingClientRect().width) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.left = enemyPosLeft + 2 + 'px';
					}
					break;
				case 'bottom':
					if (enemyPosBottom >= gameZone.getBoundingClientRect().height) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
					curPosEnemy.style.top = enemyPosTop + 2 + 'px';
					}
					break;
				case 'left':
					if (enemyPosLeft >= gameZone.getBoundingClientRect().width) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.left = enemyPosLeft - 2 + 'px';
					}
					break;
			}

			// координаты игрока
			const playerPosTop = player.el.getBoundingClientRect().top,
			playerPosRight = player.el.getBoundingClientRect().right,
			playerPosBottom = player.el.getBoundingClientRect().bottom,
			playerPosLeft = player.el.getBoundingClientRect().left;

			// столкновение игрока с противником
			if (
				playerPosTop < enemyPosBottom &&
				playerPosBottom > enemyPosTop &&
				playerPosRight > enemyPosLeft &&
				playerPosLeft < enemyPosRight
				) {
					nextStart();
				};

			// попадание в врага
			let bullets = document.querySelectorAll('.shot');
			bullets.forEach (bullet => {
				if (
					bullet.getBoundingClientRect().top < enemyPosBottom &&
					bullet.getBoundingClientRect().bottom > enemyPosTop &&
					bullet.getBoundingClientRect().right > enemyPosLeft &&
					bullet.getBoundingClientRect().left < enemyPosRight
				) {
					bullet.parentNode.removeChild(bullet);
					curPosEnemy.parentNode.removeChild(curPosEnemy);
					counter += 1;
					document.querySelector('.counter').textContent = counter;
				}
			});
		});
	}, fps);

	// добавление врагов рандомно
	inter.addRandomEnemy = setInterval(() => {
		let direction = randomInteger(1, 4);
		switch(direction) {
			case 1:
				gameZone.innerHTML += `<div class="enemy" style="transform: rotate(-90deg); top: ${gameZone.getBoundingClientRect().height - player.height}px;left: ${randomInteger(0, gameZone.getBoundingClientRect().width - player.width)}px;" direction="top"</div>`;
			break;
			case 2:
				gameZone.innerHTML += `<div class="enemy" style="top: ${randomInteger(0, gameZone.getBoundingClientRect().height - player.height)}px;left: 0px;" direction="right"</div>`;
				break;
			case 3:
				gameZone.innerHTML += `<div class="enemy" style="transform: rotate(90deg); top: 0px;left: ${randomInteger(0, gameZone.getBoundingClientRect().width - player.width)}px;" direction="bottom"</div>`;
				break;
			case 4:
				gameZone.innerHTML += `<div class="enemy" style="transform: rotate(-180deg); top: ${randomInteger(0, gameZone.getBoundingClientRect().height - player.height)}px;left: ${gameZone.getBoundingClientRect().width - player.width}px;" direction="left"</div>`;
				break;
		}
		// заново обращаемся к player т.к танк перестает двигаться
		player.el = document.querySelector('.player');
	}, timeAddEnemy);

	// выстрел врага
	inter.enemyShot = setInterval(() => {
		let enemyTank = document.querySelectorAll('.enemy');
		enemyTank.forEach(curPosEnemy => {

			// направление движения противника и движение до края экрана
			let direction = curPosEnemy.getAttribute('direction');
			
			// координаты противника
			const enemyPosTop = curPosEnemy.getBoundingClientRect().top,
			enemyPosRight = curPosEnemy.getBoundingClientRect().right,
			enemyPosBottom = curPosEnemy.getBoundingClientRect().bottom,
			enemyPosLeft = curPosEnemy.getBoundingClientRect().left;

			// координаты игрока
			const playerPosTop = player.el.getBoundingClientRect().top,
			playerPosRight = player.el.getBoundingClientRect().right,
			playerPosBottom = player.el.getBoundingClientRect().bottom,
			playerPosLeft = player.el.getBoundingClientRect().left;

			// Направление полета пули
			switch (direction) {
				case 'top':
					if (playerPosBottom < enemyPosTop && playerPosRight > enemyPosLeft && playerPosRight < enemyPosRight + player.width) {
						gameZone.innerHTML += `<div class="shotEnemy" direction="top" style="left:${curPosEnemy.getBoundingClientRect().left + curPosEnemy.getBoundingClientRect().width / 2 - 8}px;top:${curPosEnemy.getBoundingClientRect().top}px;"></div>`
						player.el = document.querySelector('.player');
					}
					break;
				case 'right':
					if (playerPosTop > enemyPosTop - player.width && playerPosTop < enemyPosBottom && playerPosLeft > enemyPosRight) {
						gameZone.innerHTML += `<div class="shotEnemy" direction="right" style="left:${curPosEnemy.getBoundingClientRect().left + curPosEnemy.getBoundingClientRect().width}px;top:${curPosEnemy.getBoundingClientRect().top + 30}px;"></div>`
						player.el = document.querySelector('.player');
						}
					break;
				case 'bottom':
					if (playerPosTop > enemyPosBottom && playerPosRight > enemyPosLeft && playerPosRight < enemyPosRight + player.width) {
						gameZone.innerHTML += `<div class="shotEnemy" direction="bottom" style="left:${curPosEnemy.getBoundingClientRect().left + curPosEnemy.getBoundingClientRect().width / 2 - 8}px;top:${curPosEnemy.getBoundingClientRect().top + player.height}px;"></div>`
						player.el = document.querySelector('.player');
					}
					break;
				case 'left':
					if (playerPosTop > enemyPosTop - player.width && playerPosTop < enemyPosBottom && playerPosRight < enemyPosLeft) {
						gameZone.innerHTML += `<div class="shotEnemy" direction="left" style="left:${curPosEnemy.getBoundingClientRect().left}px;top:${curPosEnemy.getBoundingClientRect().top + 30}px;"></div>`
						player.el = document.querySelector('.player');
					}
					break;
			};
		});
	}, timeFlyBulletEnemy);

	// попадание в игрока
	inter.hittingPlayer = setInterval(() => {
		let bullets = document.querySelectorAll('.shotEnemy');
		// координаты игрока
		const playerPosTop = player.el.getBoundingClientRect().top,
		playerPosRight = player.el.getBoundingClientRect().right,
		playerPosBottom = player.el.getBoundingClientRect().bottom,
		playerPosLeft = player.el.getBoundingClientRect().left;
		bullets.forEach (bullet => {
			if (
				bullet.getBoundingClientRect().top < playerPosBottom &&
				bullet.getBoundingClientRect().bottom > playerPosTop &&
				bullet.getBoundingClientRect().right > playerPosLeft &&
				bullet.getBoundingClientRect().left < playerPosRight
			) {
				bullet.parentNode.removeChild(bullet);
				nextStart();
			} 
		});
	}, fps);
};

// ф-ция рандомного создания числа в диапазоне от min до max
function randomInteger(min, max) {
	let nums = min + Math.random() * (max - min);
	return Math.round(nums);
}

// Начальное меню
function startMenu() {
	// Выбор уровня сложности
	ulLevels.addEventListener('click', (e) => {
		document.querySelectorAll('.levels__item').forEach(item => item.classList.remove('activeLevel'));
		switch (e.target.type) {
			case 'easy':
				e.target.classList.add('activeLevel');
				timeAddEnemy = 2000;
				timeFlyBulletEnemy = 1500;
				player.difficultLevel = 'easy';
				break;
			case 'medium':
				e.target.classList.add('activeLevel');
				timeAddEnemy = 1000;
				timeFlyBulletEnemy = 1000;
				player.difficultLevel = 'medium';
				break;
			case 'hard':
				e.target.classList.add('activeLevel');
				timeAddEnemy = 500;
				timeFlyBulletEnemy = 500;
				player.difficultLevel = 'hard';
				break;
		};
	});

	// Нажатие на кнопку старт
	document.querySelector('.game__form').addEventListener('submit', (e) => {
		e.preventDefault();
		namePlayer.textContent += inputName.value;
		inputName.value = '';
		gameStartMenu.classList.add('noneDisplay');
		gameStatus.classList.remove('noneDisplay');
		gameHeartPlayer.classList.remove('noneDisplay');
		footer.classList.add('noneDisplay');
		startGame();
	});
};

// ф-ции запуска игры и рестарта
function startGame() {
	initPlayer();
	controllers();
	intervals();
};

// После убийства player запускается ф-ция которая заново все добавляет (удаляет всех врагов, все пули, игрока)
function nextStart() {
	clearInterval(inter.run);
	clearInterval(inter.bullet);
	clearInterval(inter.bulletEnemy);
	clearInterval(inter.enemy);
	clearInterval(inter.addRandomEnemy);
	clearInterval(inter.enemyShot);
	clearInterval(inter.hittingPlayer);

	const enemies = document.querySelectorAll('.enemy');
	enemies.forEach(curPosEnemy => {
		curPosEnemy.parentNode.removeChild(curPosEnemy);
	});

	const bulets = document.querySelectorAll('.shot');
	bulets.forEach(bulet => {
		bulet.parentNode.removeChild(bulet);
	});

	const buletsEnemy = document.querySelectorAll('.shotEnemy');
	buletsEnemy.forEach(bulet => {
		bulet.parentNode.removeChild(bulet);
	});

	player.el.parentNode.removeChild(player.el);
	player.hp -= 1;

	switch(player.hp) {
		case 2:
			document.querySelector('.heartThree').src = "img/heart3.png";
			break;
		case 1:
			document.querySelector('.heartTwo').src = "img/heart3.png";
			break;
	}
	if (player.hp === 0) {
		document.querySelector('.heartOne').src = "img/heart3.png";
		return gameOver();
	}
	startGame();
}

	// Хранение данных в local storage и вывод их в таблице
function infoLocalStorage() {
	if (localStorage.getItem('users')) {
		arrPlayers.push(...JSON.parse(localStorage.getItem('users')));
		curNumGame = JSON.parse(localStorage.getItem('number')) + 1;
	}

	function User(num, name, difficult, counter) {
		this.num = num,
			this.name = name,
			this.difficult = difficult,
			this.counter = counter;
	}

	// отображение в таблице последних 10 игр
	if (arrPlayers.length < 10) {
		arrPlayers.push(new User(curNumGame, namePlayer.textContent.slice(11), player.difficultLevel, counter));
		localStorage.setItem('users', JSON.stringify(arrPlayers));
		localStorage.setItem('number', JSON.stringify(curNumGame));
	} else {
		arrPlayers.shift();
		arrPlayers.push(new User(curNumGame, namePlayer.textContent.slice(11), player.difficultLevel, counter))
		localStorage.setItem('users', JSON.stringify(arrPlayers));
		localStorage.setItem('number', JSON.stringify(curNumGame));
	}

	// Таблица результатов
	const tableCounter = document.querySelector('.tableCounter > tbody');
	const players = [...JSON.parse(localStorage.getItem('users'))];
	players.reverse().forEach(item => {
		let tr = document.createElement('tr');
		tr.innerHTML = `<td>${item.num}</td><td>${item.name}</td><td>${item.difficult}</td><td>${item.counter}</td>`;
		tableCounter.append(tr);
	})
}

// Конец Игры
function gameOver() {
	clearInterval(inter.run);
	clearInterval(inter.bullet);
	clearInterval(inter.bulletEnemy);
	clearInterval(inter.enemy);
	clearInterval(inter.addRandomEnemy);
	clearInterval(inter.enemyShot);
	clearInterval(inter.hittingPlayer);
	
	const bulets = document.querySelectorAll('.shot');
	bulets.forEach(bulet => {
		bulet.parentNode.removeChild(bulet);
	});

	const gameOver = document.querySelector('.game__over'),
	finishCounter = document.querySelector('.finishCounter');
	
	gameStatus.classList.add('noneDisplay');
	gameHeartPlayer.classList.add('noneDisplay');
	gameOver.classList.remove('noneDisplay');
	finishCounter.textContent += counter;

	infoLocalStorage()

	// клик на кнопку после надписи game over
	document.querySelector('.game__over-btn').addEventListener('click', () => {
		gameOver.classList.add('noneDisplay');
		gameStartMenu.classList.remove('noneDisplay');
		footer.classList.remove('noneDisplay');
		location.reload();
	});
}


const gameZone = document.querySelector('.game-zone'),
namePlayer = document.querySelector('.game__name'),
ulLevels = document.querySelector('.game__levels'),
inputName = document.querySelector('.input-name'),
gameStartMenu = document.querySelector('.game__start'),
gameStatus = document.querySelector('.game__status'),
gameHeartPlayer = document.querySelector('.game__heart'),
footer = document.querySelector('footer');

const fps = 1000 / 60;

// время добавления танка
let timeAddEnemy = 2000;

// скорость пули
let timeFlyBulletEnemy = 1500;

// количество очков
let counter = 0;

// массив игроков и номер текущей игры (таблица)
const arrPlayers = [];
let curNumGame = 1;

// игрок
const player = {
	posPlayerImg: {
		top: 'img/player-top.png',
		right: 'img/player-right.png',
		bottom: 'img/player-bottom.png',
		left: 'img/player-left.png',
	},
	shot: 'img/bullet.png',
	x: 0,
	y: 0,
	el: false,
	step: 10,
	run: false,
	side: 1,
	width: 78,
	height: 77,
	hp: 3,
	difficultLevel: 'easy',
};

const bulletFly = {
	speed: 10,
};

// interval
const inter = {
	run: false,
	bullet: false,
	bulletEnemy: false,
	enemy: false,
	addRandomEnemy: false,
	enemyShot: false,
	hittingPlayer: false,
};

startMenu();





