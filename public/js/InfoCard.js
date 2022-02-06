import MidnightCountdown from "./MidnightCountdown";

class InfoCard {
  boardState;
  targetWord;
  gameNumber;

  constructor(boardState, targetWord, gameNumber) {
    this.#boardState = boardState;
    this.#targetWord = targetWord;
    this.#gameNumber = gameNumber;
  }

  #generateSocialStatus(boardState, targetWord, gameNumber) {
    let result = `ŽÓDŽIU No.${gameNumber}\n`;

    for (let row = 0; row < boardState.length; row++) {
      result += getSquareColors(targetWord, boardState[row]);
      result += "\n";
    }

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
}
