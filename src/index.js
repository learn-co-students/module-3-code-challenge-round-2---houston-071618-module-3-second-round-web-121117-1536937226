console.log("DOM loaded");

const beersURL = "http://localhost:3000/beers";
const beersList = document.getElementById("list-group");
const beerDetail = document.getElementById("beer-detail");

fetch(beersURL)
	.then(resp => resp.json())
	.then(showAllBeers)

function showAllBeers(beers) {
	beers.forEach(showOneBeer);
}

function showOneBeer(beer) {
	beersList.innerHTML += `
		<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
	`
}

// Select specific beer details
beersList.addEventListener("click", handleClick);

function handleClick(event) {
	event.preventDefault();
	let selectedBeer = event.target.dataset.id;

	fetch(beersURL + `/${selectedBeer}`)
		.then(resp => resp.json())
		.then(showBeerDetail)
}

function showBeerDetail(beer) {
	beerDetail.innerHTML = `
		<h1>${beer.name}</h1>
		<img src="${beer.image_url}">
		<h3>${beer.tagline}</h3>
		<textarea>${beer.description}</textarea>
		<button id="edit-beer" data-id=${beer.id} class="btn btn-info">Save</button>
	`
}

// const editBeerBtn = document.getElementById("edit-beer");

beerDetail.addEventListener("click", handleClickEvent)

function handleClickEvent() {
	if (event.target.id == "edit-beer") {
		handleEdit();
	}
}

// editBeerBtn.addEventListener("click", handleEdit)

function handleEdit() {
	let selectedBeer = event.target.dataset.id;
	// debugger
	let newDescription = document.getElementsByTagName("textarea")[0].value;
	// debugger
	fetch(beersURL + `/${selectedBeer}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"description": newDescription
		})
	})
	.then(resp => resp.json())
	// .then(showOneBeer)

}

//Thank you Humzah for all of your help this week, and
// Josh for spell-checking me on 'applicaion' :D 

