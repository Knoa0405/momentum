const clockTitle = document.querySelector(".clock_title");
const restTitle = document.querySelector(".rest_title");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ?`0${hours}`:hours}\
        :${minutes < 10 ?`0${minutes}`:minutes}\
        :${second < 10 ?`0${second}`:second}`
    };

function restTime() {
    const fullDate = new Date("December 31, 1997 23:59:59");
    const fullHours = fullDate.getHours();
    const fullMinutes = fullDate.getMinutes();
    const fullSecond = fullDate.getSeconds();
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    const restHours = fullHours - hours;
    const restMinute = fullMinutes - minutes;
    const restSecond = fullSecond - second + 1;
    restTitle.innerText = `${
        restHours < 10 ?`0${restHours}`:restHours}\
        :${restMinute < 10 ?`0${restMinute}`:restMinute}\
        :${restSecond < 10 ?`0${restSecond}`:restSecond}`
}

function init() {
    getTime();
    restTime();
    setInterval(getTime,1000);
    setInterval(restTime,1000);
}

init();


