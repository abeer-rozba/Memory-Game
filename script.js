// constants
const cards = []


// variables



// cached elements
const cardElement = document.querySelector(".card")

// functions
const init = () => {
  flipCard()
}
  

const flipCard = () => {
  cardElement.classList.toggle("flipCard")
}

// event listeners
cardElement.addEventListener("click", init)