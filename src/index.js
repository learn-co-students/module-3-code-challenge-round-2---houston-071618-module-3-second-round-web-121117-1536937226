fetch('http://localhost:3000/beers')
	.then(resp => resp.json())
  .then(renderBeersList)

function renderBeersList(beers){
const beerList = document.getElementById('list-group')
  for(var beer of beers){
    const beerListTemplate = `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
    beerList.innerHTML += beerListTemplate
  }
  const beerInfoPlace = document.getElementById('beer-detail')

  beerList.addEventListener('click', function(event){
      fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(function showBeerMainDisplay(beer){
          const mainDisplay = document.getElementById('beer-detail')
          const mainDisplayTemplate = `<h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button id="edit-beer" class="btn btn-info">
            Save
          </button>`
          mainDisplay.innerHTML = mainDisplayTemplate

          const saveButton = document.getElementsByTagName('button')[0]
            saveButton.addEventListener('click', function(event){
            event.preventDefault();
            const beerDescription = event.target.parentElement.innerText

            fetch(`http://localhost:3000/beers/${beer.id}`,{
              method: "PATCH",
              body: JSON.stringify({
                description: beerDescription
              }),
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
          })
        })
      })

  })
}
