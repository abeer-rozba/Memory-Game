// constants
const cards = []


// variables


// cached elements
const cardElements = document.querySelectorAll(".card")

// functions
const init = (event) => {
  flipCard(event)
}
  

const flipCard = (event) => {
  const firstCard = event.target.parentElement
  firstCard.classList.toggle("flipCard")
}


// event listeners
cardElements.forEach((card) => {
  cards.push(card.id)
  card.addEventListener("click", init)
})