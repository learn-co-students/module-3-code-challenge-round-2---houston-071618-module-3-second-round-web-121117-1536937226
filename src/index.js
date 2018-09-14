const beersUrl = "http://localhost:3000/beers"

function fetchBeers() {
  fetch(beersUrl) 
    .then(res => res.json())
    .then(renderBeers)
    .then(addListEvent)
}

fetchBeers()

function renderBeers(beers) {
  beers.forEach(renderSingleBeer)
}

function renderSingleBeer(beer) {
  let beerList = document.getElementById('list-group')
  beerList.innerHTML += `
      <li id="${beer.id}" class="list-group-item">${beer.name}</li>
    `
  
  let beerItem = document.getElementById(`${beer.id}`)
  beerItem.id = `${beer.id}`
}

function addListEvent(){
  let List = document.getElementById("list-group")
  List.addEventListener('click', handleLiClick)
}

function handleLiClick(e) {
  let beerID = e.target.id

  fetch(`http://localhost:3000/beers/${e.target.id}`)
    .then(res => res.json())
    .then(displayItem)
    //.then(editBeer)
}

function displayItem(beer){
  let beerInfo = document.getElementById("beer-detail");
  beerInfo.innerHTML = `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">Save</button>
  `
  let saveBtn = document.getElementById(`edit-beer`)
  saveBtn.addEventListener('click', e => {
    let beerDesc = document.getElementById(`${beer.description}`);
    beer.description = beerDesc.value
    fetch(`http://localhost:3000/beers/:id/${beer.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        "description": beerDesc.value
    });
  })
}

// function editBeer(beer){
//   console.log(beer)
//  }


//need to edit what pops up
//save the edit with fetch

//add addEventListener, call it in fetch and do it all in the new func
