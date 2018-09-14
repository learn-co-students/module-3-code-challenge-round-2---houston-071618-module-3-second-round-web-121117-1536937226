const URL = `http://localhost:3000/beers`

document.addEventListener("DOMContentLoaded", getBeers)
const beerList = document.querySelector(".list-group")
const beerDetail = document.querySelector("#beer-detail")

function getBeers(){
    fetch(URL)
      .then(res=>res.json())
      .then(displayBeers)
}

function displayBeers(beers) {
    beers.forEach(beer => {
        beerList.innerHTML +=  `<li id= "${beer.id}" class="list-group-item">${beer.name}</li>`
    });
    let allBeers = document.querySelectorAll('.list-group-item')
    allBeers.forEach(allBeer => {
       allBeer.addEventListener('click', getBeer)
    })
}

function getBeer(event) {
    fetch(`${URL}/${event.target.id}`)
      .then(res=> res.json())
      .then(showBeerDetails)
}

function showBeerDetails(beer) {
    beerDetail.innerHTML = `<h1>${beer.name}</h1>
                            <img src="${beer.image_url}">
                            <h3>${beer.tagline}</h3>
                            <textarea id= 'description-${beer.id}'>${beer.description}</textarea>
                            <button id="edit-beer" class="btn btn-info">
                            Save
                            </button>`
    let editBeer = document.getElementById("edit-beer")
    editBeer.addEventListener("click", event => updateBeer(beer, event));
}

function updateBeer(beer, event) {
    event.preventDefault();
    let descrip = document.getElementById(`description-${beer.id}`)
    beer.description = descrip.value;
    fetch(`${URL}/${beer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({
            description: beer.description
        })
         });
        //  descrip.value = ''
}
