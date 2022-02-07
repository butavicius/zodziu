export default class OpacityOverlay extends HTMLElement {
  constructor() {
    super();
    this.classList.add(
      "w-screen",
      "h-screen",
      "z-10",
      "opacity-80",
      "bg-white",
      "fixed",
      "top-0",
      "left-0",
      "invisible"
    );
  }

  show() {
    this.classList.add("duration-500");
    this.classList.remove("invisible");
    this.classList.remove("opacity-0");
    this.classList.add("opacity-80");
  }
  hide() {
    this.classList.add("invisible");
    this.classList.add("opacity-0");
    this.classList.remove("opacity-80");
  }
}
customElements.define("opacity-overlay", OpacityOverlay);
