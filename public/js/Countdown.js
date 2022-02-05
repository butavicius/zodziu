export default class Countdown {
  #nextGame;
  #rootElement;

  constructor(rootElement) {
    this.#nextGame = new Date();
    this.#nextGame.setDate(this.#nextGame.getDate() + 1);
    this.#nextGame.setHours(0, 0, 0, 0);

    this.#rootElement = rootElement;
    this.#updateRootElement();

    setInterval(() => this.#updateRootElement(), 1000);
  }

  #getCountdownString() {
    return this.#formatDistance(this.#getDistanceToNextGame());
  }

  #updateRootElement() {
    this.#rootElement.innerHTML = this.#getCountdownString();
  }

  #formatDistance(distance) {
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  }

  #getDistanceToNextGame() {
    return this.#nextGame.getTime() - new Date().getTime();
  }
}
