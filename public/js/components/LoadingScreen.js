export default class LoadingScreen extends HTMLElement {
  constructor() {
    super();

    this.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-screen",
      "h-screen",
      "opacity-1",
      "bg-white",
      "z-50"
    );

    window.addEventListener("load", () => this.#hide());
  }

  #hide() {
    this.classList.add("duration-500");
    this.classList.add("opacity-0");
    this.classList.add("invisible");
  }
}
customElements.define("loading-screen", LoadingScreen);
