let deckId
const numCardsValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
const faceCardsValue = ["JACK", "QUEEN", "KING", "ACE"]
const url = "https://www.deckofcardsapi.com/api/deck/new/shuffle"
const newDeckBtn = document.getElementById("new-deck")
const newCardsBtn = document.getElementById("draw-cards")
const players = [document.getElementById("player1-cards"), document.getElementById("player2-cards")]
const gameStatus = document.getElementById("results")
const remainingCards = document.getElementById("remaining-cards")
const computerScoreDisplay = document.getElementById("computer-score")
const playerScoreDisplay = document.getElementById("player-score")

let computerScore = 0
let playerScore = 0

newCardsBtn.disabled = true

newDeckBtn.addEventListener('click', () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            gameStatus.innerHTML = ""
            console.log(data)
            deckId = data.deck_id
            console.log(deckId)
            computerScore = 0
            playerScore = 0
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            computerScoreDisplay.textContent = `Computer Score: ${computerScore}`
            playerScoreDisplay.textContent = `Player Score: ${playerScore}`
        })
    newCardsBtn.disabled = false
})            

newCardsBtn.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            // if there's no card left, disable the button
            if (data.remaining === 0) {               
                // gameStatus.textContent = "No Cards Remaining"
                if (computerScore > playerScore) {
                    gameStatus.textContent = "Computer Wins!"
                } else if (playerScore > computerScore) {
                    gameStatus.textContent = "Player Wins!"
                } else {
                    gameStatus.textContent = "It's a tie!"
                }
            }

            // if there's no deck id, tell the user to get a new deck
            if (!data.deck_id) {
                gameStatus.textContent = "Please Get a New Deck of Cards"
            } else { // if there is a deck id, display the cards
                newCardsBtn.disabled = false
                for (let i = 0; i < data.cards.length; i++) {
                players[i].innerHTML = ""
                players[i].innerHTML += `
                <img class="card-output" src="${data.cards[i].image}">
                `
            }
            getWinner(data.cards[0].value, data.cards[1].value)}
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            console.log(data)
            console.log(data.remaining)       
        });
});

function getNumberValue(card) {
    if (numCardsValue.includes(card)) {
        return Number(card)
} else if (faceCardsValue.includes(card)) {
    if (card === "JACK") {
        return 11
    } else if (card === "QUEEN") {
        return 12
    } else if (card === "KING") {
        return 13
    } else if (card === "ACE") {
        return 14
    }
}}

function getWinner(card1, card2){
    let numVal1 = getNumberValue(card1)
    let numVal2 = getNumberValue(card2)
    let winnerString = ""
    if (numVal1 > numVal2) {
        winnerString = "Computer wins!"
        computerScore++
        computerScoreDisplay.textContent = `Computer Score: ${computerScore}`
    } else if (numVal2 > numVal1) {
        winnerString = "Player 2 wins!"
        playerScore++
        playerScoreDisplay.textContent = `Player Score: ${playerScore}`
    } else {
        winnerString = "It's a tie!"
    }
    console.log(winnerString)
    gameStatus.textContent = winnerString
}
