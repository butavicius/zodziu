import Square from "./Square.js";

export default class Board {
  #boardState = [[]];
  #squares = [[], [], [], [], [], []];
  #targetWord;
  #gameIsOver = false;
  #lettersAllowed;

  constructor(targetWord, rootElement, lettersAllowed) {
    this.#targetWord = targetWord;
    this.#lettersAllowed = lettersAllowed;

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
      console.error("OOPS! Can't write letter to board. Word is full.");
      return;
    }
    if (!this.#letterIsLegal(letter)) {
      console.error(
        `OOPS !Can't write letter to board. Letter is illegal: ${letter}`
      );
      return;
    }

    this.#getCurrentSquare().insertLetter(letter);
    this.#getCurrentWordArray().push(letter);
  }

  delete() {
    if (this.wordIsEmpty()) {
      console.error("Can't write letter to board. Word is empty.");
      return;
    }

    this.#getCurrentWordArray().pop();
    this.#getCurrentSquare().deleteLetter();
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
    if (!this.#stateLooksValid(state)) {
      console.error("OOPS!: Can't load state. State object is invalid");
      return;
    }

    // Fill in letters
    state.boardState.forEach((wordArray, row) => {
      wordArray.forEach((letter, column) => {
        this.#getSquare(row, column).insertLetter(letter);
      });
    });

    // Color squares
    state.boardState.forEach((wordArray, row) => {
      this.#changeSquareColors(state.targetWord, wordArray, row);
    });

    this.#boardState = state.boardState;
    this.#gameIsOver = state.gameIsOver;
    this.#targetWord = state.targetWord;

    this.submit();
  }

  // PRIVATE METHODS

  #changeSquareColors(targetWord, guessedWord, row) {
    // Make sure we deal with copies and not messing up objects arguments refer to
    const targetWordArray = [...targetWord];
    const guessedWordArray = [...guessedWord];

    // Time delay after each square reveal.
    const coloringSpeed = 200;

    // First deal with letters we guessed right
    guessedWordArray.forEach((letter, column) => {
      if (targetWordArray[column] === letter) {
        guessedWordArray[column] = null;
        targetWordArray[column] = null;

        setTimeout(
          () => this.#getSquare(row, column).markGreen(),
          column * coloringSpeed
        );
      }
    });

    // We're left with letters that are either wrong or in wrong place
    guessedWordArray.forEach((letter, column) => {
      if (letter === null) return;

      if (!targetWordArray.includes(letter)) {
        setTimeout(
          () => this.#getSquare(row, column).markRed(),
          column * coloringSpeed
        );
      }

      // Letter is in wrong place. Remove it from target so we later don't mark
      // same letter yellow in case only one in target is present
      targetWordArray[targetWordArray.indexOf(letter)] = null;

      setTimeout(
        () => this.#getSquare(row, column).markYellow(),
        column * coloringSpeed
      );
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

  #stateLooksValid(state) {
    if (!Array.isArray(state.boardState)) return false;
    if (!Array.isArray(state.boardState[0])) return false;
    if (state.boardState.length > 6) return false;
    if (typeof state.gameIsOver !== "boolean") return false;
    if (state.targetWord.length !== 5) return false;
    if (state.boardState.some((element) => element.length !== 5)) return false;
    if (state.boardState.flat().some((letter) => !this.#letterIsLegal(letter)))
      return false;

    return true;
  }
}
