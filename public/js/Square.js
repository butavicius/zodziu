export default class LetterSquare extends HTMLElement {
  #normalBorder = "border-gray-200";
  #activeBorder = "border-gray-600";
  #normalText = "text-gray-600";

  constructor() {
    super();

    this.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "w-14",
      "h-14",
      "border-2",
      this.#normalBorder,
      "text-4xl",
      this.#normalText,
      "font-medium",
      "shadow-md",
      "uppercase",
      "select-none",
      "duration-200"
    );
  }

  markGreen() {
    this.classList.remove(this.#normalBorder);
    this.classList.add("border-lime-600");
    this.classList.add("bg-lime-600");
    this.switchToWhite();
  }
  markYellow() {
    this.classList.remove(this.#normalBorder);
    this.classList.add("border-yellow-500");
    this.classList.add("bg-yellow-500");
    this.switchToWhite();
  }
  markGray() {
    this.classList.remove(this.#normalBorder);
    this.classList.add("bg-gray-400");
    this.classList.add("border-gray-400");
    this.switchToWhite();
  }

  switchToWhite() {
    this.classList.remove(this.#normalText);
    this.classList.add("text-white");
  }

  insertLetter(letter) {
    this.classList.remove(this.#normalBorder);
    this.classList.add(this.#activeBorder);
    this.classList.remove("transition-none");
    this.innerHTML = letter;
  }

  deleteLetter() {
    this.classList.remove(this.#activeBorder);
    this.classList.add(this.#normalBorder);
    this.classList.add("transition-none");
    this.innerHTML = "";
  }
}
customElements.define("letter-square", LetterSquare);
