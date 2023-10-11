// Создание поля, добавление игрока и hp
function initPlayer() {
	player.x = gameZone.getBoundingClientRect().width / 2 - 40;
	player.y = gameZone.getBoundingClientRect().height - player.height;
	gameZone.innerHTML += `<div class="player" style="left:${player.x}px;top:${player.y}px;">`;
	player.el = document.querySelector('.player');

	switch(player.hp) {
		case 2:
			document.querySelector('.heartThree').src = "img/heart3.png";
			break;
		case 1:
			document.querySelector('.heartTwo').src = "img/heart3.png";
			break;
	}
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
					player.hp -= 1;
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
	}, 5000);
};

// ф-ция рандомного создания числа в диапазоне от min до max
function randomInteger(min, max) {
	let nums = min + Math.random() * (max - min);
	return Math.round(nums);
}

// ф-ции запуска игры и рестарта
function startGame() {
	initPlayer();
	controllers();
	intervals();
};

// После убийства player запускается ф-ция которая заново все добавляет (удаляет всех врагов, пули, плеера)
function nextStart() {
	clearInterval(inter.enemy);
	clearInterval(inter.run);
	clearInterval(inter.bullet);
	clearInterval(inter.addRandomEnemy);

	const enemies = document.querySelectorAll('.enemy')
	enemies.forEach(curPosEnemy => {
		curPosEnemy.parentNode.removeChild(curPosEnemy);
	});

	player.el.parentNode.removeChild(player.el);

	if (player.hp === 0) {
		return gameOver();
	}
	startGame();
}

// Конец Игры
function gameOver() {
	document.querySelector('.heartOne').src = "img/heart3.png";
	document.querySelector('.game__over').classList.remove('noneDisplay');
}


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
	x: 0,
	y: 0,
	el: false,
	step: 10,
	run: false,
	side: 1,
	width: 78,
	height: 77,
	hp: 3,
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
