import Square from "./Square.js";
import Storage from "./Storage.js";

export default class Board {
  #boardState = [[]];
  #squares = [[], [], [], [], [], []];
  #targetWord;
  #gameIsOver = false;
  #lettersAllowed;
  #hideKeyCallback;
  #rootElement;

  constructor(targetWord, rootElement, lettersAllowed, hideKeyCallback) {
    this.#targetWord = targetWord;
    this.#lettersAllowed = lettersAllowed;
    this.#hideKeyCallback = hideKeyCallback;
    this.#rootElement = rootElement;

    // Generate Square elements
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        const square = new Square();
        square.id = `square-${row}${col}`;
        this.#squares[row][col] = square;
      }
    }

    // Append Square elements to root
    this.#squares.flat().forEach((square) => rootElement.appendChild(square));

    // If we have saved game, load it. Otherwise load empty state
    const savedGame = Storage.loadGame(targetWord);
    if (savedGame) this.#loadState(savedGame);
  }

  submit() {
    if (this.#gameIsOver) {
      console.error("Board can't sumit word because game is over.");
      return;
    }
    if (!this.wordIsFull()) {
      console.error("Board can't submit word. It's not 5 letters long.");
      return;
    }

    // Save game state
    Storage.saveGame(this.#getTargetWord(), this.#getBoardState());

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
      return;
    }

    this.#startNewWord();
  }

  write(letter) {
    if (this.#gameIsOver) {
      throw new Error("Board can't write letter because game is over.");
    }
    if (this.wordIsFull()) {
      throw new Error(
        "Board can't write, because current word already has 5 letters."
      );
    }
    if (!this.#letterIsLegal(letter)) {
      throw new Error(
        `OOPS !Can't write letter to board. Letter is illegal: ${letter}`
      );
    }

    this.#getCurrentSquare().insertLetter(letter);
    this.#getCurrentWordArray().push(letter);
  }

  delete() {
    if (this.#gameIsOver) {
      throw new Error("Board can't delete letter because game is over.");
    }

    if (this.wordIsEmpty()) {
      throw new Error(
        "Board can't delete letter because current word has 0 letters."
      );
    }

    this.#getCurrentWordArray().pop();
    this.#getCurrentSquare().deleteLetter();
  }

  wordIsFull() {
    return this.#getCurrentWordArray().length === 5;
  }

  wordIsEmpty() {
    return this.#getCurrentWordArray().length === 0;
  }

  gameIsOver() {
    return this.#gameIsOver;
  }

  // PRIVATE METHODS

  #loadState(state) {
    if (!this.#stateLooksValid(state)) {
      console.error("Board can't load state. State object is invalid");
      return;
    }

    // Fill in letters
    state.forEach((wordArray, row) => {
      wordArray.forEach((letter, column) => {
        this.#getSquare(row, column).innerText = letter;
      });
    });

    // Color squares
    state.forEach((wordArray, row) => {
      this.#changeSquareColors(this.#getTargetWord(), wordArray, row);
    });

    // Load state
    this.#boardState = state;

    this.submit();
  }

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

      // Letter is wrong
      if (!targetWordArray.includes(letter)) {
        setTimeout(
          () => this.#getSquare(row, column).markGray(),
          column * coloringSpeed
        );

        // Even if letter is marked gray, it may still exist in same word as green.
        if (this.#getTargetWord().includes(letter)) return;

        // Otherwise it won't be needed no more. We can hide it from touchpad.
        this.#hideKeyCallback(letter);
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

  #getCurrentWordArray() {
    return this.#boardState[this.#getNumberOfGuessedWords()];
  }

  #getNumberOfGuessedWords() {
    return this.#boardState.length - 1;
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

  #getCurrentRow() {
    return this.#getNumberOfGuessedWords();
  }

  #getCurrentColumn() {
    return this.#getCurrentWordArray().length;
  }

  #getBoardState() {
    return this.#boardState;
  }

  #letterIsLegal(letter) {
    return this.#lettersAllowed.includes(letter);
  }

  #endGame() {
    this.#gameIsOver = true;

    setTimeout(() => {
      this.#rootElement.dispatchEvent(
        new CustomEvent("gameEnd", {
          bubbles: true,
          detail: {
            targetWord: this.#targetWord,
            boardState: this.#boardState,
          },
        })
      );
    }, 1200);
  }

  #stateLooksValid(state) {
    if (!Array.isArray(state)) return false;
    if (!Array.isArray(state[0])) return false;
    if (state.length > 6) return false;
    if (state.some((element) => element.length !== 5)) return false;
    if (state.flat().some((letter) => !this.#letterIsLegal(letter)))
      return false;

    return true;
  }
}
