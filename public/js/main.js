import Board from "./Board.js";
import TouchPad from "./TouchPad.js";
import InfoCard from "./InfoCard.js";

import { getTodaysGameNumber, codec } from "./utils.js";
import wordlist from "./wordlist.js";

let board;
const lettersAllowed = "ąčęėįšųūžertyuiopasdfghjklzcvbnm";
const gameNumber = getTodaysGameNumber();
const targetWord = codec.decode(wordlist[gameNumber]);

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const touchPadKeys = document.querySelectorAll("touch-pad");

  // Register event listeners for all touch-pad keys
  for (let key of touchPadKeys) {
    key.addEventListener("click", (e) => handleKeyPress(e.target.key));
  }

  // Register physical keyboard listener
  window.addEventListener("keydown", (e) => handleKeyPress(e.key));

  window.addEventListener("sayHi", () => {
    console.log("hello");
  });

  document.addEventListener("gameEnd", (e) => {
    handleGameEnd(e.detail.targetWord, e.detail.boardState);
  });

  // window.addEventListener("hideKey", handleHideKey);

  board = new Board(targetWord, boardRoot, lettersAllowed, handleHideKey);
});

function handleLetter(letter) {
  try {
    board.write(letter);
  } catch (error) {
    console.error(error);
  }
}

function handleDelete() {
  try {
    board.delete();
  } catch (error) {
    console.error(error);
  }
}

function handleEnter() {
  try {
    board.submit();
  } catch (error) {
    console.error(error);
  }
}

function handleKeyPress(key) {
  if (board.gameIsOver()) {
    console.log("Game over man");
    return;
  }

  if (key === "Enter") {
    handleEnter();
    return;
  }

  if (key === "Delete" || key === "Backspace") {
    handleDelete();
    return;
  }

  if (lettersAllowed.includes(key)) handleLetter(key.toLowerCase());
}

function handleHideKey(key) {
  const keyElement = document.querySelector(
    `touch-pad[key=${key.toLowerCase()}]`
  );
  keyElement.hide();
}

function handleGameEnd(targetWord, boardState) {
  document.querySelector("#overlay").classList.remove("hidden");
  document.querySelector("#info-card").classList.remove("hidden");
  document.querySelector("#info-card").classList.add("flex");

  // Create infocard
  new InfoCard(boardState, targetWord, gameNumber);
}
