export default class LetterSquare extends HTMLElement {
  #borderNormal = "color-borderNormal";
  #borderActive = "color-borderActive";
  #textNormal = "color-textNormal";
  #textBright = "color-textBright";
  #squareGreen = "color-squareGreen";
  #squareYellow = "color-squareYellow";
  #squareGray = "color-squareGray";

  constructor() {
    super();

    this.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "w-14",
      "h-14",
      "border-2",
      "text-4xl",
      this.#borderNormal,
      this.#textNormal,
      "font-medium",
      "shadow-md",
      "uppercase",
      "select-none",
      "duration-300"
    );
  }

  markGreen() {
    this.classList.remove(this.#textNormal);
    this.classList.add(this.#textBright);

    this.classList.remove(this.#borderNormal);
    this.classList.remove(this.#borderActive);
    this.classList.add(this.#squareGreen);
  }
  markYellow() {
    this.classList.remove(this.#textNormal);
    this.classList.add(this.#textBright);

    this.classList.remove(this.#borderNormal);
    this.classList.remove(this.#borderActive);
    this.classList.add(this.#squareYellow);
  }
  markGray() {
    this.classList.remove(this.#textNormal);
    this.classList.add(this.#textBright);

    this.classList.remove(this.#borderNormal);
    this.classList.remove(this.#borderActive);
    this.classList.add(this.#squareGray);
  }

  insertLetter(letter) {
    this.classList.remove(this.#borderNormal);
    this.classList.add(this.#borderActive);
    this.classList.remove("transition-none");
    this.innerHTML = letter;
  }

  deleteLetter() {
    this.classList.remove(this.#borderActive);
    this.classList.add(this.#borderNormal);
    this.classList.add("transition-none");
    this.innerHTML = "";
  }
}
customElements.define("letter-square", LetterSquare);
