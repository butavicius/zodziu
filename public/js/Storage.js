import { codec } from "./utils.js";

class Storage {
  #gameHistory;
  #wordEncoder;

  constructor(wordEncoder) {
    this.#gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    this.#wordEncoder = wordEncoder;
  }

  loadGame(targetWord) {
    if (!this.#getLastHistoryEntry()) return false;

    if (this.#decode(this.#getLastHistoryEntry().targetWord) !== targetWord)
      return false;

    return this.#getLastHistoryEntry().boardState;
  }

  saveGame(targetWord, boardState) {
    if (!this.#getLastHistoryEntry()) {
      this.#createEntry(targetWord, boardState);
      return;
    }
    if (this.#decode(this.#getLastHistoryEntry().targetWord) !== targetWord) {
      this.#createEntry(targetWord, boardState);
      return;
    }

    this.#updateBoardState(this.#getLastHistoryEntry(), boardState);
  }

  #getLastHistoryEntry() {
    if (this.#gameHistory.length === 0) return null;
    return this.#gameHistory[this.#gameHistory.length - 1];
  }

  #createEntry(targetWord, boardState) {
    this.#gameHistory.push({
      targetWord: this.#encode(targetWord),
      boardState: boardState,
    });
    this.#persist();
  }

  #updateBoardState(entry, boardState) {
    entry.boardState = boardState;
    this.#persist();
  }

  #persist() {
    localStorage.setItem("gameHistory", JSON.stringify(this.#gameHistory));
  }

  #decode(str) {
    return this.#wordEncoder.decode(str);
  }

  #encode(str) {
    return this.#wordEncoder.encode(str);
  }
}

export default new Storage(codec);
