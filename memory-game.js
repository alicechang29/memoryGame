"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
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
*/

/** Flip a card face-up. */

function flipCard(card) {
  // set the background color to the div color
  card.style.backgroundColor = card.className;

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // reset the background color to blank
  card.style.backgroundColor = "transparent";
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  let selectedCard = evt.target;
  flipCard(selectedCard);
}

