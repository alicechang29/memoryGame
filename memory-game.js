/*
allow users to select:
- easy (12 cards)
- medium (16 cards)
- hard (20 cards)

probably need to:
- create a css class for each image
- reference the css class that contains the image
*/

//create buttons and event listeners, attach it to my menu

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

    let levelButton = document.createElement("button");
    levelButton.classList.add(`${level}-button`);
    levelButton.textContent = level;

    //levelButton.addEventListener("click", insert function to handle level play */);

    levelButtons.appendChild(levelButton);

  }
  menu.appendChild(levelButtons);
}

createPlayLevels();


/*
================================================================================
                                  Game Setup
================================================================================
*/


/** Memory game: find matching pairs of cards and flip both of them. */


const COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow",
  "red", "blue", "green", "orange", "purple", "yellow"
];

const colors = shuffle(COLORS);

createCards(colors);



/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/* Create card for every color in colors (each will appear twice)*/

function createCards(colors) {
  const gameBoard = document.querySelector("#game");

  for (let color of colors) {
    //for each value in the color array, create a card (a div with class and event handler)

    let card = document.createElement("div");
    card.classList.add(`${color}`);
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
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

  let flippedColor = card.className;

  card.classList.toggle("flipstyle");
  card.classList.toggle("flipped");
  card.style.setProperty('--flipColor', flippedColor);

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

    if (card1.className !== card2.className) {
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
    numOfActiveCards = 0;
  }

}


function handleCardClick(evt) {

  let selectedCard = evt.target;

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
}






