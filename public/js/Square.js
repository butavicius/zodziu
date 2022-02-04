export default class LetterSquare extends HTMLElement {
  constructor() {
    super();
    this.className = "w-14 h-14 border-2 border-gray-200";
  }
}
customElements.define("letter-square", LetterSquare);
