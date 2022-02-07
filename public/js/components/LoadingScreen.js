export default class LoadingScreen extends HTMLElement {
  #screen;
  constructor() {
    super();
    this.#screen = document.createElement("div");
    // this.#screen.className = "fixed w-screen h-screen z-50 bg-white opacity-1";
    this.#screen.classList.add(
      "duration-500",
      "fixed",
      "top-0",
      "left-0",
      "w-screen",
      "h-screen",
      "z-50",
      "bg-red-200"
    );
    this.append(this.#screen);
  }

  hide() {
    this.#screen.classList.add("opacity-0");
    this.classList.add("invisible");
  }
}
customElements.define("loading-screen", LoadingScreen);
