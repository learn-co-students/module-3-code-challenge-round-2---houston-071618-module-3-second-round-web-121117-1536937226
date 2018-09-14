const beerURL = 'http://localhost:3000/beers'

const parseJSON = response => response.json();

fetch(beerURL)
    .then(parseJSON)
    .then(putBeerOnPage)

//when user clicks on beer LI, do a fetch request, then render the detail
function putOneBeerOnPage(beer) {

    var listItem = document.createElement('LI');
    listItem.id = `${beer.id}`


    listItem.className = 'list-group-item';
    const listGroupUl = document.querySelector('.list-group')
    const appendedList = listGroupUl.appendChild(listItem)
    listItem.innerHTML += `
        ${beer.name}
    `
    let itemClick = document.getElementById(`${beer.id}`)
    itemClick.addEventListener('click', function (e) {
        const id = `${beer.id}`
        fetch(beerURL + "/" + id)
            .then(res => res.json())
            .then(handleBeerNameClick)
    })
}

function putBeerOnPage(beers) {
    beers.forEach(function (beer) {
        putOneBeerOnPage(beer);
    })
}

function handleBeerNameClick(beer) {

    const beerDetail = document.getElementById('beer-detail')
    beerDetail.innerHTML += `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id=${beer.id} class="btn btn-info">
            Save
            </button>
        `
}

//attempt at fetch "PATCH":

// function editBeer() {
//     let saveBtn = document.querySelector('.btn')
//     saveBtn.addEventListener('click', function () {

//     })

//     const id = `${beer.id}`
//     fetch(beerURL + "/" + id, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then(response => response.json());
// }


