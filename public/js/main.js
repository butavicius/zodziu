import LoadingScreen from "./components/LoadingScreen.js";
import Board from "./Board.js";
import TouchPad from "./TouchPad.js";
import GameInfo from "./GameInfo.js";
import InfoCard from "./components/InfoCard.js";
import { getTodaysGameNumber, codec } from "./utils.js";
import wordlist from "./wordlist.js";
import Logo from "./Logo.js";
import OpacityOverlay from "./components/OpacityOverlay.js";
import CardRules from "./cards/CardRules.js";

let board;
const gameNumber = getTodaysGameNumber();
const targetWord = codec.decode(wordlist[gameNumber]);

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const touchPadKeys = document.querySelectorAll("touch-pad");
  // const questionButton = document.querySelector("#question-button");
  // const questionCloseButton = document.querySelector("#question-close-button");

  // Question button
  // questionButton.addEventListener("click", () => {
    // document.querySelector("#game-rules").show();
  // });

  // Question close button
  // questionCloseButton.addEventListener("click", () => {
    // document.querySelector("#game-rules").hide();
  // });

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

function handleHideKey(key) {
  const keyElement = document.querySelector(
    `touch-pad[key=${key.toLowerCase()}]`
  );
  keyElement.hide();
}

function handleGameEnd(targetWord, boardState) {
  // debug only
  // setTimeout(hideInfoCard, 2000);

  // Generate game info
  new GameInfo(boardState, targetWord, gameNumber);
  document.querySelector("opacity-overlay").show();
  document.querySelector("#game-info").show();
}

function handleGameInfoClose() {
  document.querySelector("opacity-overlay").hide();
  document.querySelector("#game-info").hide();
}
