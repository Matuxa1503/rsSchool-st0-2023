function controllers() {
	document.addEventListener('keydown', (e) => {
		switch (e.key) {
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
		}
	});

	document.addEventListener('keyup', (e) => {
		if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
			player.run = false;
		}
	});
}


function initPlayer() {
	gameZone.innerHTML = `<div class="player" style="left:${player.x}px;top:${player.y}px;">`;
	player.el = document.querySelector('.player');
}

function intervals() {
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
}

function startGame() {
	initPlayer();
	controllers();
	intervals();
}

const gameZone = document.querySelector('.game-zone');
const fps = 1000 / 60;

const player = {
	posPlayerImg: {
		top: 'img/player-top.png',
		right: 'img/player-right.png',
		bottom: 'img/player-bottom.png',
		left: 'img/player-left.png',
	},
	x: 1000,
	y: 100,
	el: false,
	step: 10,
	run: false,
	side: 0,
	width: 78,
}

// interval
const inter = {
	run: false,
}

startGame();
