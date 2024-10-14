// constants
const cards = ["A", "A", "B", "B", "C", "C", "D", "D"] // stores the cards
const matches = []


// variables
let firstCard = null, secondCard = null, firstClickedCard = null, cardClass = null, win = false

const checkStatus = (funcName) => {
  console.log({
    "Function": funcName,
    "First Card": firstCard,
    "Second Card": secondCard,
    "First Card Clicked": firstClickedCard
  })
}

// cached elements
const containerElement = document.querySelector(".container") // to append cards to
const messageElement = document.querySelector("p")
const resetButton = document.querySelector("#reset")


// functions
const setUpCards = () => {
  let counter = 0 // to assign a unique id to each card
  cards.forEach((card) => { // creates as much cards as there are in the cards array
    const mainCard = document.createElement("div")
    containerElement.appendChild(mainCard)
    mainCard.classList.add("card")
    mainCard.id = counter++ // id is only on the card that will listen for clicks
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
  cardClass = event.currentTarget.children[0] // to access the card classes easily
  if (cardClass.classList.contains("flip")) {
    return;
  }
  else {
  cardClass.classList.toggle("flip") // flips the card div
  if (firstCard === null) { // if no card was clicked previously
    firstClickedCard = event.currentTarget.id // fetch the card id for the second condition
    firstCard = event.currentTarget // store the clicked card
  }
  else if (event.currentTarget.id === firstClickedCard) { // check if the same card was clicked twice in a row
    firstCard = null // reset the card value and id
    firstClickedCard = null
  }
  else {
    secondCard = event.currentTarget // store the second card to compare
    compareCards()
  } }
}

const compareCards = () => {
  if (firstCard.textContent === secondCard.textContent) // compare the cards values after ensuring they're not the same card
  {
    matches.push(firstCard.id)
    matches.push(secondCard.id)
    firstCard = null 
    secondCard = null
    firstClickedCard = null
    checkForWin()
  }
  else if (firstCard.textContent !== secondCard.textContent) { // flip non-matching cards back after a delay
    setTimeout(() => {
      firstCard.children[0].classList.remove("flip")
      secondCard.children[0].classList.remove("flip")
      firstCard = null
      secondCard = null
      firstClickedCard = null
    }, 1000)
  }
}

const checkForWin = () => {
  if (matches.length === cards.length) {
    win = true
    messageElement.textContent = "You win!"
  }
  else {
    return;
  }
}

const shuffle = () => {
  for (let i=cards.length-1; i>=0; i--) {
    let randomIndex = Math.floor(Math.random() * (i+1))
    let temp = cards[randomIndex]
    cards[randomIndex] = cards[i]
    cards[i] = temp
  }
}

const resetCards = () => {
  shuffle()
}

shuffle()
setUpCards()
// event listeners
const cardElements = document.querySelectorAll(".card")
const cardElementsArray = Array.from(cardElements) // convert node list to an array

cardElementsArray.forEach((card) => { // listen for clicks on every card
  card.addEventListener("click", (event) => flipCard(event))
})

resetButton.addEventListener("click", () => {
  cardClass = null
  win = false
  messageElement.textContent = ""
  cardElementsArray.forEach((item) => {
    item.textContent = ""
  })
  resetCards()
})