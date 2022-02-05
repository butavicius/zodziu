import Board from "./Board.js";
import TouchPad from "./TouchPad.js";

let board;
const lettersAllowed =
  "ąčęėįšųūžertyuiopasdfghjklzcvbnmĄČĘĖĮŠŲŪŽERTYUIOPASDFGHJKLZCVBNM";

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const touchPadKeys = document.querySelectorAll("touch-pad");

  board = new Board("šątės", boardRoot, lettersAllowed);

  // Register event listeners for all mini keyboard keys
  for (let key of touchPadKeys) {
    key.addEventListener("click", (e) => handleKeyPress(e.target.key));
  }

  // Register physical keyboard listener
  window.addEventListener("keydown", (e) => handleKeyPress(e.key));
});

function handleLetter(letter) {
  if (board.wordIsFull()) {
    console.log("Current word full. Press enter to submit.");
    return;
  }

  board.write(letter);
}

function handleDelete() {
  if (board.wordIsEmpty()) {
    console.log("Can't delete. Current word empty.");
    return;
  }

  board.delete();
}

function handleEnter() {
  if (!board.wordIsFull()) {
    console.log("Can't submit word. It't not 5 letters yet.");
    return;
  }

  board.submit();
}

function handleKeyPress(key) {
  if (board.gameIsOver()) {
    console.log("Game over man");
    alert("Šiandien žaidimas baigtas.");
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

  if (lettersAllowed.includes(key)) handleLetter(key);
}
