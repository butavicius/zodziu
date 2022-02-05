export default class LetterSquare extends HTMLElement {
  constructor() {
    super();

    this.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "w-14",
      "h-14",
      "border-2",
      "border-gray-200",
      "text-4xl",
      "font-medium",
      "text-gray-900",
      "shadow-md",
      "uppercase"
    );

    this.style = "transition: all 0.35s ease";
  }

  markGreen() {
    this.classList.add("bg-lime-600");
    this.classList.add("border-lime-600");
    this.switchToWhite();
  }
  markYellow() {
    console.log('marking yelow');
    this.classList.add("bg-yellow-500");
    this.classList.add("border-yellow-500");
    this.switchToWhite();
  }
  markGray() {
    console.log('marking red');
    this.classList.add("bg-gray-400");
    this.classList.add("border-gray-400");
    this.switchToWhite();
  }
  switchToWhite() {
    this.classList.add("text-white");
  }

  insertLetter(letter) {
    this.classList.add("border-gray-600");
    this.innerHTML = letter;
    this.style = "transition: all 0.35s ease";
  }
  deleteLetter() {
    this.style = "transition: none";
    this.innerHTML = "";
    this.classList.remove("border-gray-600");
  }
}
customElements.define("letter-square", LetterSquare);
