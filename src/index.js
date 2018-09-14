document.addEventListener('DOMContentLoaded', function() {

const beerUrl = `http://localhost:3000/beers`
const singleBeerUrl =`http://localhost:3000/beers/`
const patchUrl = `http://localhost:3000/beers/`
const beerListDiv = document.getElementsByClassName('col-md-4')
const ulForBeer = document.getElementsByClassName("list-group")
const displayBeerInfoDiv = document.getElementById("beer-detail")

getBeer();
listenForBeer();



function getBeer(){
  fetch(beerUrl)
  .then(response => response.json())
  .then (placeBeer)
}

function placeBeer(results){
  
  results.forEach(function(beer){
    let list = document.createElement("li")
  list.className = "list-group-item"
    list.innerText = beer.name 
    list.dataset.id = beer.id
    ulForBeer[0].append(list)
// debugger    
  })

  // console.log(beer)
}

function listenForBeer(){
  // debugger
  ulForBeer[0].addEventListener("click", giveMeBeer)
}
function giveMeBeer(e){
 let beerId = e.target.dataset.id
  getSingleBeer(beerId)
}
function getSingleBeer(id){
  fetch(singleBeerUrl+id)
  .then(response => response.json())
  .then(showMeBeer)

}
function showMeBeer(e){
  displayBeerInfoDiv.innerHTML = ""
  
    let beerh1 = document.createElement("h1")
    let beerimg = document.createElement("img")
    let beerh3 = document.createElement("h3")
    let beertextarea =document.createElement("textarea")
    let savebutton = document.createElement("button")
    beerh1.innerText= e.name
    beerimg.src = e.image_url
    beerh3.innerText = e.tagline
    beertextarea.innerText = e.description
    savebutton.id="edit-beer"
    savebutton.className="btn-btn-info"
    savebutton.innerText = "Save"
    savebutton.dataset.id = e.id 

    displayBeerInfoDiv.append(beerh1, beerimg, beerh3, beertextarea, savebutton )
    listenForChanges()
}
function listenForChanges(){
 let button = displayBeerInfoDiv.children[4]
 button.addEventListener("click", changes)

}

function changes(e){
  e.preventDefault();
  let description = displayBeerInfoDiv.children[3]
  let id = e.target.dataset.id
  change = description.children[0].innerText
// debugger
  makeChanges( id, change)
}

function makeChanges(where, change){
  console.log(change)
  // debugger
  fetch(patchUrl+where ,{
  method : "PATCH",
  headers : {
    'Accept': 'application/json',
'Content-Type': 'application/json'
  },
  body :  JSON.stringify({
    description: change
  })
})
}
})

