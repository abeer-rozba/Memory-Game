// constants
const cards = ["🐻", "🐻", "🐻‍❄️", "🐻‍❄️", "🐨", "🐨", "🐼", "🐼"] // stores the cards
const matches = [] // keeps track of number of matched cards

// variables
let firstCard = null, secondCard = null, cardClass = null, win = false, counter = 0, lossCounter = 0

// cached elements
const messageElement = document.querySelector("h3") // to display win message
const resetButton = document.querySelector("#reset") // to listen to button clicks
const cardElements = document.querySelectorAll(".card") // to listen to card clicks
const cardFrontElements = document.querySelectorAll(".front") // to assign cards values
const innerCards = document.querySelectorAll(".inner") // to remove flip class


// functions
const setUpCards = () => { 
  let counter = 0
  cardFrontElements.forEach((card) => {
    card.textContent = cards[counter]
    counter++
  })
} // iterates over cards array using the counter, and assigns each card the corresponding value 

const flipCard = (event) => {
  cardClass = event.currentTarget.children[0] // stored to access the inner div classes easily
  if (cardClass.classList.contains("flip")) {
    return; // disables clicking on the same card multiple times in a row or clicking again on matched cards
  }
  else {
  cardClass.classList.toggle("flip") // flips the card
    if (firstCard === null) { // tracks the first and second cards to be clicked
      firstCard = event.currentTarget
    }
    else {
      secondCard = event.currentTarget
      compareCards()
    }
  }
}

const compareCards = () => { // compares clicked cards
  if (firstCard.textContent === secondCard.textContent) { // stores the id of matching cards to track remaining cards
    matches.push(firstCard.id) 
    matches.push(secondCard.id)
    checkForWin()
    whichBear()
    firstCard = null // clears comparison variables for the card to be clicked next
    secondCard = null
  }
  else if (firstCard.textContent !== secondCard.textContent) { // flips non-matching cards back after a delay
      lossCounter++
      checkForLoss()
      setTimeout(() => {
      firstCard.children[0].classList.remove("flip")
      secondCard.children[0].classList.remove("flip")
      firstCard = null
      secondCard = null
    }, 1000) }
  }

const whichBear = () => {
  if (firstCard.innerText === "🐻") {
    messageElement.textContent = "You matched Grizz!"
      setTimeout(() => {
        messageElement.textContent = "He's my favorite :D"
    }, 1500);
    if (win === true) {
      setTimeout(() => {
        messageElement.textContent = "And... all the cards have been matched!"
      }, 3000);
    }
  }

  if (firstCard.innerText === "🐻‍❄️") {
    messageElement.textContent = "You matched Ice Bear!"
      setTimeout(() => {
        messageElement.textContent = "You're doing great!"
      }, 1500);
    if (win === true) {
      setTimeout(() => {
        messageElement.textContent = "And... all the cards have been matched!"
      }, 3000)
    }
  }

  if (firstCard.innerText === "🐼") {
    messageElement.textContent = "You matched Panda!"
      setTimeout(() => {
        messageElement.textContent = "This is fun!"
      }, 1500);
    if (win === true) {
      setTimeout(() => {
        messageElement.textContent = "And... all the cards have been matched!"
      }, 3000)
    }
  }

  if (firstCard.innerText === "🐨") {
    messageElement.textContent = "You matched Nom Nom!"
      setTimeout(() => {
        messageElement.textContent = "He's not a bear but oh well.."
      }, 1500)
      if (win === true) {
        setTimeout(() => {
          messageElement.textContent = "And... all the cards have been matched!"
        }, 3000)
      }
  }
}

const checkForWin = () => {
  if (matches.length === cards.length) { // checks if all cards have been matched
    win = true
  }
  else {
    return;
  }
}

const checkForLoss = () => {
  if (lossCounter===3) {
    messageElement.textContent = "You lose :("
    innerCards.forEach((card) => {
      if (card.classList.contains("flip")) {
      card.classList.remove("flip")
    }
      card.classList.toggle("flip")
    })
    firstCard = null
    secondCard = null
    setTimeout(() => {
      reset() 
    }, 1500);
  }
  else {return;}
}

const shuffle = () => { // randomizes the card positions in cards array
  for (let i=cards.length-1; i>=0; i--) {
    let randomIndex = Math.floor(Math.random() * (i+1))
    let temp = cards[randomIndex]
    cards[randomIndex] = cards[i]
    cards[i] = temp
  }
}

const clearAll = () => { // resets the content for the next game
  lossCounter = 0
  cardClass = null
  matches.length = 0
  messageElement.textContent = "Let's match the bears!"
}

const flipBack = () => { // flips back all cards
  innerCards.forEach((card) => {
    if (card.classList.contains("flip")) {
      card.classList.remove("flip")
    }
  })
}

const reset = () => {
  flipBack()
  clearAll()
  setTimeout(() => { // to prevent the new cards from showing behind the current cards
    shuffle()
    setUpCards()
  }, 1000);
}

// event listeners
cardElements.forEach((card) => { // listen for clicks on every card to trigger flipping function
  card.addEventListener("click", (event) => flipCard(event))
})

resetButton.addEventListener("click", () => { // resets game variables then shuffles and restarts the game
  reset()
})

// function calls
shuffle() // initial status of the game when the page loads
setUpCards()