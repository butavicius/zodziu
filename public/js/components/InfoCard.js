export default class InfoCard extends HTMLElement {
  constructor() {
    super();

    const children = this.innerHTML;
    this.className =
      "info-card-container select-none absolute flex items-center justify-center w-screen h-screen top-0 left-0 invisible";
    this.innerHTML = `<div class="info-card -translate-y-64 duration-500 flex flex-1 flex-col justify-center items-center m-4 py-4 border-gray-200 border-2 rounded-md shadow-md bg-white z-20 opacity-0"
          style="max-width: 450px">${children}</div>`;
  }

  show() {
    this.classList.remove("invisible");
    this.querySelector(".info-card").classList.remove("opacity-0");
    this.querySelector(".info-card").classList.add("opacity-1");

    this.querySelector(".info-card").classList.remove("-translate-y-64");
  }

  hide() {
    this.classList.add("invisible");
    this.querySelector(".info-card").classList.remove("opacity-1");
    this.querySelector(".info-card").classList.add("opacity-0");
    this.querySelector(".info-card").classList.add("-translate-y-64");
  }
}
customElements.define("info-card", InfoCard);
