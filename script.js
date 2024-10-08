// constants
const cards = [] // will save selected cards class for compare function


// variables
let match = false
let parentDiv = ""

// cached elements
const cardElements = document.querySelectorAll(".card") // saves all cards in memory

// functions
const init = (event) => { // main function
  flipCard(event)
  compare()
}
  

const flipCard = (event) => {
  parentDiv = event.target.parentElement // saves the parent div of selected card
  cards.push(parentDiv.classList[1]) // saves second class to compare
  parentDiv.classList.toggle("flipCard") // flips the card
}

const compare = () => {
  if (cards[0] === cards[1]) { // compares card classes to determine a match
    match = true // updates the match value
    parentDiv.removeEventListener("click", init) // disables clicking on the current card again
  }
  else { match = false }
  console.log(match);
  console.dir(parentDiv);
}

// event listeners
cardElements.forEach((card) => { // listens for user clicks on cards
  card.addEventListener("click", init)
})