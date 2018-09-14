document.addEventListener('DOMContentLoaded', function() {

const parseJSON = resp => resp.json()

////////// feature 1
const ulOfBeers = document.getElementById('list-group')

function getAllBeers() {
    return fetch('http://localhost:3000/beers')
    .then(parseJSON)
    .then(displayAllBeers)
    .then(addListEventListener)
}

function displayAllBeers(beers) {
    beers.forEach(beer => {
        ulOfBeers.innerHTML += `
            <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
        `
      })
}

getAllBeers()


////////// feature 2
const beerDetailDiv = document.getElementById('beer-detail')

function getBeerInfo(beer) {
    fetch(`http://localhost:3000/beers/${beer}`)
    .then(parseJSON)
    .then(displayBeerInfo)
    .then(saveBtnListener)
}

function displayBeerInfo(beer) {
    beerDetailDiv.innerHTML = `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea id="beer-description">${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
        Save
        </button>
    `
}

function addListEventListener() {
    const listItem = document.getElementById("list-group")

    listItem.addEventListener('click', function(event) {
        //console.log(event)
        // debugger
        if(event.target.className === "list-group-item"){
            const beerID = event.target.dataset.id
            getBeerInfo(beerID)
        }
    })
}

////////// feature 3

function updateBeerInfo(beer, description) {
 fetch(`http://localhost:3000/beers/${beer}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        description: description
    })
 }).then(parseJSON)
}

function saveBtnListener() {
    const saveButton = document.getElementById('edit-beer')

    saveButton.addEventListener('click', function(event) {
        console.log(event)
        // debugger
        const textArea = document.querySelector("#beer-description")
        if(event.target.dataset.id) {
            updateBeerInfo(event.target.dataset.id, textArea.value)
        }
    })
}
})