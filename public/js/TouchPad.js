export default class TouchPad extends HTMLElement {
  constructor() {
    super();
    this.isWide = !!this.getAttribute("wide");
    this.isSpacer = !!this.getAttribute("spacer");
    this.key = this.getAttribute("key");

    this.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "cursor-pointer",
      "h-14",
      "m-0.5",
      "p-2",
      "bg-slate-200",
      "active:bg-slate-300",
      "text-gray-700",
      "rounded-md",
      "shadow",
      "uppercase",
      "select-none"
    );

    this.style = "flex: 1;";
    if (this.isWide) {
      this.className += " text-xs";
      this.style = "flex: 1.8";
    }
    if (this.isSpacer) {
      this.classList.add("invisible");
      this.style = "flex: 0;";
    }

    this.innerHTML = this.innerHTML || this.key;
  }

  hide() {
    if (!this.isSpacer) {
      this.classList.add("transition-opacity");
      this.classList.add("duration-1000");
      this.classList.add("opacity-0");
    }
  }
}

customElements.define("touch-pad", TouchPad);
