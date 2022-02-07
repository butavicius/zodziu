import LoadingScreen from "./components/LoadingScreen.js";
import Board from "./Board.js";
import TouchPad from "./TouchPad.js";
import InfoCard from "./InfoCard.js";
import { getTodaysGameNumber, codec } from "./utils.js";
import wordlist from "./wordlist.js";
import Logo from "./Logo.js";

let board;
const gameNumber = getTodaysGameNumber();
const targetWord = codec.decode(wordlist[gameNumber]);

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const touchPadKeys = document.querySelectorAll("touch-pad");
  const questionButton = document.querySelector("#question-button");
  const questionCloseButton = document.querySelector("#question-close-button");

  // Question button
  questionButton.addEventListener("click", () => {
    showAboutPage();
  });

  // Question close button
  questionCloseButton.addEventListener("click", () => {
    hideAboutPage();
  });

  // Listen for game end
  document.addEventListener("gameEnd", (e) => {
    handleGameEnd(e.detail.targetWord, e.detail.boardState);
  });

  // TODO: Dispatch handleKey event instead of injecting handler
  board = new Board(targetWord, boardRoot, handleHideKey);

  // Register event listeners for all touch-pad keys
  for (let key of touchPadKeys) {
    key.addEventListener("click", (e) => board.handleKeyPress(e.target.key));
  }

  // Register physical keyboard listener
  window.addEventListener("keydown", (e) => board.handleKeyPress(e.key));
});

// function handleLetter(letter) {
//   board.write(letter);
// }

// function handleDelete() {
//   board.delete();
// }

// function handleEnter() {
//   board.submit();
// }

// function handleKeyPress(key) {
//   if (board.gameIsOver()) {
//     return;
//   }

//   if (key === "Enter") {
//     handleEnter();
//     return;
//   }

//   if (key === "Delete" || key === "Backspace") {
//     handleDelete();
//     return;
//   }

//   if (lettersAllowed.includes(key)) handleLetter(key.toLowerCase());
// }

function handleHideKey(key) {
  const keyElement = document.querySelector(
    `touch-pad[key=${key.toLowerCase()}]`
  );
  keyElement.hide();
}

function handleGameEnd(targetWord, boardState) {
  // debug only
  // setTimeout(hideInfoCard, 2000);

  // Create infocard
  new InfoCard(boardState, targetWord, gameNumber);
  showInfoCard();
}

function showInfoCard() {
  showOverlay();
  document.querySelector("#info-card-container").classList.remove("invisible");
  document.querySelector("#info-card").classList.remove("-translate-y-64");
  document.querySelector("#info-card").classList.remove("opacity-0");
  document.querySelector("#info-card").classList.add("opacity-1");
}

function hideInfoCard() {
  hideOverlay();
  document.querySelector("#info-card-container").classList.add("invisible");
  document.querySelector("#info-card").classList.add("-translate-y-64");
  document.querySelector("#info-card").classList.add("opacity-0");
  document.querySelector("#info-card").classList.remove("opacity-1");
}

function showAboutPage() {
  showOverlay();

  document.querySelector("#about-page-container").classList.remove("invisible");
  document.querySelector("#about-page").classList.remove("-translate-y-96");
  document.querySelector("#about-page").classList.remove("opacity-0");
  document.querySelector("#about-page").classList.add("opacity-1");
}

function hideAboutPage() {
  hideOverlay();
  document.querySelector("#about-page-container").classList.add("invisible");
  document.querySelector("#about-page").classList.add("-translate-y-96");
  document.querySelector("#about-page").classList.add("opacity-0");
  document.querySelector("#about-page").classList.remove("opacity-1");
}

function showOverlay() {
  document.querySelector("#overlay").classList.remove("invisible");
  document.querySelector("#overlay").classList.remove("opacity-0");
  document.querySelector("#overlay").classList.add("opacity-80");
}

function hideOverlay() {
  document.querySelector("#overlay").classList.remove("opacity-80");
  document.querySelector("#overlay").classList.add("invisible");
  document.querySelector("#overlay").classList.add("opacity-0");
}
