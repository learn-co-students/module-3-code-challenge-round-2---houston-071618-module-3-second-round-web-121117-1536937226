const listGroupUL = document.querySelector('#list-group')
const beerDetailDiv = document.querySelector('#beer-detail')

document.addEventListener("DOMContentLoaded", function(event) {
  fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    // .then(console.log)
    .then(putBeersOnPage)
  });

  function putBeersOnPage(beers) {
    beers.forEach(function(beer) {
      // console.log(beer.name)
      listGroupUL.innerHTML += `
        <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
      `
      listGroupUL.addEventListener('click', function(event) {
        // event.preventDefault()
        if (event.target.dataset.id === `${beer.id}`) {
          putBeerDetails(beer);
        }

      })

    })
  }

  function putBeerDetails(beer) {
    // beers.forEach(function(beer) {
      beerDetailDiv.innerHTML = `
      <h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
      Save
      </button>
      `
    // })
  }

  beerDetailDiv.addEventListener('click', function(event) {
    if (event.target.className === 'btn btn-info') {
//find the text area value
//make fetch
  let description = event.target.parentElement.children[3].value
  const beerId = parseInt(event.target.dataset.id)
  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "description": description
    })

    })

    }
  })


  // listGroupUL.addEventListener('click', function(event) {
  //   // event.preventDefault()
  //   console.log(event)
  //   if (event.target.dataset.id === `${beer.id}`) {
  //     putBeerDetails();
  //   }
  //
  // })
