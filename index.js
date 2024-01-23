let deckId
const numCardsValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
const faceCardsValue = ["JACK", "QUEEN", "KING", "ACE"]
const url = "https://www.deckofcardsapi.com/api/deck/new/shuffle"
const newDeckBtn = document.getElementById("new-deck")
const newCardsBtn = document.getElementById("draw-cards")
const players = [document.getElementById("player1-cards"), document.getElementById("player2-cards")]

newDeckBtn.addEventListener('click', () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
        })
})            

newCardsBtn.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.cards.length; i++) {
                players[i].innerHTML = ""
                players[i].innerHTML += `
                <img class="card-output" src="${data.cards[i].image}">
                `
            }
            getWinner(data.cards[0].value, data.cards[1].value)
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
        winnerString = "Player 1 wins!"
    } else if (numVal2 > numVal1) {
        winnerString = "Player 2 wins!"
    } else {
        winnerString = "It's a tie!"
    }
    console.log(winnerString)
    document.getElementById("results").textContent = winnerString
}

getWinner("QUEEN", "JACK")
