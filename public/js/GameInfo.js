import MidnightCountdown from "./MidnightCountdown.js";

export default class GameInfo {
  #boardState;
  #targetWord;
  #gameNumber;
  #cardElement;

  constructor(boardState, targetWord, gameNumber) {
    this.#boardState = boardState;
    this.#targetWord = targetWord;
    this.#gameNumber = gameNumber;
    this.#cardElement = document.querySelector("#game-info");

    // TITLE
    this.#cardElement.querySelector("#endgame-status").innerHTML =
      this.#generateTitle();

    // SOCIAL STATUS
    this.#cardElement.querySelector("#social-status").innerText =
      this.#generateSocialIcons();

    this.#cardElement
      .querySelector("#social-status")
      .addEventListener("click", () => {
        navigator.clipboard.writeText(this.#generateSocialClipboard());
        this.#cardElement.querySelector("#share-text").innerText =
          "Nukopijuota!";
        
        setTimeout(()=> {
    this.#cardElement.querySelector("#share-text").innerText = "Dalinkis rezultatu"
        }, 10000)
      });

    // COUNTDOWN TIMER
    new MidnightCountdown(
      this.#cardElement.querySelector("#hoursLeft"),
      this.#cardElement.querySelector("#minutesLeft"),
      this.#cardElement.querySelector("#secondsLeft"),
      () => {
        location.reload();
      }
    );

    // TARGET WORD IMAGE
    this.#cardElement.querySelector("#target-word").innerHTML =
      this.#generateTargetWordImage();
  }

  #generateTitle() {
    return `№${this.#gameNumber} ${this.#isWinner() ? "pavarei!" : "nepaėjo."}`;
  }

  #isWinner() {
    return (
      this.#boardState[this.#boardState.length - 1].join("") ===
      this.#targetWord
    );
  }

  #generateSocialIcons() {
    let result = "";

    for (let row = 0; row < this.#boardState.length; row++) {
      result += this.#getSquareColors(this.#targetWord, this.#boardState[row]);
      result += "\n";
    }

    return result.trim();
  }

  #generateSocialClipboard() {
    let result = `ŽÓDŽIU №${this.#gameNumber}\n\n`;
    result += this.#generateSocialIcons();
    return result;
  }

  // TODO: This is code duplication from Board class
  #getSquareColors(targetWord, guessedWord) {
    // Make sure we deal with copies and not messing up objects arguments refer to
    const targetWordArray = [...targetWord];
    const guessedWordArray = [...guessedWord];
    const rowIcons = [null, null, null, null, null];

    const green = "🟩";
    const yellow = "🟨";
    const white = "⬜";

    // First deal with letters we guessed right
    guessedWordArray.forEach((letter, column) => {
      if (targetWordArray[column] === letter) {
        guessedWordArray[column] = null;
        targetWordArray[column] = null;

        rowIcons[column] = green;
      }
    });

    // We're left with letters that are either wrong or in wrong place
    guessedWordArray.forEach((letter, column) => {
      if (letter === null) return;

      // Letter is wrong
      if (!targetWordArray.includes(letter)) {
        rowIcons[column] = white;
        return;
      }

      // Letter is in wrong place. Remove it from target so we later don't mark
      // same letter yellow in case only one in target is present
      targetWordArray[targetWordArray.indexOf(letter)] = null;

      rowIcons[column] = yellow;
    });

    return rowIcons.join("");
  }

  #generateTargetWordImage() {
    let result = "";
    for (let letter of this.#targetWord) {
      result += `<div class="flex items-center shadow-md shadow-gray-300 justify-center h-8 w-8 mx-0.5 color-squareGreen color-textBright uppercase">${letter}</div>`;
    }
    return result;
  }
}
