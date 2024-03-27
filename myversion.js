"use strict";

/*
================================================================================
                                  Menu Setup
================================================================================
*/

const menu = document.querySelector(".menu");

const levelButtons = document.createElement("div");
levelButtons.classList.add("menu-buttons");

function createPlayLevels() {
  let levels = ["Easy", "Medium", "Hard"];

  for (let level of levels) {
    console.log(level);
    let levelButton = document.createElement("button");
    levelButton.classList.add(`${level}-button`);
    levelButton.textContent = level;

    levelButton.addEventListener("click", handleBoardSetup);

    levelButtons.appendChild(levelButton);

  }
  menu.appendChild(levelButtons);

}

createPlayLevels();

/*
================================================================================
                                Score Counting
================================================================================
every time user clicks a card, guess count++

once all cards have a class of flipped, save the max highscore
*/

//current game
let guessCount = 0;

const numOfGuesses = document.createElement("div");
numOfGuesses.classList.add("guess-count");
numOfGuesses.textContent = `Total Guesses: ${guessCount}`;
menu.appendChild(numOfGuesses);

function updateGuessCount() {
  numOfGuesses.textContent = `Total Guesses: ${guessCount}`;
}

//add a highscore count
let highScore = 0;

const highscoreContainer = document.createElement("div");
highscoreContainer.classList.add("highscore-count");
highscoreContainer.textContent = `Highscore: ${highScore}`;
menu.appendChild(highscoreContainer);



/*
================================================================================
                                  Gameboard Setup
================================================================================
*/

const gameBoard = document.querySelector("#game");

function createGrids(column, row) {
  for (let i = 0; i < column; i++) {
    let column = document.createElement("div");
    column.classList.add("grid-column");
    for (let j = 0; j < row; j++) {
      let gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      column.appendChild(gridCell);
    }
    gameBoard.appendChild(column);
  }
}
createGrids();

function resetGrids() {
  const removeColumns = document.getElementsByClassName("grid-column");
  while (removeColumns.length > 0) {
    removeColumns[0].remove(); // Remove the first column in each iteration
  }
}



function handleBoardSetup(evt) {
  let numOfCards = 16;
  let levelValue = evt.target.textContent;
  resetGrids();
  if (levelValue === "Easy") {
    numOfCards = 12;
    createGrids(4, 3);
  } else if (levelValue === "Medium") {
    numOfCards = 16;
    createGrids(4, 4);
  } else {
    numOfCards = 20;
    createGrids(5, 4);
  }
  const playingCards = shuffle(randomCardSelection(deckOfCards, numOfCards)); //eg: ['KC', '2S', '4C', '7D', 'QC', '5S', '4H', '10H']
  createCards(playingCards);
}



/*
================================================================================
                                  Game Cards Setup
================================================================================
*/

const deckOfCards = [
  "4H", "7H", "8H", "JH", "AH", "2D", "7D", "8D", "KD", "AD", "2S", "3S", "4S", "5S", "6S", "4C", "8C", "JC", "QC", "KC"
];

//https://www.deckofcardsapi.com/static/img/8D.png

//randomly select the cards


function randomCardSelection(items, num) {
  let selectedCards = [];
  let count = num / 2;

  while (count > 0) {
    let j = Math.floor(Math.random() * items.length);
    if (!selectedCards.includes(items[j])) {

      selectedCards.push(items[j]);
      selectedCards.push(items[j]);
      count--;
    }
  }

  return selectedCards;
}

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


function createCards(activeCards) {
  //loop through the grid-cells
  //assign a card to each grid-cell

  const gridCells = document.querySelectorAll("#game .grid-cell");

  let i = activeCards.length - 1;

  while (i >= 0) {
    for (let cell of gridCells) {
      cell.setAttribute("card-value", activeCards[i]);
      cell.addEventListener("click", handleCardClick);
      cell.classList.add("unflipped");
      i--;
    }
  }
}



/*
================================================================================
                                Gameplay Logic
================================================================================
*/

/*
flipStatus values:
- first flip
- second flip
*/

let flipStatus = "first flip";

let firstCard = "";

let secondCard = "";


/** Flip a card face-up. */

function flipCard(card) {
  // set the background color to the div color
  let cardVal = card.getAttribute("card-value"); //"QC"
  console.log(cardVal);


  let imgURL = "url('https://www.deckofcardsapi.com/static/img/" + cardVal + ".png')";


  card.classList.toggle("flipstyle");
  card.classList.toggle("flipped");
  card.style.setProperty('--imgurl', imgURL);

  checkForMatch(firstCard, secondCard);

}

/** Flip a card face-down.*/

function unFlipCard(card) {
  // reset the background color to blank
  card.classList.toggle("flipstyle");
  card.classList.toggle("flipped");

}


function checkForMatch(card1, card2) {

  if (flipStatus === "second flip") {

    if (card1.getAttribute("card-value") !== card2.getAttribute("card-value")) {
      pauseClicks();
      setTimeout(function () {

        unFlipCard(card1);
        unFlipCard(card2);

      }, 1000);

    } else {
      //freeze the matches. make editing/toggling stop
      pauseClicks();
      card1.classList.add("flipped");
      card2.classList.add("flipped");

    }
    flipStatus = "first flip";
    firstCard = "";
    secondCard = "";
  }

}


function handleCardClick(evt) {

  let selectedCard = evt.target;
  guessCount++;
  updateGuessCount();
  console.log(guessCount);

  if (flipStatus === "first flip") {

    firstCard = selectedCard;
    flipCard(selectedCard);
    flipStatus = "second flip";

  } else if (flipStatus === "second flip") {

    secondCard = selectedCard;
    flipCard(selectedCard);

  }
  pauseClicks(); //this is not working as expected

}













/*
================================================================================
                                gotchas
================================================================================
*/

/* Temporarily disable clicking after cards have been selected */

function disableClicking() {
  const gameCards = document.getElementById("game");
  const childCards = gameCards.querySelectorAll('div');

  childCards.forEach(function (card) {
    card.classList.toggle("pauseClicking");
  });

}

function pauseClicks() {
  disableClicking();
  setTimeout(function () {
    disableClicking();
  }, 500);
};