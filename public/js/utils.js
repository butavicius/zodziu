export const codec = {
  /**
   * Encode string to obfuscate it
   * @param {string} str
   * @returns {string}
   */
  encode: (str) => btoa(encodeURIComponent(str)),

  /*
   * Decode string
   * @param {string} str
   * @returns {string}
   */
  decode: (str) => decodeURIComponent(atob(str)),
};

// word index equals days passed since start
export const getCurrentWordIndex = () => {
  const gameStart = new Date(2022, 1, 5, 0, 0, 0, 0);
  const distance = new Date().getTime() - gameStart.getTime();

  return Math.floor(distance / (1000 * 60 * 60 * 24));
};

