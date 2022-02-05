import KeyButton from "./KeyButton.js";
import Board from "./Board.js";

// // Setup new game
const game = {
  guessedWords: [[]],
  currentSquareNumber: 1,
  target: "grąža",
  isGameOver: false,
};

let board;

const allowedLetters =
  "ąčęėįšųūžertyuiopasdfghjklzcvbnmĄČĘĖĮŠŲŪŽERTYUIOPASDFGHJKLZCVBNM";

window.addEventListener("DOMContentLoaded", () => {
  const boardRoot = document.querySelector("#board");
  const miniKeys = document.querySelectorAll("key-button");

  board = new Board("namas", boardRoot);

  // // Populate board with squares
  // for (let i = 0; i < 30; i++) {
  //   const square = new Square();
  //   square.id = `square-${i + 1}`;
  //   board.appendChild(square);
  // }

  // Register event listeners for all mini keyboard keys
  for (let key of miniKeys) {
    key.addEventListener("click", (e) => handleKey(e.target.key));
  }

  // Register physical keyboard listener
  window.addEventListener("keydown", (e) => handleKey(e.key));
});

function handleGameEnd() {
  const isWinner = getTargetWord() === getCurrentWord();
  console.log("game ended. You won?", isWinner);
  alert(isWinner ? "Sveikinu, tu laimėjai!" : "Oopsie! Pralaimėjai.");
  setGameOver(true);
}

function evaluateNewWord() {
  const targetWord = [...getTargetWord()];
  const guessedWord = [...getCurrentWordArray()];

  // First check which letters we guessed right deal with them
  guessedWord.forEach((letter, index) => {
    if (!targetWord.includes(letter)) return;

    if (targetWord[index] === letter) {
      guessedWord[index] = null;
      targetWord[index] = null;
      getSquareByCurrentWordLetterIndex(index).markGreen();
      return;
    }
  });

  // We're left with letters that are wrong or in target, but in wrong places.
  guessedWord.forEach((letter, index) => {
    if (letter === null) return;

    if (!targetWord.includes(letter)) {
      getSquareByCurrentWordLetterIndex(index).markRed();
      return;
    }

    // Remove from target so we don't mark two letters yellow
    // in case only one in target is present
    targetWord[targetWord.indexOf(letter)] = null;
    getSquareByCurrentWordLetterIndex(index).markYellow();
  });

  // If this was last word, handle game end.
  if (isLastWord() || getTargetWord() === getCurrentWord()) {
    handleGameEnd();
    return;
  }

  pushNewWordArray();
}

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

  // evaluateNewWord();
  board.submit();
}

function handleKey(key) {
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

  if (allowedLetters.includes(key)) handleLetter(key);
}

// Board functions

function getSquareByCurrentWordLetterIndex(letterIndex) {
  const squareNumber = getNumberOfWordsEntered() * 5 + letterIndex + 1;
  return document.getElementById(`square-${squareNumber}`);
}

function getCurrentSquare() {
  return document.getElementById(`square-${getCurrentSquareNumber()}`);
}

function isLastWord() {
  return getGuessedWordsArray().length === 6;
}

function getNumberOfWordsEntered() {
  return game.guessedWords.length - 1;
}

function getGuessedWordsArray() {
  return game.guessedWords;
}

function pushNewWordArray() {
  game.guessedWords.push([]);
}

function getCurrentWordArray() {
  return game.guessedWords[game.guessedWords.length - 1];
}

function getCurrentWord() {
  return getCurrentWordArray().join("");
}

function pushCurrentWordArray(letter) {
  return getCurrentWordArray().push(letter);
}

function popCurrentWordArray() {
  getCurrentWordArray().pop();
}

function retreatCurrentSquareNumber() {
  game.currentSquareNumber--;
}

function advanceCurrentSquareNumber() {
  game.currentSquareNumber++;
}

function getCurrentSquareNumber() {
  return game.currentSquareNumber;
}

function getTargetWord() {
  return game.target;
}

function isGameOver() {
  return game.isGameOver;
}

function setGameOver(isOver) {
  game.isGameOver = isOver;
}
