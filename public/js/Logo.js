export default class Logo extends HTMLElement {
  constructor() {
    super();

    this.classList.add(
      "text-2xl",
      "sm:text-3xl",
      "font-semibold",
      "tracking-widest",
      "border-solid",
      "color-logoUnderline",
      "border-b-2"
    );

    this.innerHTML = `<span class="color-logoBright">ŽÓ</span><span class="color-logoDark">DŽIU</span>`;
  }
}
customElements.define("zodziu-logo", Logo);
