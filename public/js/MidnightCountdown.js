export default class MidnightCountdown {
  #nextMidnightDate;
  #hElement;
  #mElement;
  #sElement;
  #callback;
  #intervalID;

  /**
   * Ppopulate and every second update DOM elements with hour, minute and
   * seconds left till midnight and invoke callback when time is up.
   * @constructor
   * @param {} hElement
   * @param {*} mElement
   * @param {*} sElement
   * @param {*} callback
   *
   */
  constructor(hElement, mElement, sElement, callback) {
    this.#nextMidnightDate = new Date();
    this.#nextMidnightDate.setDate(this.#nextMidnightDate.getDate() + 1);
    this.#nextMidnightDate.setHours(0, 0, 0, 0);

    this.#hElement = hElement;
    this.#mElement = mElement;
    this.#sElement = sElement;

    this.#callback = callback;

    this.#tick();

    this.#intervalID = setInterval(() => this.#tick(), 1000);
  }

  #tick() {
    const distance = this.#getDistanceToNextGame();

    if (distance < 1000) {
      clearInterval(this.#intervalID);
      return this.#callback();
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.#hElement.innerText = hours;
    this.#mElement.innerText = minutes;
    this.#sElement.innerText = seconds;
  }

  #getDistanceToNextGame() {
    return this.#nextMidnightDate.getTime() - new Date().getTime();
  }
}
