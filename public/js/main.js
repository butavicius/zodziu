import Board from "./Board.js";
import TouchPad from "./TouchPad.js";
import wordlist from "./wordlist.js";
import Countdown from "./MidnightCountdown.js";
import { getCurrentWordIndex, codec } from "./utils.js";
// import MidnightCountdown from "./MidnightCountdown.js";
import Storage from "./Storage.js";

let board;
const lettersAllowed = "ąčęėįšųūžertyuiopasdfghjklzcvbnm";
const targetWord = codec.decode(wordlist[getCurrentWordIndex()]);

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const touchPadKeys = document.querySelectorAll("touch-pad");
  board = new Board(targetWord, boardRoot, lettersAllowed, handleHideKey);

  // Register event listeners for all touch-pad keys
  for (let key of touchPadKeys) {
    key.addEventListener("click", (e) => handleKeyPress(e.target.key));
  }

  // Register physical keyboard listener
  window.addEventListener("keydown", (e) => handleKeyPress(e.key));
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
