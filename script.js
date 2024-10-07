// constants
const cards = [] // will save selected cards for compare function


// variables
let match = false

// cached elements
const cardElements = document.querySelectorAll(".card") // saves all cards in memory

// functions
const init = (event) => { // main function
  flipCard(event)
}
  

const flipCard = (event) => {
  const firstCard = event.target.parentElement // saves the parent div of selected card
  cards.push(firstCard.classList[1])
  firstCard.classList.toggle("flipCard")
  compare()
}

const compare = () => {
  if (cards[0] === cards[1]) {
    match = true
  }
  else { match = false }
}

// event listeners
cardElements.forEach((card) => {
  card.addEventListener("click", init)
})