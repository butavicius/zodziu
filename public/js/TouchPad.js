export default class TouchPad extends HTMLElement {
  constructor() {
    super();
    this.isWide = !!this.getAttribute("wide");
    this.isSpacer = !!this.getAttribute("spacer");
    this.key = this.getAttribute("key");

    this.classList.add(
      "flex",
      "flex-1",
      "items-center",
      "justify-center",
      "cursor-pointer",
      "text-md",
      "h-12",
      "m-0.5",
      "p-2",
      "color-touchpadKeys",
      "active:bg-slate-300",
      "color-touchpadLetters",
      "rounded-md",
      "shadow",
      "uppercase",
      "select-none"
    );

    if (this.isWide) {
      this.className += " text-xs";
      this.classList.remove("flex-1");
      this.classList.add("custom-flex-1.8");
    }
    if (this.isSpacer) {
      this.classList.add("invisible");
      this.classList.remove("flex-1");
      this.classList.add("flex-none");
    }

    this.innerHTML = this.innerHTML || this.key;
  }

  hide() {
    this.classList.add("transition-opacity");
    this.classList.add("duration-1000");
    this.classList.add("opacity-0");
  }
}

customElements.define("touch-pad", TouchPad);
