import Square from "./Square.js";
import Storage from "./Storage.js";

export default class Board {
  #boardState = [[]];
  #squares = [[], [], [], [], [], []];
  #targetWord;
  #gameIsOver = false;
  #hideKeyCallback;
  #rootElement;
  #lettersAllowed = "ąčęėįšųūžertyuiopasdfghjklzcvbnm";

  constructor(targetWord, rootElement, hideKeyCallback) {
    this.#targetWord = targetWord;
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

  handleKeyPress(key) {
    if (this.#gameIsOver)
      return console.log("Can't handle key press: game is over.");

    if (key.toLowerCase() === "enter") return this.#submit();

    if (key.toLowerCase() === "delete" || key.toLowerCase() === "backspace")
      return this.#delete();

    if (this.#lettersAllowed.includes(key.toLowerCase()))
      return this.#write(key.toLowerCase());
  }

  #submit() {
    if (this.#gameIsOver) {
      return console.log("Can't sumit word: game is over.");
    }
    if (!this.#wordIsFull()) {
      return console.log("Can't submit word: word length < 5.");
    }

    // Save game state
    Storage.saveGame(this.#targetWord, this.#getBoardState());

    // Color squares
    this.#changeSquareColors(
      this.#targetWord,
      this.#getCurrentWord(),
      this.#getCurrentRow()
    );

    // If we guessed word or it was last word, finish game
    if (
      this.#getNumberOfGuessedWords() === 5 ||
      this.#targetWord === this.#getCurrentWord()
    )
      return this.#endGame();

    this.#startNewWord();
  }

  #write(letter) {
    if (this.#gameIsOver)
      return console.log("Can't write letter: game is over.");

    if (this.#wordIsFull())
      return console.log("Can't write letter: word length 5.");

    if (!this.#letterIsLegal(letter))
      return console.log(`Can't write letter. Letter is illegal: ${letter}`);

    this.#getCurrentSquare().insertLetter(letter);
    this.#getCurrentWordArray().push(letter);
  }

  #delete() {
    if (this.#gameIsOver) {
      console.log("Can't delete letter: game is over.");
    }

    if (this.#wordIsEmpty()) {
      console.log("Can't delete letter: word length 0.");
    }

    this.#getCurrentWordArray().pop();
    this.#getCurrentSquare().deleteLetter();
  }

  #wordIsFull() {
    return this.#getCurrentWordArray().length === 5;
  }

  #wordIsEmpty() {
    return this.#getCurrentWordArray().length === 0;
  }

  #loadState(state) {
    if (!this.#stateLooksValid(state)) {
      return console.error("Can't game history. State object is invalid.");
    }

    // Fill in letters
    state.forEach((wordArray, row) => {
      wordArray.forEach((letter, column) => {
        this.#getSquare(row, column).innerText = letter;
      });
    });

    // Color squares
    state.forEach((wordArray, row) => {
      this.#changeSquareColors(this.#targetWord, wordArray, row);
    });

    // Load state
    this.#boardState = state;

    this.#submit();
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
        if (this.#targetWord.includes(letter)) return;

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
    }, 1400);
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
