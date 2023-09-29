const url = 'https://api.unsplash.com/search/photos?query=house&per_page=30&orientation=landscape&client_id=QKA6fB0wtyJB7eRutVNY3OXolm-7RhJKZrOod7FeB8M'
// W3k-y2n7eGW3mf_C5MD--AMUIf8qq5PlKlXNIRw0eGk secret key

const container = document.querySelector('.container');

async function getData() {
	const res = await fetch(url);
	const data = await res.json();
	showData(data);
}
getData()

function showData(data) {
	const arr = data.results;
	arr.forEach(curImg => {
		const img = document.createElement('img');
		img.classList.add('img-galary');
		img.src = curImg.urls.regular;
		container.append(img);
	});
}
