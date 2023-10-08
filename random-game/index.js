// Создание поля и добавление игрока
function initPlayer() {
	gameZone.innerHTML += `<div class="player" style="left:${player.x}px;top:${player.y}px;">`;
	player.el = document.querySelector('.player');
};

// Отслеживание нажатия кнопки
function controllers() {
	document.addEventListener('keydown', (e) => {
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

	// интервал полета пули
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

	// интервал для движения противника, стороны появления и если в него попасть он умирает
	inter.enemy = setInterval(() => {
		let enemyTank = document.querySelectorAll('.enemy');
		enemyTank.forEach(curPosEnemy => {

			// направление движения противника и движение до края экрана
			let direction = curPosEnemy.getAttribute('direction');
			switch (direction) {
				case 'top':
					if (curPosEnemy.getBoundingClientRect().top >= gameZone.getBoundingClientRect().height) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.top = curPosEnemy.getBoundingClientRect().top - 2 + 'px';
					}
					break;
				case 'right':
					if (curPosEnemy.getBoundingClientRect().right >= gameZone.getBoundingClientRect().width) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.left = curPosEnemy.getBoundingClientRect().left + 2 + 'px';
					}
					break;
				case 'bottom':
					if (curPosEnemy.getBoundingClientRect().bottom >= gameZone.getBoundingClientRect().height) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
					curPosEnemy.style.top = curPosEnemy.getBoundingClientRect().top + 2 + 'px';
					}
					break;
				case 'left':
					if (curPosEnemy.getBoundingClientRect().left >= gameZone.getBoundingClientRect().width) {
						curPosEnemy.parentNode.removeChild(curPosEnemy);
					} else {
						curPosEnemy.style.left = curPosEnemy.getBoundingClientRect().left - 2 + 'px';
					}
					break;
			}

			// попадание в врага
			let bullets = document.querySelectorAll('.shot');
			bullets.forEach (bullet => {
				if (
					bullet.getBoundingClientRect().top < curPosEnemy.getBoundingClientRect().bottom &&
					bullet.getBoundingClientRect().bottom > curPosEnemy.getBoundingClientRect().top &&
					bullet.getBoundingClientRect().right > curPosEnemy.getBoundingClientRect().left &&
					bullet.getBoundingClientRect().left < curPosEnemy.getBoundingClientRect().right
				) {
					curPosEnemy.parentNode.removeChild(curPosEnemy);
					bullet.parentNode.removeChild(bullet);
					counter++;
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
	}, 1000);
};

// ф-ция рандомного создания числа в диапазоне от min до max
function randomInteger(min, max) {
	let nums = min + Math.random() * (max - min);
	return Math.round(nums);
}

// ф-ция запуска игры
function startGame() {
	initPlayer();
	controllers();
	intervals();
};

const gameZone = document.querySelector('.game-zone');
const fps = 1000 / 60;
let counter = 0;

const player = {
	posPlayerImg: {
		top: 'img/player-top.png',
		right: 'img/player-right.png',
		bottom: 'img/player-bottom.png',
		left: 'img/player-left.png',
	},
	shot: 'img/bullet.png',
	x: 1100,
	y: 500,
	el: false,
	step: 10,
	run: false,
	side: 1,
	width: 78,
	height: 77,
};

const bulletFly = {
	speed: 10,
};

// interval
const inter = {
	run: false,
	bullet: false,
	enemy: false,
	addRandomEnemy: false,
};

startGame();
