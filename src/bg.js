const body = document.querySelector("body");
const weatherText = document.querySelector(".weather");
const containerText = document.querySelector(".container")
const IMG_NUMBER =5 ;


function paintingImage(imgNumber) {
    const image = new Image();
    if(imgNumber === 0 || imgNumber === 1 || imgNumber === 3 || imgNumber === 4) {
        weatherText.style.color = "#fff";
        containerText.style.color = "#fff";
    };
    image.src = `image/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintingImage(randomNumber);
}

init();