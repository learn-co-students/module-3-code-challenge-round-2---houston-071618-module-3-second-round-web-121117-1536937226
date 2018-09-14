const URL = 'http://localhost:3000/beers/';

let beerList = document.getElementById('list-group');
let beerDetail = document.getElementById('beer-detail');

document.addEventListener('DOMContentLoaded', doThese);

function doThese(e) {
  getBeers();
}

function getBeers() {
  fetch(URL)
    .then((res) => res.json())
    .then((beers) => showBeers(beers));
}

function showBeers(beers) {
  beers.forEach((beer) => {
    let beerObject = document.createElement('li');
    beerObject.innerHTML = `
      <li class="list-group-item" id="beer-${beer.id}">${beer.name}</li>
    `;
    beerObject.addEventListener('click', (e) => showBeer(e, beer));
    beerList.append(beerObject);
  });
}

function showBeer(e, beer) {
  beerDetail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="beer-${beer.id}-desc">${beer.description}</textarea>
    `;

  let beerEditButton = document.createElement('button');
  beerEditButton.innerHTML = `
      <button id="edit-beer-${beer.id}" class="btn btn-info">Save</button>
    `;

  beerDetail.append(beerEditButton);
  beerEditButton.addEventListener('click', (e) => editBeer(e, beer));

  // beerName = document.createElement('h1')
  // beerPic = document.createElement('img')
  // beerTagline = document.createElement('h3')
  // beerDesc = document.createElement('p')
}

function editBeer(e, beer) {
  console.log(beer);
  let descInput = document.getElementById(`beer-${beer.id}-desc`).value;

  beer.description = descInput;

  fetch(URL + beer.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  });
}
