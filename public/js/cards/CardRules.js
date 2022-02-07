fetch("rules.html")
  .then((stream) => stream.text())
  .then((html) => define(html));

export default function define(html) {
  class CardRules extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = html;
    }
  }

  customElements.define("card-rules", CardRules);
}
