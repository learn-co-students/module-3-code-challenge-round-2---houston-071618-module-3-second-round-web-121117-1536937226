document.addEventListener('DOMContentLoaded', handleContentLoad)

function handleContentLoad(){
  fetchBeers()
}

function fetchBeers(){
  fetch ('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beers => renderBeers(beers))
}

function renderBeers(beers){
  beers.forEach(renderSingleBeer)
}

function renderSingleBeer(beer){
  let beerList = document.querySelector('#list-group')
  let listItem = document.createElement('li')
  let beerListItem = beerList.appendChild(listItem)
  const beerTitle = beer.name

  beerListItem.innerHTML = beerTitle

  listItem.addEventListener('click', handleEventListener)

  function handleEventListener(e){
    console.log("click")
    renderBeerDetail(e)
  }

  function renderBeerDetail(e){
    let detailDataContainer = document.querySelector('#beer-detail')
    detailDataContainer.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="${beer.id}" class="btn btn-info">
      Save
    </button>`




  function handleDataUpdate(e){
    e.preventDefault(e)
    beerDescriptionUpdate(e)
  }

  function beerDescriptionUpdate(e){
  let descriptionInput = e.target.parentElement.children[3].value

    fetch (`http://localhost:3000/beers/${beer.id}`, {
          method: "PATCH",
          headers: {
            'Accepts': 'application/json',
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            description: descriptionInput
            })
          }).then(resp => resp.json())
        }

  let saveBtn = document.getElementById(`${beer.id}`)
  saveBtn.addEventListener('click', handleDataUpdate)

  }




}
