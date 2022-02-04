export default class LetterSquare extends HTMLElement {
  constructor() {
    super();
    this.className = "w-16 h-16 border-2 border-gray-200";
  }
}
customElements.define("letter-square", LetterSquare);
