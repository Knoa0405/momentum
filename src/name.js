const naming = document.querySelector(".naming-hi");
const form = document.querySelector(".name-form");
const inputName = document.querySelector("#name");

const USER = "user";

function inputNaming (event) {
    event.preventDefault();
    const inputText = inputName.value;
    naming.innerText = `What's up ! it's ${inputText}'s Momentum !`
    inputName.style.display = "none";
    loadName(inputText);
}

function loadName (text) {
    localStorage.setItem(USER,text)
}

function fixName() {
    const userNamingObj = localStorage.getItem(USER);
    if (userNamingObj !== null) {
        naming.innerText = `What's up ! it's ${userNamingObj}'s Momentum !`
        inputName.style.display = "none";
    }
}

function init() {
    form.addEventListener("submit", inputNaming);
    fixName();
}

init();