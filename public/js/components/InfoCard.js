export default class InfoCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `<div class="select-none absolute flex items-center justify-center w-screen h-screen top-0 left-0 invisible" id="info-card-container">
        <div class="-translate-y-64 duration-500 flex flex-1 flex-col justify-center items-center m-4 py-4 border-gray-200 border-2 rounded-md shadow-md bg-white z-20 opacity-0"
          style="max-width: 450px"
          id="info-card"></div></div>`;
  }
}
