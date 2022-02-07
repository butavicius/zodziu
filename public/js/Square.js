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
      "border-2",
      "h-12",
      "w-12",
      "sm:h-14",
      "sm:w-14",
      "text-2xl",
      "sm:text-4xl",
      this.#borderNormal,
      this.#textNormal,
      "font-medium",
      "shadow-md",
      "uppercase",
      "select-none",
      "duration-300"
    );

    if (this.getAttribute("color") === "green") {
      this.markGreen();
    }
    if (this.getAttribute("color") === "yellow") {
      this.markYellow();
    }
    if (this.getAttribute("color") === "gray") {
      this.markGray();
    }
    if (this.getAttribute("small") === "true") {
      this.classList.remove("h-12", "w-12", "sm:h-14", "sm:w-14");
      this.classList.add("h-10", "w-10", "sm:h-12", "sm:w-12", "mr-1");
    }
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
