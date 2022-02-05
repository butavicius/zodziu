export default class TouchPad extends HTMLElement {
  constructor() {
    super();
    this.isWide = !!this.getAttribute("wide");
    this.isSpacer = !!this.getAttribute("spacer");
    this.key = this.getAttribute("key");

    this.className =
      "flex items-center justify-center cursor-pointer h-14 m-0.5 p-2 bg-slate-300 active:bg-slate-400 text-gray-700 rounded-md shadow uppercase";

    this.style = "flex: 1;";
    if (this.isWide) {
      this.className += " text-xs";
      this.style = "flex: 1.8";
    }
    if (this.isSpacer) {
      this.style = "flex: 0; visibility: hidden";
    }

    this.innerHTML = this.innerHTML || this.key;
  }
}

customElements.define("touch-pad", TouchPad);
