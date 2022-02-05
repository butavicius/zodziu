import Square from "./Square.js";

export default class Board {
  #boardState = [[]];
  #squares = [[], [], [], [], [], []];
  #targetWord;
  #gameIsOver = false;
  #lettersAllowed =
    "ąčęėįšųūžertyuiopasdfghjklzcvbnmĄČĘĖĮŠŲŪŽERTYUIOPASDFGHJKLZCVBNM";

  constructor(targetWord, rootElement) {
    this.#targetWord = targetWord;

    // Generate square DOM elements
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        const square = new Square();
        square.id = `square-${row}${col}`;
        this.#squares[row][col] = square;
      }
    }

    // Append square elements to root DOM element
    this.#squares.flat().forEach((square) => rootElement.appendChild(square));
  }

  submit() {
    if (!this.wordIsFull()) {
      throw new Error("Can't submit word. It's not 5 letters yet");
    }

    // Color squares
    this.#changeSquareColors(
      this.#getTargetWord(),
      this.#getCurrentWord(),
      this.#getCurrentRow()
    );

    // If this is our last word, finish game
    if (this.#getNumberOfGuessedWords() === 5) {
      this.#endGame();
    }

    // If we guessed all the letters, finish game
    if (this.#getTargetWord() === this.#getCurrentWord()) {
      this.#endGame();
    }

    if (!this.gameIsOver()) this.#startNewWord();
  }

  write(letter) {
    if (this.wordIsFull()) {
      throw new Error("Can't write letter to board. Word is full.");
    }
    if (!this.#letterIsLegal(letter)) {
      throw new Error(
        `Can't write letter to board. Letter is illegal: ${letter}`
      );
    }

    this.#getCurrentSquare().innerHTML = letter;
    this.#getCurrentWordArray().push(letter);
  }

  delete() {
    if (this.wordIsEmpty()) {
      throw new Error("Can't write letter to board. Word is empty.");
    }

    this.#getCurrentWordArray().pop();
    this.#getCurrentSquare().innerHTML = "";
  }

  gameIsOver() {
    return this.#gameIsOver;
  }

  wordIsFull() {
    return this.#getCurrentWordArray().length === 5;
  }

  wordIsEmpty() {
    return this.#getCurrentWordArray().length === 0;
  }

  loadState(state) {
    this.#boardState = state.boardState;
    this.#gameIsOver = state.gameIsOver;
    this.#targetWord = state.targetWord;

    // Fill in letters in squares
    state.boardState.forEach((wordArray, row) => {
      wordArray.forEach((letter, column) => {
        this.#getSquare(row, column).innerHTML = letter;
      });
    });

    // Color squares
    state.boardState.forEach((wordArray, row) => {
      this.#changeSquareColors(state.targetWord, wordArray, row);
    });
  }

  // PRIVATE METHODS

  #changeSquareColors(targetWord, guessedWord, row) {
    // Make sure we deal with copies and not messing up objects arguments refer to
    const targetWordArray = [...targetWord];
    const guessedWordArray = [...guessedWord];

    // First deal with letters we guessed right
    guessedWordArray.forEach((letter, column) => {
      console.log("column is", column);
      if (targetWordArray[column] === letter) {
        guessedWordArray[column] = null;
        targetWordArray[column] = null;

        this.#getSquare(row, column).markGreen();
      }
    });

    // We're left with letters that are either wrong or in wrong place
    guessedWordArray.forEach((letter, column) => {
      if (letter === null) return;

      if (!targetWordArray.includes(letter)) {
        this.#getSquare(row, column).markRed();
      }

      // Letter is in wrong place. Remove it from target so we later don't mark
      // same letter yellow in case only one in target is present
      targetWordArray[targetWordArray.indexOf(letter)] = null;
      this.#getSquare(row, column).markYellow();
    });
  }

  #getCurrentWord() {
    return this.#getCurrentWordArray().join("");
  }

  #getTargetWord() {
    return this.#targetWord;
  }

  #startNewWord() {
    this.#boardState.push([]);
  }

  #getSquare(row, column) {
    return this.#squares[row][column];
  }

  #getCurrentSquare() {
    return this.#squares[this.#getCurrentRow()][this.#getCurrentColumn()];
  }

  #getCurrentWordArray() {
    return this.#boardState[this.#getNumberOfGuessedWords()];
  }

  #getCurrentRow() {
    return this.#getNumberOfGuessedWords();
  }

  #getCurrentColumn() {
    return this.#getCurrentWordArray().length;
  }

  #getNumberOfGuessedWords() {
    return this.#boardState.length - 1;
  }

  #letterIsLegal(letter) {
    return this.#lettersAllowed.includes(letter);
  }

  #endGame() {
    this.#gameIsOver = true;
  }
}
