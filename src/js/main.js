import importedImage from '../assets/sample.jpg';
import '../css/style.css';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#root");
    const imgtag = document.querySelector("#imageContainer");


    root.innerHTML = "Dynamically inserted html";
    imgtag.src = importedImage;

})