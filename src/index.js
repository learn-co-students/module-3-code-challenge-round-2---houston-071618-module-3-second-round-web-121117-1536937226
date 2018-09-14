getAllBeers()
function getAllBeers(){
  return fetch(`http://localhost:3000/beers`)
  .then(resp=>resp.json())
  .then(resp => {listBeersOnPage(resp)})
}

function listBeersOnPage(allBeers) {
  allBeers.forEach(function(oneBeer){
    const listBeersGroup = document.getElementById("list-group")
    listBeersGroup.innerHTML += `
    <li class="list-group-item" data-id="${oneBeer.id}">${oneBeer.name}</li>`
  })
}
// document.addEventListener('DOMContentLoaded', function(event){
// })//end DOMContentLoaded

  const beerListGroup = document.getElementById('list-group')
  beerListGroup.addEventListener('click', function(event){
    let beerId = event.target.dataset.id
    // console.log(beerId)
     return fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp=> resp.json())
      .then(function (beerInfo){
        // console.log(beerInfo)
      const beerDetail = document.getElementById('beer-detail')
      beerDetail.innerHTML =`
        <h1>${beerInfo.name}</h1>
        <img src="${beerInfo.image_url}">
        <h3>${beerInfo.tagline}</h3>
        <textarea>${beerInfo.description}</textarea>
        <button data-id= "${beerInfo.id}" id="edit-beer" class="btn btn-info">
          Save
        </button>
    `
    })
  })
const beerDetailDiv = document.getElementById('beer-detail')
beerDetailDiv.addEventListener('click', function (event){
  // console.log(event.target)
  let beerId = event.target.dataset.id
  if(event.target.id === 'edit-beer'){
    let editText = event.target.parentElement.children[3].value
    fetch(`http://localhost:3000/beers/${beerId}`,{
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description: editText
      })
    })
    .then(resp=>resp.json())
    .then(getAllBeers)
  }
})
