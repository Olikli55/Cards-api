
let deckId = '';
let score = 0;
let currentCard = null;
let game = false;

// async - returns a promise | await - pause the funciton
async function createDeck() {
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json(); 
    deckId = data.deck_id;  //get the id of a created deck so we can use it later
    drawAllCards();
}

async function drawAllCards() {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const data = await response.json()
    displayCards(data.cards);
}

function displayCards(cards) { // jsut display all the cards for fun idk 
    const cardsDiv = document.getElementById('cards'); // finds the div
    cardsDiv.innerHTML = ''; // deltes everything
    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.image; // edits the image and makes it smaller
        img.width = 226 /2
        img.height = 314 /2
        img.classList.add('card-animation')
        cardsDiv.appendChild(img);
    })
}



async function shuffle(){
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    drawAllCards();
    //console.log("shuffle the cards pls ");
    score = 0; 
    updateScore();
}




async function startGame() {
    game = true;
    score = 0;
    updateScore();
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);// shuffle the deck with corect deckId
    drawCard();
}


async function drawCard() {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    
    if(data.remaining === 0) {
        alert(`game over vro your score: ${score}`);
        game = false;
        return;
    }
    
    currentCard = data.cards[0];
    const cardsDiv = document.getElementById('cards');
    cardsDiv.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = currentCard.image;
    img.width = 226 / 2;
    img.height = 314 / 2;
    img.classList.add('card-flip');//css
    cardsDiv.appendChild(img);
}

function getCardValue(card) {
    const values = {
        'ACE': 14,
        'KING': 13,
        'QUEEN': 12,
        'JACK': 11
    };
    ///convert the shity data to normal data like ace to 14 and "2" to number 2
    if (!isNaN(card.value)) {
        return Number(card.value);
    } else {
        return values[card.value];
    }
}

async function guess(higher) {
    if(game == false || currentCard < 0) return;
    
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); //draw a card
    const data = await response.json();
    
    //game over check
    if(data.remaining === 0) {
        alert(`deck empty! final score: ${score}`);
        game = false;
        return;
    }
    
    const nextCard = data.cards[0];
    const currentValue = getCardValue(currentCard);
    const nextValue = getCardValue(nextCard);
    
    let correct = false; 
    if(higher && nextValue >= currentValue) {correct = true};//self explanatory
    if(!higher && nextValue <= currentValue) {correct = true};
    
    if(correct) {
        score+=1;
        //console.log('dfgsgsf ');

    } else {
        score -=1;
    }
    
    updateScore();
    currentCard = nextCard; //switch the buffer 
    
    const cardsDiv = document.getElementById('cards');
    cardsDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = currentCard.image;

    img.width = 226 / 2; //make the cards smaller same as up there
    img.height = 314 / 2; 

    img.classList.add('card-flip');
    cardsDiv.appendChild(img);
}

function updateScore() { 
    document.getElementById('score').textContent = `Score: ${score}`;  //{} this mtf works only with `
}




//start the game
createDeck()





















































































































































































































































































































































































































































































//heheheh easter egg