// Играет трек или нет
let isPlay = false;

// Номер текущей композиции
let numSong = 0;

// Список музыки
const arrMusic = [
	{
		title: 'Chemicals',
		author: 'Forester',
		imgSrc: 'img/Chemicals Forester.png',
		music: 'songs/Forester - Chemicals.mp3'
	},
	{
		title: 'Say Say Say',
		author: 'Kygo',
		imgSrc: 'img/Kygo Say Say.png',
		music: 'songs/Kygo - Say Say Say (feat. Paul McCartney & Michael Jackson).mp3'
	},
	{
		title: 'Come 2gether',
		author: 'Ooyy',
		imgSrc: 'img/Come 2gether Ooyy.png',
		music: 'songs/Ooyy - Come 2gether.mp3'
	}
];

// Текущая композиция (записываем в html данные)
function currentSong () {
	const imgSong = document.querySelector('.music__img');
	const title = document.querySelector('.music__title');
	const author = document.querySelector('.music__author');
	const music = document.querySelector('source');

	imgSong.src = arrMusic[numSong].imgSrc;
	title.innerHTML = arrMusic[numSong].title;
	author.innerHTML = arrMusic[numSong].author;
	music.src = arrMusic[numSong].music;
}
currentSong()

// Аудио, иконки play/pause, прогресс шкала, время полное и текущее
const audio = document.querySelector('audio');
const progress = document.getElementById('progress');
const iconPlay = document.querySelector('.fa-play');
const iconPause = document.querySelector('.fa-pause');
const musicCurrentTime = document.querySelector('.music__currentTime');
const musicFullTime = document.querySelector('.music__fullTime');

// Клик на ползунок в зависимости от ширины экрана
if (window.innerWidth < 768) {
	progress.onchange = function () {
		isPlay = false;
		playAudio()
		audio.currentTime = progress.value;
	}
} else {
	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickX / width) * duration;
	}
}
progress.addEventListener('click', setProgress)


let intervalFullTime;
// После загрузки медиа
audio.onloadedmetadata = function() {
	progress.max = audio.duration;
	progress.value = audio.currentTime;
	intervalFullTime = musicFullTime.innerHTML = formatTime(audio.duration);
}


// Загрузка следующего трека после окончания предыдущего
audio.addEventListener('ended', () => {
	nextAudio()
	isPlay = false;
	playAudio()
})

// Форматирование текущего и полного времени
function formatTime (time) {
	let min = Math.floor(time / 60);
	if (min < 10) {
		min = `0${min}`;
	}
	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min} : ${sec}`;
}


let intervalProgress;
let intervalCurrent;
// Остановка или запуск трека
function playAudio() {
	if (!isPlay) {
		// возникает ошибка, audio.load ее помогает устранить
		if (audio.currentTime == 0) {
			audio.load()
		}
		audio.play()
		isPlay = true;
		iconPlay.classList.add('noneDisplay');
		iconPause.classList.remove('noneDisplay');
		intervalProgress = setInterval(() => progress.value = audio.currentTime, 500);
		intervalCurrent = setInterval(() => musicCurrentTime.innerHTML = formatTime(audio.currentTime), 500);
	} else {
		isPlay = false;
		iconPlay.classList.remove('noneDisplay');
		iconPause.classList.add('noneDisplay');
		audio.pause();
		clearInterval(intervalProgress);
		clearInterval(intervalCurrent);
	}
}

// Для уменьшение повторений кода
function getInfo() {
	return currentSong(),
	audio.load(),
	isPlay = false,
	clearInterval(intervalProgress),
	clearInterval(intervalCurrent),
	intervalFullTime = setTimeout(() => musicFullTime.innerHTML = formatTime(audio.duration), 100),
	playAudio()
}

// Нажатие предыдущей кнопки
function prevAudio() {
	if (numSong == 0) {
		numSong = arrMusic.length - 1;
		getInfo()
	} else {
		numSong--
		getInfo()
	}
}

// Нажатие следующей кнопки
function nextAudio() {
	if (numSong >= arrMusic.length - 1) {
		numSong = 0;
		getInfo()
	} else {
		numSong++
		getInfo()
	}
}

// получаем наши кнопки
const prevBtn = document.querySelector('.prev__controls');
const centerBtn = document.querySelector('.center__controls');
const nextBtn = document.querySelector('.next__controls');

prevBtn.addEventListener('click', prevAudio);
centerBtn.addEventListener('click', playAudio);
nextBtn.addEventListener('click', nextAudio);










