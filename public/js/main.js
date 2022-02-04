import KeyButton from "./KeyButton.js";
import Square from "./Square.js";

window.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector("#board");
  const squareTemplate = document.querySelector("#square-template");

  for (let i = 0; i < 30; i++) {
    const square = new Square();
    square.id = `square-${i}`;
    board.appendChild(square);
  }
});
