const url = "https://www.deckofcardsapi.com/api/deck/new/shuffle"
const newDeckBtn = document.getElementById("new-deck-btn")

newDeckBtn.addEventListener('click', () => {
    fetch(url, {
        method: "GET"
    })
        .then((res) => res.json())
        .then(data => console.log(data))
})
