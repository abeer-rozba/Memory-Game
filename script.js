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
const cards = ["A", "A", "B", "B", "C", "C", "D", "D"] // stores the cards


// variables
let firstCard = null, secondCard, firstClickedCard, cardClass


// cached elements
const containerElement = document.querySelector(".container") // to append cards to


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
  cardClass.classList.toggle("flip") // flips the card div
  if (firstCard === null) { // if no card was clicked previously
    firstClickedCard = event.currentTarget.id // fetch the card id for the second condition
    console.log(firstClickedCard);
    firstCard = event.currentTarget // store the clicked card
    console.log(firstCard);
  }
  else if (event.currentTarget.id === firstClickedCard) { // check if the same card was clicked twice in a row
    firstCard = null // reset the card value and id
    firstClickedCard = null
    console.log(firstClickedCard);
    console.log(firstCard);
  }
  else {
    secondCard = event.currentTarget // store the second card to compare
    compareCards(firstCard, secondCard)
  }
}

const compareCards = (firstCard, secondCard) => {
  if (firstCard.textContent === secondCard.textContent) // compare the cards values after ensuring they're not the same card
  {
    console.log("match"); // removeEventListener is not working to disable clicking on matched cards!!
  }
  else if (firstCard.textContent !== secondCard.textContent) { // flip non-matching cards back after a delay
    setTimeout(() => {
      firstCard.children[0].classList.remove("flip") // works
      secondCard.children[0].classList.remove("flip")
      firstCard = null // those three lines are clearing the variables but the first card to be clicked afterwards
      secondCard = null // is still considered the second card and skips immediately to the comparing function
      firstClickedCard = null
      console.log(firstCard);
      console.log(secondCard);
      console.log(firstClickedCard);
    }, 1000)
  }
}

setUpCards()
// event listeners
const cardElements = document.querySelectorAll(".card") // cache cards that were created dynamically
// this only works if it was placed here for some reason (?) doesn't work if I move this line somewhere else
const cardElementsArray = Array.from(cardElements) // convert node list to an array

cardElementsArray.forEach((card) => { // listen for clicks on every card
  card.addEventListener("click", (event) => flipCard(event))
})

/*

What am I struggling with?

- Matching cards still listen for clicks. How do I disable it?
- If cards don't match, the cards values do not reset. Instead, the first card to be clicked after the timeout
will still be compared with the first card from before the timeout. This ruins the whole comparison process. Why?
- I read about the shuffle method online but I can't understand how it works.


*/