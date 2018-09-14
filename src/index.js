
document.addEventListener("DOMContentLoaded", getBeers)

const beersURL = 'http://localhost:3000/beers'
const parseJSON = response => response.json()
const listGroup = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')

function getBeers() {
	fetch(beersURL)
		.then(parseJSON)
		.then(putBeersOnPage)
}

function putBeersOnPage(beers) {

	beers.forEach(beer => {
		listGroup.innerHTML += `
			<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
		`
	});

	document.querySelectorAll(".list-group-item").forEach(beeri => {
		beeri.addEventListener('click', getDetails)
	});

}

function getDetails(event) {
	fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
	    .then(parseJSON)
	    .then(showDetails);
}

function showDetails(beer) {

  	beerDetail.innerHTML+= `
  		<h1>${beer.name}</h1>
		<img src="${beer.image_url}">
	<h3>${beer.tagline}</h3>
	<textarea id = ${beer.id}>${beer.description}</textarea>
	<button id="edit-beer" class="btn btn-info">
  	Save
	</button>
	`
	let btn = document.getElementById('edit-beer')
	btn.addEventListener("click", (e) => editBeer(e, beer));
}

function editBeer(e, beer) {

  description = document.getElementById(`${beer.id}`).value;
  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
    	{"description": description}
    	)
  });
}














