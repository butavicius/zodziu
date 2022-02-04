export default class KeyButton extends HTMLElement {
  constructor() {
    super();
    this.isWide = !!this.getAttribute("wide");
    this.key = this.getAttribute("key");

    this.className =
      "flex shrink items-center justify-center cursor-pointer h-14 m-0.5 p-2 bg-gray-300 rounded-md shadow uppercase";

    this.style = "flex: 1;";
    if (this.isWide) {
      this.className += " text-xs";
      this.style = "flex: 1.5";
    }

    this.innerHTML = this.innerHTML || this.key;
  }
}
customElements.define("key-button", KeyButton);
