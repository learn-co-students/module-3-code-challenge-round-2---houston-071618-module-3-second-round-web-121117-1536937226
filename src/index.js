/*
-- As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.

-- As a user, when I click a beer name, the application should reveal more information about that particular beer.

-- As a user, when looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database
*/


document.addEventListener("DOMContentLoaded", function(){
  fetchMyBeers()
})
const beerContainer = document.getElementById('list-group')
const descContainer = document.getElementById('beer-detail')
let beerArray = []

function fetchMyBeers(){
  fetch('http://localhost:3000/beers')
  .then(res => res.json())
  .then(processMyBeers)
}//fetch my beers

function processMyBeers(beerCollection){
  beerContainer.innerHTML = '' //clear form
  for(let beer of beerCollection){
    const beerID = beer.id
    const beerName = beer.name
    const beerDesc = beer.description

    beerArray.push({beerID,beerName,beerDesc})

    const myTemplate = makeMyTemplate(beerName,beerID)
    beerContainer.innerHTML += myTemplate

    assignEventListeners()
  }//for loop
}//processMyBeers

function makeMyTemplate(name,id){
  return `
    <li id='${id}'>${name}</li>
  `
}//makeMyTemplate

function assignEventListeners(){
  beerContainer.addEventListener("click",function(e){
    console.log(e.target)
    console.log(e.target.id)

    if(e.target.id)
    {
      fetchOneBeer(e.target.id)
    }

  })
}//assignEventListeners

function fetchOneBeer(id)
{
  //find my beer in the array
  fetch(`http://localhost:3000/beers/${id}`)
  .then(res => res.json())
  .then(displayEditor)
}//fetchOneBeer
function displayEditor(beer){
  let template = `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id='desc-area'>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
  `
  descContainer.innerHTML = template
  listenerUpMyForm(beer)
}
function listenerUpMyForm(beer){
  const saveButton = document.getElementById('edit-beer')

  saveButton.addEventListener("click",function(e){
    console.log("YOU HIT SAVE")
    saveMyStuff(beer)
  })
}
function saveMyStuff(beer){
  //get the form value
  const descArea = document.getElementById('desc-area')// should
  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: descArea.value})

  }).then(alert("saved!"))

}

/*"id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "first_brewed": "09/2007",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "image_url": "https://images.punkapi.com/v2/keg.png",
    "food_pairing": [
      "Spicy chicken tikka masala",
      "Grilled chicken quesadilla",
      "Caramel toffee cake"
    ],
    "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
    "contributed_by": "Sam Mason <samjbmason>"*/
