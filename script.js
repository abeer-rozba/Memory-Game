/* // constants
const cards = [] // will save selected cards class for compare function


// variables
let match = false
let firstCard = null

// cached elements
const cardElements = document.querySelectorAll(".card") // saves all cards in memory

// functions
const init = (event) => { // main function
  flipCard(event)
}
  

const flipCard = (event) => {
  const clickedCard = event.currentTarget // saves the parent div of selected card
  cards.push(clickedCard.classList[1]) // saves second class to compare
  clickedCard.classList.toggle("flipCard") // flips the card
  if (firstCard === null) {
    firstCard = clickedCard
  }
  else { compare(firstCard, clickedCard)}
}

const compare = (firstCard, clickedCard) => {
  if (cards[0] === cards[1]) { // compares card classes to determine a match
    match = true // updates the match value
    clickedCard.removeEventListener("click", init) // disables clicking on the matched card again
    firstCard.removeEventListener("click", init)
  }
  else {
    match = false 
    setTimeout(() => {
      // firstCard.classList.remove("flipCard")
      clickedCard.classList.remove("flipCard")
    }, 1000)
  }
  firstCard = null // resets the card to compare
  cards.length = 0
}

// event listeners
cardElements.forEach((card) => { // listens for user clicks on cards
  card.addEventListener("click", init)
}) */





// constants
const cards = ["A", "A", "B", "B", "C", "C", "D", "D"]


// variables
let firstCard = null, secondCard


// cached elements
const containerElement = document.querySelector(".container")


// functions
const play = () => {
  setUpCards()
}

const setUpCards = () => {
  cards.forEach((card) => {
    const mainCard = document.createElement("div")
    containerElement.appendChild(mainCard)
    mainCard.classList.add("card") 
    const cardInner = document.createElement("div")
    mainCard.appendChild(cardInner)
    cardInner.classList.add("inner")
    const cardFront = document.createElement("div")
    cardFront.textContent = card
    cardInner.appendChild(cardFront)
    cardFront.classList.add("front")
    const cardBack = document.createElement("div")
    cardInner.appendChild(cardBack)
    cardBack.classList.add("back")
  })
}

const flipCard = (event) => {
  event.currentTarget.children[0].classList.toggle("flip")
  if (!firstCard) { 
    firstCard = event.currentTarget.textContent
  }
  else {
    secondCard = event.currentTarget.textContent
    compareCards(firstCard, secondCard)
  }
}

const compareCards = (firstCard, secondCard) => {
  if (firstCard === secondCard)
  {
    console.log("match");
  }
  else if (firstCard !== secondCard) {
    console.log("no match");
  }
}

play()
// event listeners
const cardElements = document.querySelectorAll(".card")
const cardElementsArray = Array.from(cardElements)

cardElementsArray.forEach((card) => {
  card.addEventListener("click", (event) => flipCard(event))
})