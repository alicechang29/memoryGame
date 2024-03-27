"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow",
  "red", "blue", "green", "orange", "purple", "yellow"
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each card is a div DOM element that will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

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
Part Three: Implementing clicks and matches»

Clicking a card should change the background color to be the color of the class it has.

Users should only be able to change at most two cards at a time.

Clicking on two matching cards should be a “match” — those cards should stay face up.

When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again.
You should make sure to use a setTimeout so that you can execute code after one second.

if a card is clicked on, set the background color of the card to the div class it has
- how to reference the div class in javascript?

need to switch the css class, not the background color directly
- 1 css class for the background color
- 1 default css class
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle TOGGLE
https://www.w3schools.com/css/css3_variables.asp


Part 4:
Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!

Make sure that you can not click too quickly and guess more than two cards at a time.
*/



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



/*
Handle clicking on a card: this could be first-card or second-card.
 * need a way to track how many cards have been clicked - "state"
 * if it is first card, allow for second card click
 * if it is second card, check if it is a match
 * -- if it is a match, leave the cards open
 * -- if not a match, flip the cards over
 * reset the state
 *
 *

flipStatus:
- first flip
- second flip

*/

//Global Variables

let flipStatus = "first flip";

let firstCard = "";

let secondCard = "";

let allowClicks = true;

let cardCount = 0;

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