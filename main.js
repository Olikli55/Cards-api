
let deckId = '';


// async - returns a promise | await - pause the funciton
async function createDeck() {
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json(); 
    deckId = data.deck_id;  //get the id of a created deck so we can use it later
    drawAllCards();
}

async function drawAllCards() {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const data = await response.json();
    displayCards(data.cards);
}

function displayCards(cards) {
    const cardsDiv = document.getElementById('cards'); // finds the div
    cardsDiv.innerHTML = ''; // deltes everything
    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.image; // edits the image
        img.width = 226 /2
        img.height = 314 /2
        cardsDiv.appendChild(img);
    })
}



async function shuffle(){
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    drawAllCards();
    console.log("shuffle the cards pls ");
}

createDeck()