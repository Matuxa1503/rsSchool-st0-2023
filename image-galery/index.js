// W3k-y2n7eGW3mf_C5MD--AMUIf8qq5PlKlXNIRw0eGk (key unsplash)
// массив при загрузке окна достает элемент и вставляет его в ссылку с рандомным номером
const firstSearchArr = ['house', 'car', 'winter', 'summer', 'autumn', 'spring', 'eat', 'london', 'america', 'airplane', 'office', 'natural', 'evening', 'morning'];
let firstUrl = Math.floor(Math.random() * firstSearchArr.length);
let currentPageNum = Math.floor(Math.random() * 15);
let url = `https://api.unsplash.com/search/photos?query=${firstSearchArr[firstUrl]}&per_page=30&page=${currentPageNum}&orientation=landscape&client_id=QKA6fB0wtyJB7eRutVNY3OXolm-7RhJKZrOod7FeB8M`

// оболочка фотографий
const imagesContent = document.querySelector('.images-content');

// получаем данные от сервера
async function getData() {
	const res = await fetch(url);
	const data = await res.json();
	showData(data);
}
getData()

// отображение фотографий в html файле
function showData(data) {
	const arr = data.results;
	arr.forEach(curImg => {
		const div = document.createElement('div');
		const img = document.createElement('img');
		div.classList.add('wrapper-img-galary');
		img.classList.add('img-galary');
		img.src = curImg.urls.regular;
		div.append(img);
		imagesContent.append(div);
	});
}

// ф-ция обновляет url
function updateUrl (searchText) {
	if (!searchText == '') {
		imagesContent.innerHTML = '';
		let currentPageNum = Math.floor(Math.random() * 15);
		return url = `https://api.unsplash.com/search/photos?query=${searchText}&per_page=30&page=${currentPageNum}&orientation=landscape&client_id=QKA6fB0wtyJB7eRutVNY3OXolm-7RhJKZrOod7FeB8M`;
	}
}

// получаем лупу и инпут с текстом
const inputText = document.querySelector('.input-text');
const magnifyingGlass = document.querySelector('.fa-magnifying-glass');

// клик на лупу или нажатие кнопки enter
magnifyingGlass.addEventListener('click', () => {
	const url = updateUrl(inputText.value)
	getData(url);
});

document.addEventListener( 'keyup', event => {
	if( event.code === 'Enter' ) {
		const url = updateUrl(inputText.value)
		getData(url);
	}
});

// Клик по картинке открывает ее полностью в новой вкладке
imagesContent.addEventListener('click', (e) => {
	const curImg = e.target;
	console.log(curImg.src)
	window.open(curImg.src, "_blank");
});