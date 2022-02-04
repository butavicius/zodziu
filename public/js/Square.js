export default class LetterSquare extends HTMLElement {
  constructor() {
    super();
    this.className = "flex items-center justify-center w-16 h-16 border-2 border-gray-200 text-4xl uppercase";
  }

  markGreen() {
    this.className += " bg-lime-400";
  }
  markYellow() {
    this.className += " bg-amber-300";
  }
  markRed() {
    this.className += " bg-slate-300";
  }
}
customElements.define("letter-square", LetterSquare);
